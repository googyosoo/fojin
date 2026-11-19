import { theme as antdTheme, type ThemeConfig } from "antd";
import { SANSA_LIGHT, SANSA_DARK, SANSA_FONTS } from "./sansa/tokens";

export function buildAntdTheme(isDark: boolean, variant: "sansa" | "legacy" = "sansa"): ThemeConfig {
  if (variant === "legacy") {
    if (!isDark) {
      return {
        algorithm: antdTheme.defaultAlgorithm,
        token: { colorPrimary: "#8b2500", borderRadius: 2, colorLink: "#0958d9" },
      };
    }
    return {
      algorithm: antdTheme.darkAlgorithm,
      token: {
        colorPrimary: "#e0754a",
        borderRadius: 2,
        colorBgBase: "#2f2820",
        colorBgContainer: "#4a4133",
        colorBgElevated: "#544a3a",
        colorBorder: "#60553f",
        colorText: "#efe8db",
        colorTextSecondary: "#c6bca6",
        colorTextLightSolid: "#17120d",
        colorLink: "#91caff",
      },
      components: {
        Layout: {
          headerBg: "#4a4133",
          footerBg: "#4a4133",
          bodyBg: "#2f2820",
        },
      },
    };
  }

  // 산사(山寺) 테마 (기본)
  if (!isDark) {
    return {
      algorithm: antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: SANSA_LIGHT.dancheongGreen,
        borderRadius: 2,
        colorBgBase: SANSA_LIGHT.hanji,
        colorBgContainer: SANSA_LIGHT.paper,
        colorText: SANSA_LIGHT.meok,
        colorTextSecondary: SANSA_LIGHT.inkSoft,
        colorBorder: SANSA_LIGHT.border,
        colorLink: SANSA_LIGHT.dancheongGreen,
        fontFamily: SANSA_FONTS.serifKR,
      },
      components: {
        Layout: {
          headerBg: SANSA_LIGHT.paper,
          footerBg: SANSA_LIGHT.paper,
          bodyBg: SANSA_LIGHT.hanji,
        },
        Button: {
          colorPrimary: SANSA_LIGHT.dancheongGreen,
          colorPrimaryHover: "#3d7565",
          colorPrimaryActive: "#24493e",
        },
        Card: {
          colorBgContainer: SANSA_LIGHT.paper,
          colorBorderSecondary: SANSA_LIGHT.border,
        },
      },
    };
  }

  // 산사 다크(야경 夜磬)
  return {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: SANSA_DARK.dancheongGreen,
      borderRadius: 2,
      colorBgBase: SANSA_DARK.hanji,
      colorBgContainer: SANSA_DARK.paper,
      colorBgElevated: "#28241f",
      colorBorder: SANSA_DARK.border,
      colorText: SANSA_DARK.meok,
      colorTextSecondary: SANSA_DARK.inkSoft,
      colorTextLightSolid: "#14120F",
      colorLink: SANSA_DARK.dancheongGreen,
      fontFamily: SANSA_FONTS.serifKR,
    },
    components: {
      Layout: {
        headerBg: SANSA_DARK.paper,
        footerBg: SANSA_DARK.paper,
        bodyBg: SANSA_DARK.hanji,
      },
      Button: {
        colorPrimary: SANSA_DARK.dancheongGreen,
        colorPrimaryHover: "#73b09d",
        colorPrimaryActive: "#4d8775",
      },
      Card: {
        colorBgContainer: SANSA_DARK.paper,
        colorBorderSecondary: SANSA_DARK.border,
      },
    },
  };
}
