"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GameLoader } from "./components/GameLoader";
import { WelcomeSplash } from "./components/WelcomeSplash";

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
  const [phase, setPhase] = useState<"splash" | "game">("splash");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rflor-site-mode");
      if (stored === "game") setPhase("game");
      else if (stored === "boring") window.location.replace("/boring");
    } catch {}
  }, []);

  if (phase === "splash") {
    return <WelcomeSplash onEnter={() => setPhase("game")} />;
  }
  return <PlatformerGame />;
}
