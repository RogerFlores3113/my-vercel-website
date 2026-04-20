"use client";

export function GameVersionLink() {
  return (
    <a
      href="/"
      className="pill-link"
      onClick={() => {
        try { localStorage.setItem("rflor-site-mode", "game"); } catch {}
      }}
    >
      ← game version
    </a>
  );
}
