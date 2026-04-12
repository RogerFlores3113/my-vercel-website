"use client";

import { useEffect, useState } from "react";

const RUN_FRAMES = Array.from({ length: 8 }, (_, i) => {
  const f = String(i).padStart(3, "0");
  return `/sprites/pixellab_red_panda/animations/Slow_Run-0fccd43f/east/frame_${f}.png`;
});

export function PandaWalker() {
  const [walking, setWalking] = useState(false);
  const [frame, setFrame]     = useState(0);
  const [vw, setVw]           = useState("100vw");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVw(`${window.innerWidth}px`);
    }

    let cancelTimer: ReturnType<typeof setTimeout>;

    const startWalk = () => {
      setFrame(0);
      setWalking(true);
      // Hide after one crossing (~8s), then schedule the next appearance
      cancelTimer = setTimeout(() => {
        setWalking(false);
        scheduleNext();
      }, 8200);
    };

    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 45000; // 15-60s between walks
      cancelTimer = setTimeout(startWalk, delay);
    };

    // First walk: 8-20s after page load
    const firstDelay = 8000 + Math.random() * 12000;
    cancelTimer = setTimeout(startWalk, firstDelay);

    return () => clearTimeout(cancelTimer);
  }, []);

  // Cycle through 8 run frames at ~10fps while walking
  useEffect(() => {
    if (!walking) return;
    const interval = setInterval(() => setFrame(f => (f + 1) % 8), 100);
    return () => clearInterval(interval);
  }, [walking]);

  if (!walking) return null;

  return (
    // key forces React to remount (restarting CSS animation) on each walk
    <img
      key={Date.now()}
      src={RUN_FRAMES[frame]}
      alt=""
      width={64}
      height={64}
      className="panda-walker"
      style={{ "--panda-vw": vw } as React.CSSProperties}
    />
  );
}
