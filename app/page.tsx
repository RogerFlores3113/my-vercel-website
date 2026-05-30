"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
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

// Read the persisted site mode in an SSR-safe way: server and the first client
// render both see null (matching HTML, no hydration mismatch), then it re-syncs
// to the stored value after hydration — no setState-in-effect, no extra render.
const subscribeNoop = () => () => {};
function readStoredMode(): string | null {
  try {
    return localStorage.getItem("rflor-site-mode");
  } catch {
    return null;
  }
}

export default function Home() {
  const storedMode = useSyncExternalStore(
    subscribeNoop,
    readStoredMode,
    () => null,
  );

  // Boring-mode visitors are redirected to the traditional site.
  useEffect(() => {
    if (storedMode === "boring") window.location.replace("/boring");
  }, [storedMode]);

  // Clicking "Enter" on the splash flips into the game for the session, even if
  // nothing is stored yet.
  const [entered, setEntered] = useState(false);

  if (storedMode === "boring") return null; // redirecting
  const showGame = entered || storedMode === "game";
  if (!showGame) {
    return <WelcomeSplash onEnter={() => setEntered(true)} />;
  }
  return <PlatformerGame />;
}
