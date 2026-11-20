import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const enPath = resolve(__dirname, "../public/locales/en/translation.json");
const zhPath = resolve(__dirname, "../public/locales/zh/translation.json");
const koPath = resolve(__dirname, "../public/locales/ko/translation.json");

const en = JSON.parse(readFileSync(enPath, "utf-8"));
const zh = JSON.parse(readFileSync(zhPath, "utf-8"));

// 1. 핵심 고정 번역 맵
const EXACT_MAP = {
  // 앱 기본
  "app.name": "불진 佛津",
  "app.tagline": "동아시아 디지털 불교 대장경 플랫폼",
  "app.title": "불진(佛津) · 디지털 산사 대장경",
  "home.title_accent": "불",
  "home.title_rest": "진 佛津",

  // 내비게이션
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

  // 공통 UI
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
  "common.edit": "수정",
  "common.copy": "복사",
  "common.copied": "복사 완료",
  "common.share": "공유",
  "common.download": "다운로드",
  "common.export": "내보내기",
  "common.filter": "필터",
  "common.reset": "초기화",
  "common.clear": "지우기",
  "common.more": "더 보기",
  "common.collapse": "접기",
  "common.expand": "펼치기",
  "common.submit": "제출",
  "common.view": "보기",
  "common.select": "선택",
  "common.settings": "설정",
  "common.help": "도움말",
  "common.about": "소개",
  "common.login": "로그인",
  "common.logout": "로그아웃",
  "common.register": "회원가입",

  // 선문답 (Chat)
  "chat.page_title": "선문답(禪問答) 대장경 AI 문답 — 불진 佛津",
  "chat.title": "선문답(禪問答) AI 문답",
  "chat.new_chat": "새로운 선문답",
  "chat.new_session": "새로운 문답",
  "chat.placeholder": "경전 구절이나 불교 교리에 대해 선문답을 나눠보세요...",
  "chat.send": "전송",
  "chat.stop": "생성 중단",
  "chat.stop_tooltip": "답변 생성 중단 (Esc)",
  "chat.configure_key": "Gemini API 키 설정",
  "chat.key_configured": "Gemini 키 설정됨",
  "chat.gemini_key_btn": "Gemini API 키 설정",
  "chat.thinking": "선지식 AI가 경전을 사유하는 중...",
  "chat.export_empty": "내보낼 대화 내역이 없습니다",
  "chat.general_assistant": "선지식(禪知識) AI 도반",
  "chat.switch_master": "선지식 선택",
  "chat.sources": "인용 경전 출처",
  "chat.no_sources": "인용 출처 없음",
  "chat.regenerate": "답변 다시 생성",
  "chat.copy_answer": "답변 복사",
  "chat.share_answer": "문답 공유",
  "chat.feedback_up": "도움이 되었음",
  "chat.feedback_down": "아쉬운 답변",
  "chat.continue_prompt": "이어서 계속 답변해 주세요: {{tail}}",
  "chat.quota_low": "남은 무료 질문 횟수: {{remaining}}회",
  "chat.quota_low_action": "개인 Gemini API 키 입력하기",
  "chat.empty_hint": "대장경 원문에 근거하여 인용구와 출처를 함께 안내합니다.",
  "chat.suggested_title": "자주 묻는 질문",
  "chat.model_label": "모델 선택",
  "chat.clear_history": "대화 기록 비우기",
  "chat.clear_history_confirm": "모든 선문답 대화 기록을 삭제하시겠습니까?",

  // 조계종 및 역대 조사
  "chat.master_bodhidharma": "달마대사 (선종 초조)",
  "chat.master_huineng": "육조 혜능 (남종선)",
  "chat.master_xuanzang": "현장법사 (유식종)",
  "chat.master_fazang": "법장화상 (화엄종)",
  "chat.master_kumarajiva": "구마라집 (중관학)",
  "chat.master_yinguang": "인광대사 (정토종)",
  "chat.master_ouyi": "우익지욱 (교선일치)",
  "chat.master_xuyun": "허운선사 (근대 선종)",
  "chat.master_atisha": "아티샤 (티베트 불교)",
  "chat.master_tsongkhapa": "총카파 (겔룩파)",
  "chat.master_milarepa": "밀라레파 (카규파)",
  "chat.master_buddhaghosa": "붓다고사 (상좌부 논사)",
  "chat.master_mahasi": "마하시 사야도 (위빳사나)",
  "chat.master_ajahn_chah": "아잔 차 (태국 숲속 전통)",

  // 검색 (Search)
  "search.title": "경장(經藏) 검색",
  "search.placeholder": "경전 제목, 저자, 번역자, 한문 원문 또는 한글 검색어 입력",
  "search.button": "경장 검색",
  "search.results": "검색 결과 {{count}}건",
  "search.no_results": "검색 결과가 없습니다",
  "search.filters": "상세 필터",
  "search.sort": "정렬 기준",
  "search.sort_relevance": "관련도순",
  "search.sort_cbeta": "대장경 편차순",
  "search.sort_year": "연대순",
  "search.dynasty": "시대/왕조",
  "search.category": "부류/분류",
  "search.canon": "대장경 판본",
  "search.source": "출전",
  "search.semantic": "의미 기반 인공지능 검색",
  "search.keyword": "원문 일치 키워드 검색",

  // 리더 (Reader & Text)
  "reader.font_size": "글자 크기",
  "reader.line_height": "줄 간격",
  "reader.vertical_mode": "세로쓰기",
  "reader.horizontal_mode": "가로쓰기",
  "reader.copy": "본문 복사",
  "reader.citation": "인용 복사",
  "reader.toc": "권차 목차",
  "reader.juan": "제 {{number}} 권",
  "reader.prev_juan": "이전 권",
  "reader.next_juan": "다음 권",
  "reader.parallel": "삼장 대조 보기",
  "reader.notes": "주석 보기",

  // 사전 (Dictionary)
  "dict.placeholder": "불교 용어, 범어 음사, 인명, 사찰명 검색...",
  "dict.search": "사전 검색",
  "dict.source": "사전 출전",
  "dict.title": "디지털 불교 대사전",
  "dict.no_results": "일치하는 사전 항목이 없습니다",

  // 홈 (Home)
  "home.hero_title": "불진(佛津) 디지털 산사 대장경",
  "home.hero_subtitle": "동아시아 불교 고전 대장경 원문과 인공지능 선문답",
  "home.gatha_title": "오늘의 게송",
  "home.quick_search": "빠른 경전 검색",
  "home.recommended": "주요 추천 경전",
};

// 중국어 -> 한국어 구절 변환 규칙 (포괄적 정규식)
const REPLACE_RULES = [
  // 고유명사 및 브랜드
  [/小津\s*AI/g, "선지식 AI"],
  [/小津/g, "선지식 AI"],
  [/佛津/g, "불진"],
  [/大藏经/g, "대장경"],
  [/大藏經/g, "대장경"],
  [/经典/g, "경전"],
  [/經典/g, "경전"],
  [/经文/g, "경문"],
  [/經文/g, "경문"],
  [/佛学/g, "불학"],
  [/佛教/g, "불교"],

  // 주요 경전
  [/金刚经/g, "금강경"],
  [/金剛經/g, "금강경"],
  [/心经/g, "반야심경"],
  [/心經/g, "반야심경"],
  [/法华经/g, "법화경"],
  [/法華經/g, "법화경"],
  [/华严经/g, "화엄경"],
  [/華嚴經/g, "화엄경"],
  [/楞严经/g, "능엄경"],
  [/楞嚴經/g, "능엄경"],
  [/阿含经/g, "아함경"],
  [/阿含經/g, "아함경"],
  [/维摩诘经/g, "유마경"],
  [/維摩詰經/g, "유마경"],

  // 동작 / UI
  [/搜索/g, "검색"],
  [/搜尋/g, "검색"],
  [/检索/g, "검색"],
  [/閱讀/g, "독송"],
  [/阅读/g, "독송"],
  [/问答/g, "선문답"],
  [/問答/g, "선문답"],
  [/提问/g, "질문하기"],
  [/提問/g, "질문하기"],
  [/回答/g, "답변"],
  [/复制/g, "복사"],
  [/複製/g, "복사"],
  [/分享/g, "공유"],
  [/设置/g, "설정"],
  [/設定/g, "설정"],
  [/取消/g, "취소"],
  [/确认/g, "확인"],
  [/確認/g, "확인"],
  [/保存/g, "저장"],
  [/删除/g, "삭제"],
  [/刪除/g, "삭제"],
  [/重试/g, "다시 시도"],
  [/重試/g, "다시 시도"],
  [/返回/g, "돌아가기"],
  [/关闭/g, "닫기"],
  [/關閉/g, "닫기"],
  [/发送/g, "전송"],
  [/發送/g, "전송"],
  [/加载中/g, "불러오는 중"],
  [/加載中/g, "불러오는 중"],
  [/清空/g, "비우기"],
  [/历史/g, "기록"],
  [/歷史/g, "기록"],
  [/词典/g, "사전"],
  [/辭典/g, "사전"],
  [/知识图谱/g, "법맥도"],
  [/知識圖譜/g, "법맥도"],
  [/首页/g, "일주문(홈)"],
  [/首頁/g, "일주문(홈)"],
  [/登录/g, "로그인"],
  [/登入/g, "로그인"],
  [/注册/g, "회원가입"],
  [/註冊/g, "회원가입"],
  [/退出/g, "로그아웃"],
  [/卷/g, "권"],
  [/目录/g, "목차"],
  [/目錄/g, "목차"],
  [/正文/g, "본문"],
  [/译文/g, "번역문"],
  [/譯文/g, "번역문"],
  [/校勘/g, "교감"],
  [/标点/g, "구두점"],
  [/標點/g, "구두점"],
  [/繁体/g, "번체"],
  [/简体/g, "간체"],
  [/字体/g, "글꼴"],
  [/字号/g, "글자 크기"],
  [/字體/g, "글꼴"],
  [/间距/g, "간격"],
  [/間距/g, "간격"],
  [/深色/g, "야경(다크)"],
  [/浅色/g, "한지(라이트)"],
  [/主题/g, "테마"],
  [/主題/g, "테마"],
];

function translateString(key, enVal, zhVal) {
  if (EXACT_MAP[key]) return EXACT_MAP[key];

  // 영어 값 기반 변환
  if (typeof enVal === "string") {
    const enLower = enVal.trim().toLowerCase();
    const enMap = {
      "home": "일주문(홈)",
      "search": "경장 검색",
      "read": "법당 독송",
      "readaloud": "독송",
      "chat": "선문답",
      "research": "화두 참구",
      "dictionary": "불교 사전",
      "lineage": "법맥도",
      "pilgrimage": "순례",
      "collections": "경함",
      "sources": "장경각",
      "exports": "공개 자료",
      "cancel": "취소",
      "confirm": "확인",
      "delete": "삭제",
      "save": "저장",
      "close": "닫기",
      "back": "뒤로",
      "next": "다음",
      "previous": "이전",
      "loading...": "불러오는 중...",
      "loading": "불러오는 중...",
      "error": "오류",
      "success": "성공",
      "copy": "복사",
      "copied": "복사 완료",
      "copied!": "복사 완료!",
      "share": "공유",
      "settings": "설정",
      "language": "언어",
      "theme": "테마",
      "font size": "글자 크기",
      "font": "글꼴",
      "logout": "로그아웃",
      "login": "로그인",
      "sign up": "회원가입",
      "register": "회원가입",
      "submit": "제출",
      "clear": "지우기",
      "reset": "초기화",
      "all": "전체",
      "filter": "필터",
      "filters": "필터",
      "send": "전송",
      "stop": "중단",
      "retry": "다시 시도",
      "help": "도움말",
      "version": "버전",
      "offline": "오프라인",
      "online": "온라인",
      "more": "더 보기",
      "new chat": "새 선문답",
    };
    if (enMap[enLower]) return enMap[enLower];
  }

  // 중국어 값 기반 치환
  if (typeof zhVal === "string") {
    let result = zhVal;
    for (const [reg, rep] of REPLACE_RULES) {
      result = result.replace(reg, rep);
    }
    return result;
  }

  return enVal || zhVal || "";
}

const finalKo = {};
const allKeys = Object.keys(en);

for (const k of allKeys) {
  finalKo[k] = translateString(k, en[k], zh[k]);
}

writeFileSync(koPath, JSON.stringify(finalKo, null, 2), "utf-8");
console.log(`Successfully generated Korean translation file with ${allKeys.length} keys.`);
