import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

/**
 * ThemeLanguageControls – Brutalist / Minimalist style
 *
 * Design principles:
 *  - No border-radius: hard square edges (brutalist)
 *  - Solid 2px border, high contrast (monochromatic system)
 *  - Bold uppercase monospaced-feel type
 *  - Inverted active state (filled block)
 *  - Theme toggle uses text symbols ☽ / ○  instead of icons
 */
const ThemeLanguageControls = () => {
  const { resolvedTheme, setTheme, mounted } = useTheme();
  const { i18n } = useTranslation();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  // Base style tokens — adapt to theme
  const borderStyle = "2px solid var(--primary-text)";
  const activeStyle = {
    backgroundColor: "var(--primary-text)",
    color: "var(--primary-bg)",
  };
  const inactiveStyle = {
    backgroundColor: "transparent",
    color: "var(--primary-text)",
  };

  return (
    <div
      className="fixed top-6 left-6 md:left-10 z-[60] flex items-center"
      style={{ gap: "0" }}
    >
      {/* Theme toggle — square brutalist button */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 text-xs font-bold uppercase tracking-widest transition-colors duration-150"
        style={{
          border: borderStyle,
          ...(isDark ? inactiveStyle : activeStyle),
        }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? "○" : "●"}
      </button>

      {/* Divider — part of the brutalist grid */}
      <div
        className="w-px h-10 md:h-11"
        style={{ backgroundColor: "var(--primary-text)" }}
        aria-hidden="true"
      />

      {/* Language EN — square button */}
      <button
        onClick={() => i18n.changeLanguage("en")}
        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 text-xs font-bold uppercase tracking-widest transition-colors duration-150"
        style={{
          border: borderStyle,
          borderLeft: "none",
          ...(i18n.language === "en" ? activeStyle : inactiveStyle),
        }}
        aria-label="Switch to English"
        aria-pressed={i18n.language === "en"}
      >
        EN
      </button>

      {/* Language ES — square button */}
      <button
        onClick={() => i18n.changeLanguage("es")}
        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 text-xs font-bold uppercase tracking-widest transition-colors duration-150"
        style={{
          border: borderStyle,
          borderLeft: "none",
          ...(i18n.language === "es" ? activeStyle : inactiveStyle),
        }}
        aria-label="Switch to Spanish"
        aria-pressed={i18n.language === "es"}
      >
        ES
      </button>
    </div>
  );
};

export default ThemeLanguageControls;
