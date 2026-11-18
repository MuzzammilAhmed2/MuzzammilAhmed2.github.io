"use client";

import { useEffect, useState } from "react";

/**
 * Local-only preview switcher for the two design directions.
 * Rendered only when NEXT_PUBLIC_THEME_SWITCHER=1 at build time, so it never ships to the live site.
 * Also accepts ?theme=current|a|a-violet|b in the URL.
 */
const options = [
  { id: "current", label: "Current" },
  { id: "a", label: "A · teal" },
  { id: "a-violet", label: "A · violet" },
  { id: "b", label: "B · light" },
] as const;
type Choice = (typeof options)[number]["id"];

export const THEME_KEY = "theme-preview";

export function applyTheme(choice: string) {
  const el = document.documentElement;
  const [theme, accent] = choice.split("-");
  if (theme === "a" || theme === "b") el.dataset.theme = theme;
  else delete el.dataset.theme;
  if (accent === "violet") el.dataset.accent = "violet";
  else delete el.dataset.accent;
}

export default function ThemeSwitcher() {
  const [choice, setChoice] = useState<Choice>("current");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = new URLSearchParams(location.search).get("theme") || localStorage.getItem(THEME_KEY);
    } catch {}
    if (saved && options.some((o) => o.id === saved)) setChoice(saved as Choice);
  }, []);

  const pick = (c: Choice) => {
    setChoice(c);
    applyTheme(c);
    try {
      localStorage.setItem(THEME_KEY, c);
    } catch {}
    window.dispatchEvent(new Event("resize")); // let ScrollTrigger re-measure
  };

  return (
    <div
      role="group"
      aria-label="Preview design direction"
      className="fixed bottom-4 left-4 z-[95] flex gap-1 rounded-full border border-line bg-surface/90 p-1 font-mono text-[11px] shadow-lg backdrop-blur"
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => pick(o.id)}
          aria-pressed={choice === o.id}
          className={`rounded-full px-3 py-1.5 transition-colors ${choice === o.id ? "bg-accent text-accent-ink" : "text-muted hover:text-text"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
