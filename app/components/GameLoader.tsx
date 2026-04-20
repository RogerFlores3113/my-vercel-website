"use client";

export function GameLoader({ error }: { error?: boolean }) {
  if (error) {
    return (
      <div className="game-loader game-loader--error">
        <p>game failed to load.</p>
        <a
          href="/boring"
          onClick={() => {
            try { localStorage.setItem("rflor-site-mode", "boring"); } catch {}
          }}
        >
          view standard site →
        </a>
      </div>
    );
  }

  return (
    <div className="game-loader">
      <div className="pixel-spinner" aria-label="Loading game..." />
    </div>
  );
}
