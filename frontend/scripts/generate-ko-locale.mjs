import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const enPath = resolve(__dirname, "../public/locales/en/translation.json");
const zhPath = resolve(__dirname, "../public/locales/zh/translation.json");
const koPath = resolve(__dirname, "../public/locales/ko/translation.json");

const en = JSON.parse(readFileSync(enPath, "utf-8"));
const zh = JSON.parse(readFileSync(zhPath, "utf-8"));

// 산사 테마 메뉴 및 핵심 UI 한국어 매핑 사전
const SANSA_MENU_MAP = {
  "app.name": "불진 佛津",
  "app.tagline": "동아시아 디지털 불교 대장경 플랫폼",
  "app.title": "불진(佛津) · 디지털 산사 대장경",
  "home.title_accent": "불",
  "home.title_rest": "진 佛津",
  "nav.home": "일주문(一柱門)",
  "nav.search": "경장(經藏)",
  "nav.read": "법당(法堂)",
  "nav.readaloud": "독송(讀誦)",
  "nav.chat": "선문답(禪問答)",
  "nav.research": "화두 참구(話頭參究)",
  "nav.dictionary": "불교 사전",
  "nav.kg": "법맥도(法脈圖)",
  "nav.geo": "순례(巡禮)",
  "nav.collections": "경함(經函)",
  "nav.cross_canon": "삼장 대조",
  "nav.sources": "장경각(藏經閣)",
  "nav.exports": "공개 자료",
  "nav.admin": "관리자",
  "nav.admin_overview": "개요",
  "nav.admin_users": "사용자 관리",
  "nav.admin_suggestions": "제안 관리",
  "nav.admin_audit_log": "감사 로그",
  "common.cancel": "취소",
  "common.confirm": "확인",
  "common.delete": "삭제",
  "common.save": "저장",
  "common.search": "검색",
  "common.loading": "불러오는 중...",
  "common.error": "오류가 발생했습니다",
  "common.retry": "다시 시도",
  "common.back": "뒤로",
  "common.close": "닫기",
  "common.all": "전체",
  "search.placeholder": "경전 명칭, 인물, 한문 구절 또는 한글로 검색하세요",
  "search.button": "경장 검색",
  "search.results": "검색 결과 {{count}}건",
  "search.no_results": "검색 결과가 없습니다",
  "reader.font_size": "글자 크기",
  "reader.line_height": "줄 간격",
  "reader.vertical_mode": "세로쓰기",
  "reader.copy": "본문 복사",
  "reader.citation": "인용 복사",
  "chat.placeholder": "경전 구절이나 불교 교리에 대해 선문답을 나눠보세요...",
  "chat.send": "전송",
  "chat.new_session": "새로운 문답",
  "chat.thinking": "답변을 사유하는 중...",
  "chat.gemini_key_btn": "Gemini API 키 설정",
  "dict.placeholder": "불교 용어, 범어 음사, 인명, 사찰명 검색...",
  "dict.search": "사전 검색",
  "dict.source": "출전",
};

// 자주 쓰이는 한자어/용어 치환 규칙
const BUDDHIST_TERMS = [
  [/般若/g, "반야"],
  [/涅槃/g, "열반"],
  [/菩薩/g, "보살"],
  [/如來/g, "여래"],
  [/經典/g, "경전"],
  [/經文/g, "경문"],
  [/佛學/g, "불학"],
  [/佛教/g, "불교"],
  [/大藏經/g, "대장경"],
  [/金剛經/g, "금강경"],
  [/心經/g, "반야심경"],
  [/法華經/g, "법화경"],
  [/華嚴經/g, "화엄경"],
  [/阿含經/g, "아함경"],
  [/搜尋/g, "검색"],
  [/搜索/g, "검색"],
  [/閱讀/g, "독송/읽기"],
  [/辭典/g, "사전"],
  [/字典/g, "사전"],
  [/知識圖譜/g, "지식그래프"],
  [/首頁/g, "홈"],
  [/設定/g, "설정"],
  [/登入/g, "로그인"],
  [/註冊/g, "회원가입"],
  [/退出/g, "로그아웃"],
];

function translateText(key, enVal, zhVal) {
  if (SANSA_MENU_MAP[key]) {
    return SANSA_MENU_MAP[key];
  }
  
  // 한국어 특화 기본 매핑이 없는 경우
  // enVal이 짧은 단어인 경우 기본 번역 테이블 활용
  const simpleMap = {
    "Home": "홈",
    "Search": "검색",
    "Read": "독송",
    "Dictionary": "사전",
    "Sources": "장경각",
    "Cancel": "취소",
    "Confirm": "확인",
    "Save": "저장",
    "Delete": "삭제",
    "Edit": "편집",
    "Copy": "복사",
    "Close": "닫기",
    "Back": "뒤로",
    "Next": "다음",
    "Previous": "이전",
    "Loading...": "불러오는 중...",
    "Error": "오류",
    "Success": "성공",
    "Settings": "설정",
    "Language": "언어",
    "Theme": "테마",
    "Light": "라이트(한지)",
    "Dark": "다크(야경)",
    "System": "시스템 설정",
  };
  if (simpleMap[enVal]) return simpleMap[enVal];

  // zh 텍스트가 있을 때 불교 한자어를 한국어 음독으로 변환
  if (zhVal && typeof zhVal === "string") {
    let converted = zhVal;
    for (const [pattern, rep] of BUDDHIST_TERMS) {
      converted = converted.replace(pattern, rep);
    }
    return converted;
  }

  return enVal;
}

const ko = {};
const allKeys = Object.keys(en);

for (const key of allKeys) {
  const enVal = en[key];
  const zhVal = zh[key];
  ko[key] = translateText(key, enVal, zhVal);
}

writeFileSync(koPath, JSON.stringify(ko, null, 2), "utf-8");
console.log(`Generated ko/translation.json successfully: ${Object.keys(ko).length} keys (matching en: ${allKeys.length})`);
