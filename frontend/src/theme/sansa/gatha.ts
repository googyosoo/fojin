/**
 * 오늘의 게송 30선 (산사 테마 일주문 홈 전용)
 * 조계종 소의경전 금강경(T0235), 일상 독송 반야심경(T0251), 화엄경(T0278), 법화경(T0262) 등
 * 출처: CBETA 공용 저작물 원문, 한국어 풀이는 원전 기반 독자 해석
 */

export interface GathaItem {
  id: number;
  sutra: string;       // 경전명
  cbetaId: string;     // CBETA 등록번호
  chapter?: string;    // 품/장
  original: string;    // 한문 원문
  korean: string;      // 한글 풀이
  readerUrl: string;   // 리더 이동 경로
}

export const SANSA_GATHAS: GathaItem[] = [
  // 1. 금강경 사구게 1
  {
    id: 1,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제26 법신비상분",
    original: "若以色見我 以音聲求我 是人行邪道 不能見如來",
    korean: "형상으로 나를 보려 하거나 음성으로 나를 구하면, 이 사람은 삿된 길을 걷는 것이니 여래를 볼 수 없다네.",
    readerUrl: "/texts/T0235",
  },
  // 2. 금강경 사구게 2
  {
    id: 2,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제32 응화비진분",
    original: "一切有爲法 如夢幻泡影 如露亦如電 應作如是觀",
    korean: "일체의 조작된 현상은 꿈이나 허깨비, 거품이나 그림자 같고, 이슬 같으며 번개와 같으니 마땅히 이와 같이 관할지니라.",
    readerUrl: "/texts/T0235",
  },
  // 3. 반야심경 핵심
  {
    id: 3,
    sutra: "반야바라밀다심경",
    cbetaId: "T0251",
    chapter: "본문",
    original: "色不異空 空不異色 色卽是空 空卽是色 受想行識 亦復如是",
    korean: "물질이 공과 다르지 않고 공이 물질과 다르지 않으니, 물질이 곧 공이요 공이 곧 물질이라. 느낌과 생각, 지어감과 의식도 다 이와 같느니라.",
    readerUrl: "/texts/T0251",
  },
  // 4. 금강경 응무소주
  {
    id: 4,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제10 장엄정토분",
    original: "不應住色生心 不應住聲香味觸法生心 應無所住 而生其心",
    korean: "마땅히 형상에 머물러 마음을 내지 말고, 소리와 냄새와 맛과 감촉과 생각에 머물러 마음을 내지 말며, 머무는 바 없이 그 마음을 낼지니라.",
    readerUrl: "/texts/T0235",
  },
  // 5. 반야심경 무유공포
  {
    id: 5,
    sutra: "반야바라밀다심경",
    cbetaId: "T0251",
    chapter: "본문",
    original: "心無罣礙 無罣礙故 無有恐怖 遠離顚倒夢想 究竟涅槃",
    korean: "마음에 걸림이 없고 걸림이 없으므로 두려움이 없어서, 뒤바뀐 헛된 생각을 멀리 여의어 마침내 온전한 고요에 이르느니라.",
    readerUrl: "/texts/T0251",
  },
  // 6. 금강경 제사구게 3
  {
    id: 6,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제5 여리실견분",
    original: "凡所有相 皆是虛妄 若見諸相非相 卽見如來",
    korean: "무릇 형상 있는 모든 것은 허망하니, 만약 모든 형상이 형상이 아님을 꿰뚫어 보면 곧 참된 여래를 보리라.",
    readerUrl: "/texts/T0235",
  },
  // 7. 반야심경 관자재
  {
    id: 7,
    sutra: "반야바라밀다심경",
    cbetaId: "T0251",
    chapter: "본문",
    original: "觀自在菩薩 行深般若波羅蜜多時 照見五蘊皆空 度一切苦厄",
    korean: "관자재보살이 깊은 반야바라밀다를 행할 때 오온이 모두 비어 있음을 비추어 보고 온갖 괴로움과 재앙을 건넜느니라.",
    readerUrl: "/texts/T0251",
  },
  // 8. 금강경 무유정법
  {
    id: 8,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제7 무득무설분",
    original: "無有定法 名阿耨多羅三藐三菩提 亦無有定法 如來可說",
    korean: "정해진 법이 없어 이름이 드넓은 깨달음이며, 여래께서 말씀하신 것 또한 고정된 법이 아니니라.",
    readerUrl: "/texts/T0235",
  },
  // 9. 금강경 뗏목의 비유
  {
    id: 9,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제6 정신희유분",
    original: "汝等比丘 知我說法 如筏喩者 法尙應捨 何況非法",
    korean: "너희 비구들이여, 나의 설법이 뗏목의 비유와 같음을 알라. 옳은 법도 오히려 마땅히 놓아야 하거늘 하물며 법 아닌 것이겠는가.",
    readerUrl: "/texts/T0235",
  },
  // 10. 반야심경 주문
  {
    id: 10,
    sutra: "반야바라밀다심경",
    cbetaId: "T0251",
    chapter: "본문",
    original: "揭諦揭諦 波羅揭諦 波羅僧揭諦 菩提娑婆訶",
    korean: "가자, 가자, 저 피안의 언덕으로 넘어가자. 모두 함께 건너가 참된 깨달음을 온전히 이루세.",
    readerUrl: "/texts/T0251",
  },
  // 11. 금강경 과거심불가득
  {
    id: 11,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제18 일체동관분",
    original: "過去心不可得 現在心不可得 未來心不可得",
    korean: "지나간 마음도 붙잡을 수 없고, 지금의 마음도 머물지 않으며, 오지 않은 마음 또한 잡을 수 없느니라.",
    readerUrl: "/texts/T0235",
  },
  // 12. 금강경 청정심
  {
    id: 12,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제14 이상적멸분",
    original: "諸菩薩摩訶薩 應如是生淸淨心",
    korean: "모든 보살마하살은 마땅히 이와 같이 맑고 깨끗한 마음을 낼지니라.",
    readerUrl: "/texts/T0235",
  },
  // 13. 반야심경 불생불멸
  {
    id: 13,
    sutra: "반야바라밀다심경",
    cbetaId: "T0251",
    chapter: "본문",
    original: "是諸法空相 不生不滅 不垢不淨 不增不減",
    korean: "이 모든 존재의 본성은 비어 있어서 나지도 않고 사라지지도 않으며, 더럽지도 깨끗하지도 않고, 늘지도 줄지도 않느니라.",
    readerUrl: "/texts/T0251",
  },
  // 14. 금강경 실상
  {
    id: 14,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제14 이상적멸분",
    original: "離一切諸相 卽名諸佛",
    korean: "모든 겉모습과 관념의 틀을 훌쩍 벗어나면 곧 부처라 이름하느니라.",
    readerUrl: "/texts/T0235",
  },
  // 15. 화엄경 약찬게 심여공화사
  {
    id: 15,
    sutra: "대방광불화엄경",
    cbetaId: "T0278",
    chapter: "야마천궁보살설게품",
    original: "心如工畫師 能畫諸世間 五蘊悉從生 無法而不造",
    korean: "마음은 솜씨 좋은 그림 그리는 이와 같아서 온갖 세상을 그려내니, 오온이 다 마음을 따라 생겨나 마음이 짓지 못하는 것이 없네.",
    readerUrl: "/texts/T0278",
  },
  // 16. 화엄경 일체유심조
  {
    id: 16,
    sutra: "대방광불화엄경",
    cbetaId: "T0278",
    chapter: "야마천궁보살설게품",
    original: "若人欲了知 三世一切佛 應觀法界性 一切唯心造",
    korean: "과거·현재·미래의 모든 부처님을 알고자 한다면, 마땅히 온 법계의 본성을 살필지니 일체는 오직 마음이 지어내는 것이라네.",
    readerUrl: "/texts/T0278",
  },
  // 17. 묘법연화경 삼계화택
  {
    id: 17,
    sutra: "묘법연화경",
    cbetaId: "T0262",
    chapter: "비유품",
    original: "三界無安 猶如火宅 衆苦充滿 甚可怖畏",
    korean: "삼계가 편안하지 않음이 불타는 집과 같아, 온갖 괴로움이 가득 차 진실로 두렵고 위태롭도다.",
    readerUrl: "/texts/T0262",
  },
  // 18. 묘법연화경 보살행
  {
    id: 18,
    sutra: "묘법연화경",
    cbetaId: "T0262",
    chapter: "관세음보살보문품",
    original: "念彼觀音力 疾走無邊方 悲體戒雷震 慈意妙大雲",
    korean: "자비로운 관음의 힘을 가만히 새기면 험난한 고난도 흩어지니, 대비의 몸은 우레처럼 진동하고 자애로운 뜻은 단비 구름 같네.",
    readerUrl: "/texts/T0262",
  },
  // 19. 법구경 마음의 다스림
  {
    id: 19,
    sutra: "법구경",
    cbetaId: "T0210",
    chapter: "심의품",
    original: "心爲法本 心尊心使 心念作惡 罪反自生",
    korean: "마음이 모든 존재의 으뜸이며 주인이니, 악한 마음으로 생각하고 행동하면 재앙이 저절로 제 몸을 따르리라.",
    readerUrl: "/texts/T0210",
  },
  // 20. 법구경 지혜의 빛
  {
    id: 20,
    sutra: "법구경",
    cbetaId: "T0210",
    chapter: "쌍요품",
    original: "夫心之精 一念生善 吉慶相隨 如影隨形",
    korean: "마음의 정수가 맑아 한 생각 선을 일으키면, 좋은 기운과 평안이 그림자가 형상을 따르듯 늘 뒤따르리라.",
    readerUrl: "/texts/T0210",
  },
  // 21. 유마경 직심시도량
  {
    id: 21,
    sutra: "유마힐소설경",
    cbetaId: "T0475",
    chapter: "보살품",
    original: "直心是道場 無虛假故 發行是道場 能辦事故",
    korean: "곧은 마음이 곧 도량이니 거짓이 없기 때문이요, 실천하는 마음이 도량이니 능히 뜻한 바를 온전히 이루기 때문이라네.",
    readerUrl: "/texts/T0475",
  },
  // 22. 유마경 심청정
  {
    id: 22,
    sutra: "유마힐소설경",
    cbetaId: "T0475",
    chapter: "불국품",
    original: "隨其心淨 則佛土淨",
    korean: "그 마음이 맑고 고요해짐을 따라서, 바로 그 자리가 맑고 깨끗한 불국토가 되느니라.",
    readerUrl: "/texts/T0475",
  },
  // 23. 능엄경 회광반조
  {
    id: 23,
    sutra: "대불정여래밀인수증요의제보살만행수능엄경",
    cbetaId: "T0945",
    chapter: "권제2",
    original: "反妄歸眞 知見無見 斯卽涅槃",
    korean: "헛된 집착을 돌이켜 참성품으로 돌아가고, 겉으로 보는 알음알이를 내려놓으면 그 자리가 바로 열반이니라.",
    readerUrl: "/texts/T0945",
  },
  // 24. 원각경 여의
  {
    id: 24,
    sutra: "대방광원각수다라요의경",
    cbetaId: "T0842",
    chapter: "보안보살장",
    original: "知幻卽離 不作方便 離幻卽覺 亦無漸次",
    korean: "환상임을 알면 곧 벗어나 방편을 지을 것이 없고, 환상을 벗어나면 곧 깨달음이니 단계가 따로 없느니라.",
    readerUrl: "/texts/T0842",
  },
  // 25. 육조단경 본래무일물
  {
    id: 25,
    sutra: "육조법보단경",
    cbetaId: "T2008",
    chapter: "행유품",
    original: "菩提本無樹 明鏡亦非臺 本來無一物 何處惹塵埃",
    korean: "보리는 본래 나무가 없고 밝은 거울 또한 받침대가 아니로다. 본래 한 물건도 없거늘 어느 곳에 티끌 먼지가 앉으리오.",
    readerUrl: "/texts/T2008",
  },
  // 26. 신심명 지도무난
  {
    id: 26,
    sutra: "신심명",
    cbetaId: "T2010",
    chapter: "본문",
    original: "至道無難 唯嫌揀擇 但莫憎愛 洞然明白",
    korean: "지극한 도는 어렵지 않으니 오직 가려 뽑고 차별하는 마음을 꺼릴 뿐이라. 밉고 고운 분별만 없애면 훤칠하게 명백하리라.",
    readerUrl: "/texts/T2010",
  },
  // 27. 증도가 환화공신
  {
    id: 27,
    sutra: "영가진각선사증도가",
    cbetaId: "T2014",
    chapter: "본문",
    original: "幻化空身卽法身 法身無物無自性",
    korean: "환상과 같이 비어 있는 이 몸이 곧 법신이니, 법신은 고정된 물건도 없고 머무는 자성도 없네.",
    readerUrl: "/texts/T2014",
  },
  // 28. 무문관 춘유백화
  {
    id: 28,
    sutra: "선종무문관",
    cbetaId: "T2005",
    chapter: "제19칙 평상시도",
    original: "春有百花秋有月 夏有涼風冬有雪 若無閑事挂心頭 便是人間好時節",
    korean: "봄에는 온갖 꽃 피고 가을에는 밝은 달, 여름엔 시원한 바람 겨울엔 하얀 눈이라. 마음에 부질없는 일 걸리지 않는다면 이것이 참으로 사람 살기 좋은 시절일세.",
    readerUrl: "/texts/T2005",
  },
  // 29. 금강경 수지독송
  {
    id: 29,
    sutra: "금강반야바라밀경",
    cbetaId: "T0235",
    chapter: "제15 지경공덕분",
    original: "若有人 發信心 受持讀誦 爲他人說 其福勝彼",
    korean: "만약 어떤 이가 맑은 믿음을 내어 이 경을 받아 지녀 읽고 외우며 다른 이를 위해 베풀어 말하면 그 복덕이 헤아릴 수 없이 뛰어나리라.",
    readerUrl: "/texts/T0235",
  },
  // 30. 반야심경 아뇩다라삼먁삼보리
  {
    id: 30,
    sutra: "반야바라밀다심경",
    cbetaId: "T0251",
    chapter: "본문",
    original: "三世諸佛 依般若波羅蜜多故 得阿耨多羅三藐三菩提",
    korean: "삼세의 모든 부처님도 반야바라밀다에 의지하므로 온전하고 밝은 최상의 깨달음을 얻으셨느니라.",
    readerUrl: "/texts/T0251",
  },
];

/**
 * 오늘 날짜(일 기준)에 맞는 게송 반환 (1~30 순환)
 */
export function getTodayGatha(date: Date = new Date()): GathaItem {
  const day = date.getDate();
  const index = (day - 1) % SANSA_GATHAS.length;
  return SANSA_GATHAS[index];
}
