"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export function WelcomeSplash({ onEnter }: { onEnter: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleEnter() {
    try { localStorage.setItem("rflor-site-mode", "game"); } catch {}
    dialogRef.current?.close();
    onEnter();
  }

  function handleBoring() {
    try { localStorage.setItem("rflor-site-mode", "boring"); } catch {}
  }

  return (
    <dialog ref={dialogRef} className="welcome-splash">
      <div className="splash-modal">
        <Image
          src="/headshot_pic.jpg"
          alt="Roger Flores"
          width={100}
          height={100}
          className="splash-portrait"
          priority
        />
        <h1 className="splash-heading">Hi, I&apos;m Roger.</h1>
        <p className="splash-sub">welcome to my portfolio website.</p>
        <div className="splash-actions">
          <button onClick={handleEnter} className="splash-btn-primary">
            Enter
          </button>
          <Link
            href="/boring"
            onClick={handleBoring}
            className="splash-btn-secondary"
          >
            Traditional website →
          </Link>
        </div>
      </div>
    </dialog>
  );
}
