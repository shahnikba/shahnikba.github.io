"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    root.setAttribute("data-theme", current === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="cursor-pointer text-[color:var(--muted)] italic hover:text-[color:var(--accent)]"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        fontFamily: "var(--serif)",
        fontSize: "var(--size-utility)",
        fontVariant: "small-caps",
        letterSpacing: "0.08em",
        visibility: mounted ? "visible" : "hidden",
      }}
    >
      invert
    </button>
  );
}
