/**
 * Vercel Serverless Function: Gemini 선문답(AI Q&A) 대화 프록시
 * 환경변수 GEMINI_API_KEY를 안전하게 활용하여 Google AI Studio와 통신합니다.
 */

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "GEMINI_API_KEY is not configured on server. Please configure it or enter your key in client UI.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await req.json();
    const model = body.model || "gemini-2.5-flash";
    const messages = body.messages || [];
    const stream = body.stream !== false;

    // 조계종 선문답 시스템 프롬프트 주입
    const systemInstruction = {
      role: "system",
      content:
        "당신은 동아시아 불교 대장경 및 조계종 가풍에 정통한 선지식(禪知識) AI입니다. " +
        "사용자의 질문에 반야심경, 금강경 등 주요 경전의 지혜를 바탕으로 자비롭고 격조 높은 한국어로 답하세요. " +
        "인용 가능한 경전 구절(예: 《금강경》, 《반야심경》)이 있다면 정확한 출처와 원문을 곁들여 설명하십시오.",
    };

    const upstreamMessages = [systemInstruction, ...messages];

    const upstreamResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: upstreamMessages,
          stream,
          temperature: 0.7,
        }),
      }
    );

    if (!upstreamResponse.ok) {
      const errText = await upstreamResponse.text();
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${upstreamResponse.status}`, detail: errText }),
        {
          status: upstreamResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 스트리밍 응답 반환
    return new Response(upstreamResponse.body, {
      status: 200,
      headers: {
        "Content-Type": stream ? "text/event-stream" : "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
