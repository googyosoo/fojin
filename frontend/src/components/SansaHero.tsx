import { useMemo } from "react";
import { Typography, Card, Button, Space } from "antd";
import { BookOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { getTodayGatha } from "../theme/sansa/gatha";
import { SANSA_LIGHT } from "../theme/sansa/tokens";

const { Title, Paragraph, Text } = Typography;

export default function SansaHero() {
  const navigate = useNavigate();
  const gatha = useMemo(() => getTodayGatha(), []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        marginBottom: 24,
        background: `linear-gradient(180deg, ${SANSA_LIGHT.paper} 0%, ${SANSA_LIGHT.hanji} 100%)`,
        border: `1px solid ${SANSA_LIGHT.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* 단청 3색 상단 띠 */}
      <div
        style={{
          height: 5,
          background: "linear-gradient(90deg, #2F5D50 0%, #2F5D50 33.3%, #A8402E 33.3%, #A8402E 66.6%, #B8902F 66.6%, #B8902F 100%)",
        }}
      />

      <div style={{ padding: "32px 24px 28px", textAlign: "center" }}>
        {/* 일주문 현판 상징 */}
        <div
          style={{
            display: "inline-block",
            padding: "4px 16px",
            border: `1px solid ${SANSA_LIGHT.juRed}`,
            borderRadius: 2,
            marginBottom: 12,
            background: "rgba(168, 64, 46, 0.05)",
          }}
        >
          <Text style={{ color: SANSA_LIGHT.juRed, letterSpacing: 3, fontSize: 13, fontWeight: 600 }}>
            一柱門 · 산사의 관문
          </Text>
        </div>

        {/* 대제목 */}
        <Title
          level={2}
          style={{
            margin: "0 0 8px",
            fontFamily: "'Noto Serif KR', serif",
            color: SANSA_LIGHT.meok,
            letterSpacing: 2,
          }}
        >
          佛津 · 불진
        </Title>
        <Paragraph
          style={{
            color: SANSA_LIGHT.inkSoft,
            fontSize: 15,
            marginBottom: 24,
            fontFamily: "'Noto Serif KR', serif",
          }}
        >
          경전의 나루에 오신 것을 환영합니다
        </Paragraph>

        {/* 오늘의 게송 카드 */}
        <Card
          size="small"
          style={{
            maxWidth: 680,
            margin: "0 auto",
            background: SANSA_LIGHT.paper,
            borderColor: SANSA_LIGHT.border,
            textAlign: "left",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Space>
              <BookOutlined style={{ color: SANSA_LIGHT.dancheongGreen }} />
              <Text strong style={{ color: SANSA_LIGHT.dancheongGreen, fontSize: 13 }}>
                오늘의 게송 · {gatha.sutra} ({gatha.cbetaId})
              </Text>
            </Space>
            {gatha.chapter && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                {gatha.chapter}
              </Text>
            )}
          </div>

          {/* 원문 */}
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(47, 93, 80, 0.04)",
              borderRadius: 2,
              marginBottom: 10,
              borderLeft: `3px solid ${SANSA_LIGHT.dancheongGreen}`,
            }}
          >
            <Text
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 16,
                letterSpacing: 1,
                color: SANSA_LIGHT.meok,
                lineHeight: 1.6,
                display: "block",
              }}
            >
              {gatha.original}
            </Text>
          </div>

          {/* 한글 풀이 */}
          <Paragraph
            style={{
              margin: "0 0 12px",
              color: SANSA_LIGHT.meok,
              fontSize: 14,
              lineHeight: 1.6,
              fontFamily: "'Noto Serif KR', serif",
            }}
          >
            {gatha.korean}
          </Paragraph>

          <div style={{ textAlign: "right" }}>
            <Button
              type="link"
              size="small"
              icon={<RightOutlined />}
              onClick={() => navigate(gatha.readerUrl)}
              style={{ color: SANSA_LIGHT.dancheongGreen, padding: 0 }}
            >
              법당(리더)에서 경전 전문 보기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
