import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { AutoComplete } from "antd";
import {
  DatabaseOutlined,
  SearchOutlined,
  UpOutlined,
  DownOutlined,
  ApartmentOutlined,
  RobotOutlined,
  ReadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { InfoCircleOutlined, CloseOutlined } from "@ant-design/icons";
import SourceSelector from "../components/SourceSelector";
import XiaojinPet from "../components/XiaojinPet";
import { getStats, getSources, getFilters, getSearchSuggestItems, getHomeShowcase } from "../api/client";
import { askQueryFrom, buildHomeSuggestOptions, itemsFromSuggestResponse, type SuggestGroup } from "./homeSuggest";
import { getLangName } from "../utils/sourceUrls";
import { getReadingHistory } from "../utils/readingHistory";
import { useAuthStore } from "../stores/authStore";
import "../styles/home.css"; // mobile-responsive v2.1
import { LangAlternates } from "../seo/LangAlternates";
import SansaHero from "../components/SansaHero";

/** 代码点级截断：CBETA 题名偶含扩展 B 区汉字，String.slice 会撕裂代理对。 */
function truncateTitle(title: string, max = 12): string {
  const chars = Array.from(title);
  return chars.length > max ? `${chars.slice(0, max).join("")}…` : title;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [sourceOpen, setSourceOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tipDismissed, setTipDismissed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // 一次性读取，避免每次 render 触碰 localStorage
  const [recentReading] = useState(() => getReadingHistory().slice(0, 3));

  const { data: stats } = useQuery({ queryKey: ["stats"], queryFn: getStats });
  const { data: sources } = useQuery({ queryKey: ["sources"], queryFn: getSources, enabled: sourceOpen });
  const { data: filters } = useQuery({ queryKey: ["filters"], queryFn: getFilters });

  // Dynamic hero-card content. Best-effort: on error/loading, `showcase` is
  // undefined and each card renders its static `feature_*_desc` fallback.
  const { data: showcase } = useQuery({ queryKey: ["homeShowcase"], queryFn: getHomeShowcase, staleTime: 5 * 60_000 });

  // One random value per pool, fixed once at mount (a lazy initializer is the
  // allowed place for the impure Math.random). So every page load / refresh
  // shows a different pick from each cached pool — the cards feel alive without
  // any extra backend round-trip.
  const [rand] = useState(() => ({
    sources: Math.random(), chat: Math.random(), dict: Math.random(),
    kg: Math.random(), geo: Math.random(),
  }));


  // Pick one item from each cached pool using the per-mount random values.
  const sc = useMemo(() => {
    const at = (r: number, len: number) => Math.floor(r * len) % Math.max(1, len);
    // Deterministic seeded shuffle → take n. Uses only the passed seed (pure),
    // so multi-item cards (source names, geo places) get a fully-random distinct
    // sample per load, not an overlapping sliding window.
    const sample = (arr: string[], n: number, seed: number): string[] => {
      const a = arr.slice();
      let s = Math.floor(seed * 2 ** 31) || 1;
      const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a.slice(0, n);
    };

    const KO_SHOWCASE_QUESTIONS = [
      "천태 지관과 밀교 생기차제는 어떤 차이가 있습니까?",
      "《반야심경》에서 '색즉시공 공즉시색'의 참뜻은 무엇입니까?",
      "선종의 '불립문자' 사상은 어떤 경전에서 비롯되었습니까?",
      "사성제의 고·집·멸·도 핵심 교리와 실천 방법은 무엇입니까?",
      "구마라집과 현장의 경전 번역 문체는 어떻게 다릅니까?"
    ];

    const KO_SHOWCASE_TERMS = [
      { term: "반야(般若)", definition: "Prajñā — 만물의 실상을 있는 그대로 꿰뚫어 보는 근원적 지혜" },
      { term: "공(空)", definition: "Śūnyatā — 만물이 고정된 실체 없이 연기(緣起)하여 존재함" },
      { term: "열반(涅槃)", definition: "Nirvāṇa — 모든 번뇌의 불길이 꺼진 절대 평정의 해탈 경지" },
      { term: "보리(菩提)", definition: "Bodhi — 미혹을 끊고 얻는 무상정등각(깨달음)" }
    ];

    const KO_SHOWCASE_TRIPLES = [
      { subject: "불타습·축도생 등", predicate: "활동", object: "남조(송)" },
      { subject: "구마라집", predicate: "역경", object: "《묘법연화경》" },
      { subject: "현장법사", predicate: "구법", object: "인도 나란다 대학" },
      { subject: "원효대사", predicate: "저술", object: "《대승기신론소》" }
    ];

    const places = showcase?.geo?.places ?? [];
    const KO_SOURCE_NAMES = ["CBETA", "SAT 대장경", "동국역경원", "고려대장경", "팔리 삼장", "BDRC 티베트 대장경", "84000 대장경"];
    const srcNames = KO_SOURCE_NAMES;
    return {
      sources: {
        count: showcase?.sources?.sources || 667,
        names: sample(srcNames, 3, rand.sources)
      },
      chat: KO_SHOWCASE_QUESTIONS[at(rand.chat, KO_SHOWCASE_QUESTIONS.length)],
      dict: KO_SHOWCASE_TERMS[at(rand.dict, KO_SHOWCASE_TERMS.length)],
      kg: KO_SHOWCASE_TRIPLES[at(rand.kg, KO_SHOWCASE_TRIPLES.length)],
      geo: showcase?.geo && showcase.geo.count > 0
        ? { count: showcase.geo.count, places: sample(places, 3, rand.geo) }
        : null,
    };
  }, [showcase, rand]);

  // 搜索联想：复用 SearchPage 已有的 /search/suggest 接口与防抖模式。
  // 后端按 type 排好序，这里分组显示（经名 / 词条 / 热门问题），末尾固定一行「问小津」
  // —— 首页主输入框此前只会搜索，而产品核心是问答（见 homeSuggest.ts）。
  const [acOptions, setAcOptions] = useState<SuggestGroup[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchSuggestions = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value || value.length < 1) {
      setAcOptions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await getSearchSuggestItems(value);
        setAcOptions(buildHomeSuggestOptions(itemsFromSuggestResponse(data), value, t));
      } catch {
        // 联想挂了也要留「问小津」这一行 —— 它不依赖后端
        setAcOptions(buildHomeSuggestOptions([], value, t));
      }
    }, 300);
  }, [t]);

  const handleSearch = (q?: string) => {
    const term = (q ?? query).trim();
    if (term) {
      setAcOptions([]);
      const params = new URLSearchParams({ q: term });
      if (selectedSources.size > 0) {
        params.set("sources", Array.from(selectedSources).join(","));
      }
      navigate(`/search?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const langAllCount = filters?.languages_all
    ? new Set(filters.languages_all.map(getLangName)).size
    : 0;
  const srcCount = stats?.source_count ?? 0;
  const srcLabel = selectedSources.size > 0
    ? t("home.selected_sources", { n: selectedSources.size })
    : t("home.all_sources", "전체 자료원");
  const KO_HOT_TAGS = ["금강경", "반야심경", "화엄경", "능엄경", "현장", "구마라집", "선종", "천태"];
  const rawTags = t("home.hot_tags", { returnObjects: true });
  const hotTags = Array.isArray(rawTags) && rawTags.length > 0 && typeof rawTags[0] === "string" && !rawTags[0].includes("Diamond")
    ? rawTags
    : KO_HOT_TAGS;

  return (
    <div className="home-page">
      <Helmet>
        <title>{t("app.title")}</title>
      </Helmet>
      <LangAlternates path="/" />
      <SansaHero />
      <section className="home-hero">
        <div className="home-hero-bg">
          <img src={`${import.meta.env.BASE_URL}landscape-bg.webp`} alt="" decoding="async" />
        </div>
        <h1 className="home-title">
          <span className="home-title-accent">{t("home.title_accent")}</span>{t("home.title_rest")}
        </h1>
        <div className="home-subtitle">{t("app.tagline")}</div>

        {/* 合并搜索栏 */}
        <div className="search-combo">
          <div className="search-combo-bar">
            <button
              className="search-combo-src"
              onClick={() => setSourceOpen(!sourceOpen)}
              aria-label={t("home.select_source")}
              aria-expanded={sourceOpen}
              aria-haspopup="listbox"
            >
              <DatabaseOutlined />
              <span className="search-combo-src-text">{srcLabel}</span>
              <span className="search-combo-badge">{srcCount || "—"}</span>
              {sourceOpen ? <UpOutlined /> : <DownOutlined />}
            </button>
            <div className="search-combo-divider" />
            <AutoComplete
              className="search-combo-ac"
              options={acOptions.map((g) => ({ label: t(g.label), options: g.options }))}
              value={query}
              onChange={setQuery}
              onSearch={fetchSuggestions}
              onSelect={(value: string) => {
                const ask = askQueryFrom(value);
                if (ask) {
                  // 用户已按下「问小津」—— 等同于在 /chat 里按回车（send=1 深链契约）
                  setQuery(ask);
                  navigate(`/chat?q=${encodeURIComponent(ask)}&send=1`);
                  return;
                }
                handleSearch(value);
              }}
              popupMatchSelectWidth={320}
            >
              <input
                ref={inputRef}
                className="search-combo-input"
                placeholder={t("home.search_placeholder")}
                onKeyDown={handleKeyDown}
                aria-label={t("home.search_label")}
              />
            </AutoComplete>
            <button className="search-combo-btn" onClick={() => handleSearch()}>
              <SearchOutlined /> <span className="search-combo-btn-text">{t("home.search_btn")}</span>
            </button>
          </div>

          {/* 数据源面板 */}
          {sourceOpen && sources && (
            <SourceSelector
              sources={sources}
              selected={selectedSources}
              onChange={setSelectedSources}
            />
          )}
        </div>

        {/* 热门检索 */}
        <div className="home-hot-tags">
          <span className="home-hot-label">{t("home.hot_label")}</span>
          {hotTags.map((tag) => (
            <button key={tag} className="home-hot-tag" onClick={() => handleSearch(tag)}>
              {tag}
            </button>
          ))}
        </div>

        {/* 续读入口：有本地阅读记录才出现，复用热门检索的样式 */}
        {recentReading.length > 0 && (
          <div className="home-hot-tags">
            <span className="home-hot-label">{t("home.continue_reading")}</span>
            {recentReading.map((e) => (
              <button
                key={e.textId}
                className="home-hot-tag"
                onClick={() => navigate(`/texts/${e.textId}/read?juan=${e.juan}`)}
                title={e.title}
              >
                《{truncateTitle(e.title)}》{t("home.juan_n", { n: e.juan })}
              </button>
            ))}
          </div>
        )}

        <div className="home-stats" role="group" aria-label={t("home.stat_label")}>
          <div className="home-stat-item">
            <div className="home-stat-num">
              {stats ? stats.total_texts.toLocaleString() : "—"}
            </div>
            <div className="home-stat-lbl">{t("home.stat_texts")}</div>
          </div>
          <div className="home-stat-item">
            <div className="home-stat-num">{srcCount || "—"}</div>
            <div className="home-stat-lbl">{t("home.stat_sources")}</div>
          </div>
          <div className="home-stat-item">
            <div className="home-stat-num">{langAllCount || "—"}</div>
            <div className="home-stat-lbl">{t("home.stat_langs")}</div>
          </div>
        </div>

        <div className="home-features">
          {/* 首页功能卡与顶部导航一一对应、同顺序：AI 问答 · 读经 · 佛学辞典 · 数据源 · 知识图谱
              （2026-11-03 按 30 天真实使用重排，读经取代经典专题）。核对经文、佛教地理不在导航，
              卡片也不放；/verify、/map、/collections 路由仍可直达。导航增减时这里同步改。 */}
          <div
            className="home-feature-card"
            data-umami-event="home_card"
            data-umami-event-card="chat"
            onClick={() =>
              navigate(sc.chat ? `/chat?q=${encodeURIComponent(sc.chat)}` : "/chat")
            }
          >
            <RobotOutlined className="home-feature-icon" />
            <div className="home-feature-title">{t("home.feature_chat_title")}</div>
            <div className="home-feature-desc">
              {sc.chat || t("home.feature_chat_desc")}
            </div>
          </div>
          {/* 读经卡：有本地阅读记录就直达上次读到的卷，否则去 /read。 */}
          <div
            className="home-feature-card"
            data-umami-event="home_card"
            data-umami-event-card={recentReading[0] ? "read_continue" : "read"}
            onClick={() =>
              navigate(
                recentReading[0]
                  ? `/texts/${recentReading[0].textId}/read?juan=${recentReading[0].juan}`
                  : "/read",
              )
            }
          >
            <ReadOutlined className="home-feature-icon" />
            <div className="home-feature-title">{t("home.feature_read_title")}</div>
            <div className="home-feature-desc">
              {recentReading[0]
                ? t("home.feature_read_continue", { title: truncateTitle(recentReading[0].title) })
                : t("home.feature_read_desc")}
            </div>
          </div>
          <div
            className="home-feature-card"
            data-umami-event="home_card"
            data-umami-event-card="dict"
            onClick={() =>
              navigate(sc.dict ? `/dictionary?q=${encodeURIComponent(sc.dict.term)}` : "/dictionary")
            }
          >
            <FileTextOutlined className="home-feature-icon" />
            <div className="home-feature-title">{t("home.feature_dict_title", "불교 사전")}</div>
            <div className="home-feature-desc">
              {sc.dict
                ? `${sc.dict.term} — ${sc.dict.definition}`
                : t("home.feature_dict_desc", "반야 — 제법의 실상을 비추어 보는 지혜")}
            </div>
          </div>
          <div
            className="home-feature-card"
            data-umami-event="home_card"
            data-umami-event-card="sources"
            onClick={() => navigate("/sources")}
          >
            <DatabaseOutlined className="home-feature-icon" />
            <div className="home-feature-title">{t("home.feature_sources_title", "장경각(자료원)")}</div>
            <div className="home-feature-desc">
              {sc.sources && sc.sources.names.length > 0
                ? `${sc.sources.count.toLocaleString()}개 자료원 · ${sc.sources.names.join(" · ")}`
                : t("home.feature_sources_desc", "CBETA, SAT 등 전 세계 디지털 대장경 자료")}
            </div>
          </div>
          <div
            className="home-feature-card"
            data-umami-event="home_card"
            data-umami-event-card="kg"
            onClick={() => navigate("/kg")}
          >
            <ApartmentOutlined className="home-feature-icon" />
            <div className="home-feature-title">{t("home.feature_kg_title", "법맥도(지식 그래프)")}</div>
            <div className="home-feature-desc">
              {sc.kg
                ? `${sc.kg.subject} → ${sc.kg.predicate} → ${sc.kg.object}`
                : t("home.feature_kg_desc", "구마라집 → 역경 → 《묘법연화경》")}
            </div>
          </div>
        </div>

        {!user && !tipDismissed && (
          <div className="home-tip">
            <InfoCircleOutlined style={{ marginRight: 6, flexShrink: 0 }} />
            <span>
              {t("home.guest_tip.before", "회원가입 없이 검색과 경전 독송이 가능하며, AI 선문답도 매일 무료로 질문할 수 있습니다. ")}
              <a onClick={() => navigate("/login")} style={{ cursor: "pointer", textDecoration: "underline" }}>
                {t("home.guest_tip.login", "로그인")}
              </a>
              {t("home.guest_tip.after", "하시면 대화 저장, 일일 질문 한도 확대, 보관함 및 독송 기록 동기화가 가능합니다.")}
            </span>
            <CloseOutlined
              onClick={() => setTipDismissed(true)}
              style={{ marginLeft: 8, cursor: "pointer", flexShrink: 0, fontSize: 12, opacity: 0.6 }}
            />
          </div>
        )}

        <div className="home-trust">
          {t("home.trust", "모든 자료는 원문 사이트로 추적할 수 있으며, 외부 링크는 매일 자동 점검합니다.")} ·{" "}
          <span className="home-trust-link" onClick={() => navigate("/sources")}>{t("home.trust_link", "자료원 안내 보기 →")}</span>
        </div>

      </section>

      {/* 小津：默认右下角，可拖到任意位置（位置记在 localStorage）。
          position:fixed，不参与 hero 的定高布局；意见反馈入口在它气泡底部。 */}
      <XiaojinPet />
    </div>
  );
}
