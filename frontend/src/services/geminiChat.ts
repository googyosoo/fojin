/**
 * Gemini 선문답(AI Q&A) 클라이언트 통신 서비스
 * 1) 로컬스토리지에 저장된 사용자 BYOK 키가 있으면 브라우저 직접 통신
 * 2) 없으면 Vercel 서버리스 /api/chat 호출
 */

import { getStoredGeminiKey } from "../components/GeminiKeyModal";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface StreamChatOptions {
  model?: string;
  messages: ChatMessage[];
  onChunk: (chunk: string) => void;
  onError: (err: Error) => void;
  onFinish: () => void;
}

const SYSTEM_PROMPT =
  "당신은 동아시아 불교 대장경 및 조계종 가풍에 정통한 선지식(禪知識) AI입니다. " +
  "사용자의 질문에 반야심경, 금강경 등 주요 경전의 지혜를 바탕으로 자비롭고 격조 높은 한국어로 답하세요. " +
  "필요한 경우 경전의 원문과 출처(예: 《금강경》, 《반야심경》)를 명시하십시오.";

export async function sendGeminiChatStream({
  model = "gemini-2.5-flash",
  messages,
  onChunk,
  onError,
  onFinish,
}: StreamChatOptions): Promise<() => void> {
  const localKey = getStoredGeminiKey();
  let cancelled = false;

  const controller = new AbortController();

  (async () => {
    try {
      let endpoint: string;
      let headers: Record<string, string>;

      if (localKey) {
        // 클라이언트 직접 호출 (BYOK)
        endpoint = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localKey}`,
        };
      } else {
        // Vercel 서버리스 엔드포인트 호출
        endpoint = "/api/chat";
        headers = {
          "Content-Type": "application/json",
        };
      }

      const payload = {
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        temperature: 0.7,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("API_KEY_INVALID: API 키가 올바르지 않거나 권한이 없습니다.");
        }
        if (response.status === 500 && !localKey) {
          throw new Error("NO_SERVER_KEY: 서버에 API 키가 설정되지 않았습니다. 상단 키 설정 버튼을 눌러 본인의 Gemini 키를 입력해 주세요.");
        }
        const errText = await response.text();
        throw new Error(`API 오류 (${response.status}): ${errText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("응답 본문을 읽을 수 없습니다.");
      }

      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (!cancelled) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(":") || trimmed === "data: [DONE]") continue;

          if (trimmed.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              const delta = data.choices?.[0]?.delta?.content;
              if (delta) {
                onChunk(delta);
              }
            } catch {
              // json parse ignore
            }
          }
        }
      }

      onFinish();
    } catch (err: unknown) {
      if (!cancelled) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }
  })();

  return () => {
    cancelled = true;
    controller.abort();
  };
}
