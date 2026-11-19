/**
 * 산사(山寺) 테마 디자인 토큰
 * 조계종 풍 단청 오방색(녹청·주홍·황토)과 한지·먹 팔레트
 * WCAG AA 대비 4.5:1 이상 준수
 */

export interface SansaColorTokens {
  hanji: string;           // 배경
  paper: string;           // 표면 (카드, 컨테이너)
  meok: string;            // 본문 텍스트
  inkSoft: string;         // 보조 텍스트
  dancheongGreen: string;  // 주색상 (녹청)
  juRed: string;           // 강조 (주홍)
  hwangGold: string;       // 포인트 (황토)
  border: string;          // 경계선
}

export const SANSA_LIGHT: SansaColorTokens = {
  hanji: "#F4EEDF",
  paper: "#FBF7EC",
  meok: "#1E1B18",
  inkSoft: "#5B544A",
  dancheongGreen: "#2F5D50",
  juRed: "#A8402E",
  hwangGold: "#B8902F",
  border: "#D9CFB8",
};

export const SANSA_DARK: SansaColorTokens = {
  hanji: "#14120F",
  paper: "#1E1B17",
  meok: "#E9E1CC",
  inkSoft: "#A79F8C",
  dancheongGreen: "#5E9C88",
  juRed: "#D0705C",
  hwangGold: "#D4B25A",
  border: "#3A342C",
};

export const SANSA_FONTS = {
  serifKR: "'Noto Serif KR', 'Nanum Myeongjo', serif",
  serifTC: "'Noto Serif TC', 'Songti TC', serif",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};
