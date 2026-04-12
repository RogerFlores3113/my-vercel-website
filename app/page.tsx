"use client";

import dynamic from "next/dynamic";
import { GameLoader } from "./components/GameLoader";

// Load PlatformerGame client-side only — Phaser touches window/canvas at import time
const PlatformerGame = dynamic(
  () =>
    import("./components/PlatformerGame").then((m) => ({
      default: m.PlatformerGame,
    })),
  {
    ssr: false,
    loading: () => <GameLoader />,
  }
);

export default function Home() {
  return (
    <>
      {/* Skip link — always visible on Tab focus, for keyboard/screen reader users */}
      <a
        href="/boring"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:text-sm focus:rounded"
      >
        skip to standard site →
      </a>

      <PlatformerGame />
    </>
  );
}
