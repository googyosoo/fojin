import { useState, useEffect } from "react";
import { Modal, Input, Typography, Button, message, Space, Alert } from "antd";
import { KeyOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

export const GEMINI_KEY_STORAGE = "fojin-gemini-key";

interface GeminiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onKeySaved?: (hasKey: boolean) => void;
}

export function getStoredGeminiKey(): string {
  try {
    return localStorage.getItem(GEMINI_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

export function maskApiKey(key: string): string {
  if (!key) return "";
  if (key.length <= 4) return "****";
  return `${key.slice(0, 4)}••••••••••••••••••••••••••••`;
}

export default function GeminiKeyModal({ open, onClose, onKeySaved }: GeminiKeyModalProps) {
  const [inputKey, setInputKey] = useState("");
  const [currentKey, setCurrentKey] = useState("");

  useEffect(() => {
    if (open) {
      const stored = getStoredGeminiKey();
      setCurrentKey(stored);
      setInputKey("");
    }
  }, [open]);

  const handleSave = () => {
    const trimmed = inputKey.trim();
    if (!trimmed) {
      message.warning("Gemini API 키를 입력해 주세요.");
      return;
    }
    try {
      localStorage.setItem(GEMINI_KEY_STORAGE, trimmed);
      setCurrentKey(trimmed);
      setInputKey("");
      message.success("Gemini API 키가 브라우저에 안전하게 저장되었습니다.");
      onKeySaved?.(true);
      onClose();
    } catch {
      message.error("로컬 스토리지 저장에 실패했습니다.");
    }
  };

  const handleDelete = () => {
    try {
      localStorage.removeItem(GEMINI_KEY_STORAGE);
      setCurrentKey("");
      setInputKey("");
      message.info("저장된 API 키가 삭제되었습니다.");
      onKeySaved?.(false);
    } catch {
      message.error("API 키 삭제에 실패했습니다.");
    }
  };

  return (
    <Modal
      title={
        <Space>
          <KeyOutlined style={{ color: "var(--fj-accent, #2F5D50)" }} />
          <span>Gemini 선문답 API 키 설정</span>
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          닫기
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} disabled={!inputKey.trim()}>
          저장하기
        </Button>,
      ]}
    >
      <Paragraph type="secondary" style={{ marginTop: 8 }}>
        선문답(AI 대화) 기능을 위해 Google AI Studio에서 발급받은 Gemini API 키를 등록합니다.
      </Paragraph>

      <Alert
        message="개인정보 및 보안 안내"
        description="입력한 API 키는 오직 브라우저의 로컬 스토리지에만 보관되며, 원격 서버나 저장소 코드에 절대 저장되지 않습니다."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      {currentKey ? (
        <div style={{ marginBottom: 16, padding: "12px", background: "var(--fj-paper, #FBF7EC)", borderRadius: 4 }}>
          <Text strong>현재 등록된 키: </Text>
          <Text code>{maskApiKey(currentKey)}</Text>
          <div style={{ marginTop: 8 }}>
            <Button size="small" danger icon={<DeleteOutlined />} onClick={handleDelete}>
              키 삭제
            </Button>
          </div>
        </div>
      ) : (
        <Paragraph type="warning">현재 등록된 Gemini API 키가 없습니다.</Paragraph>
      )}

      <div style={{ marginTop: 12 }}>
        <Text strong>새 API 키 입력</Text>
        <Input.Password
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="AIzaSy..."
          style={{ marginTop: 8 }}
        />
        <div style={{ marginTop: 6 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Google AI Studio (https://aistudio.google.com)에서 발급 가능합니다.
          </Text>
        </div>
      </div>
    </Modal>
  );
}
