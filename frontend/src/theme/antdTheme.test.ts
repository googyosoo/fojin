import { describe, it, expect } from "vitest";
import { theme as antdTheme } from "antd";
import { buildAntdTheme } from "./antdTheme";
import { SANSA_LIGHT, SANSA_DARK } from "./sansa/tokens";

describe("buildAntdTheme", () => {
  it("sansa light: default algorithm, dancheong green primary, hanji bg", () => {
    const t = buildAntdTheme(false);
    expect(t.algorithm).toBe(antdTheme.defaultAlgorithm);
    expect(t.token?.colorPrimary).toBe(SANSA_LIGHT.dancheongGreen);
    expect(t.token?.colorBgBase).toBe(SANSA_LIGHT.hanji);
    expect(t.token?.colorBgContainer).toBe(SANSA_LIGHT.paper);
    expect(t.token?.colorText).toBe(SANSA_LIGHT.meok);
  });

  it("sansa dark: dark algorithm, muted dancheong green, night hanji bg", () => {
    const t = buildAntdTheme(true);
    expect(t.algorithm).toBe(antdTheme.darkAlgorithm);
    expect(t.token?.colorPrimary).toBe(SANSA_DARK.dancheongGreen);
    expect(t.token?.colorBgBase).toBe(SANSA_DARK.hanji);
    expect(t.token?.colorBgContainer).toBe(SANSA_DARK.paper);
    expect(t.token?.colorText).toBe(SANSA_DARK.meok);
  });

  it("legacy compatibility", () => {
    const lightLegacy = buildAntdTheme(false, "legacy");
    expect(lightLegacy.token?.colorPrimary).toBe("#8b2500");

    const darkLegacy = buildAntdTheme(true, "legacy");
    expect(darkLegacy.token?.colorPrimary).toBe("#e0754a");
  });
});
