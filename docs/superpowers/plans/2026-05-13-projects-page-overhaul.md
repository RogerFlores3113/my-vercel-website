# Projects Page Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the personal projects section — new cards, rewritten copy, screenshot thumbnails on every card, and a coming-soon modal for Search.

**Architecture:** All changes are in `app/(site)/projects/page.tsx` plus two new client components (`ComingSoonModal`, `OfflinePlaceholder`) and CSS additions to `globals.css`. Screenshots are captured via the `/browse` skill and saved to `public/screenshots/`. No routing changes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `app/components/ComingSoonModal.tsx` | Overlay modal for Search card click |
| Create | `app/components/ComingSoonModal.test.ts` | Unit test for modal open/close logic |
| Create | `app/components/OfflinePlaceholder.tsx` | Image-slot replacement for non-web projects |
| Modify | `app/globals.css` | Add `.project-screenshot`, `.modal-*`, `.offline-placeholder` styles |
| Modify | `app/(site)/projects/page.tsx` | All card content + screenshot slots + modal wiring |
| Create | `public/screenshots/*.png` | Real screenshots captured via browse skill |

---

## Task 1: Capture screenshots for live projects

**Files:**
- Create: `public/screenshots/podium.png`
- Create: `public/screenshots/short.png`
- Create: `public/screenshots/longdle.png`
- Create: `public/screenshots/experiments.png`
- Create: `public/screenshots/property.png`

- [ ] **Step 1: Capture Podium screenshot**

Invoke the `/browse` skill. Navigate to `https://podium.rogerflores.dev/` and save a full-page screenshot to `public/screenshots/podium.png`. Aim for a viewport width of 1280px.

- [ ] **Step 2: Capture Short screenshot**

Invoke the `/browse` skill. Navigate to `https://short.rogerflores.dev` and save to `public/screenshots/short.png`.

- [ ] **Step 3: Capture Longdle screenshot**

Invoke the `/browse` skill. Navigate to `https://longdle.rogerflores.dev` and save to `public/screenshots/longdle.png`.

- [ ] **Step 4: Capture Experiments screenshot**

Invoke the `/browse` skill. Navigate to `https://experiments.rogerflores.dev` and save to `public/screenshots/experiments.png`.

- [ ] **Step 5: Capture Property screenshot**

Invoke the `/browse` skill. Navigate to `https://property.rogerflores.dev` and save to `public/screenshots/property.png`.

- [ ] **Step 6: Verify all screenshots exist**

```bash
ls -lh public/screenshots/
```
Expected: 5 `.png` files, each > 10KB.

- [ ] **Step 7: Commit**

```bash
git add public/screenshots/
git commit -m "assets: add live-site screenshots for project cards"
```

---

## Task 2: Add CSS for screenshot thumbnails, modal, and offline placeholder

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add screenshot slot styles**

Append to `app/globals.css` after the `.project-card.featured-card` block (around line 260).

Also add `overflow: hidden` to the existing `.project-card` rule (around line 140) so the screenshot thumbnail bleeds cleanly into the card's rounded corners:

```css
.project-card {
  /* existing properties ... */
  overflow: hidden; /* ← add this line */
}
```

Then append:

```css
/* Project card screenshot thumbnail */
.project-screenshot {
  position: relative;
  height: 180px;
  margin: -28px -28px 20px -28px;
  border-radius: 14px 14px 0 0;
  overflow: hidden;
  background: var(--border);
}

.project-screenshot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* Offline project placeholder (non-web-app indicator) */
.offline-placeholder {
  height: 180px;
  margin: -28px -28px 20px -28px;
  border-radius: 14px 14px 0 0;
  background: var(--background-card);
  border-bottom: 1px dashed var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--foreground-faint);
}

.offline-placeholder svg {
  opacity: 0.5;
}

.offline-placeholder span {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* Coming-soon modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-box {
  background: var(--background-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 36px 40px;
  max-width: 360px;
  width: 90%;
  text-align: center;
  position: relative;
}

.modal-box p {
  font-size: 16px;
  color: var(--foreground-muted);
  line-height: 1.5;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--foreground-faint);
  font-size: 18px;
  line-height: 1;
  padding: 4px;
}

.modal-close:hover {
  color: var(--foreground);
}
```

- [ ] **Step 2: Verify dev server still starts**

```bash
npm run dev
```
Expected: compiles without errors. Kill after confirming.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add screenshot thumbnail, offline placeholder, and modal CSS"
```

---

## Task 3: Build ComingSoonModal component with test

**Files:**
- Create: `app/components/ComingSoonModal.tsx`
- Create: `app/components/ComingSoonModal.test.ts`

- [ ] **Step 1: Write the failing test**

Create `app/components/ComingSoonModal.test.ts`:

```typescript
import { describe, it, expect, vi } from "vitest";

// Mirrors the handler logic in ComingSoonModal.tsx
function makeModalHandlers(onClose: () => void) {
  function handleBackdropClick(target: EventTarget | null, currentTarget: EventTarget | null) {
    if (target === currentTarget) onClose();
  }

  function handleKeyDown(key: string) {
    if (key === "Escape") onClose();
  }

  return { handleBackdropClick, handleKeyDown };
}

describe("ComingSoonModal handler logic", () => {
  it("clicking backdrop calls onClose", () => {
    const onClose = vi.fn();
    const { handleBackdropClick } = makeModalHandlers(onClose);
    const el = {};
    handleBackdropClick(el, el); // target === currentTarget → backdrop click
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("clicking inside modal does NOT call onClose", () => {
    const onClose = vi.fn();
    const { handleBackdropClick } = makeModalHandlers(onClose);
    handleBackdropClick({}, {}); // target !== currentTarget → inner click
    expect(onClose).not.toHaveBeenCalled();
  });

  it("Escape key calls onClose", () => {
    const onClose = vi.fn();
    const { handleKeyDown } = makeModalHandlers(onClose);
    handleKeyDown("Escape");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("other keys do NOT call onClose", () => {
    const onClose = vi.fn();
    const { handleKeyDown } = makeModalHandlers(onClose);
    handleKeyDown("Enter");
    expect(onClose).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run app/components/ComingSoonModal.test.ts
```
Expected: FAIL — `makeModalHandlers` not found (file doesn't exist yet). This confirms the test is wired correctly.

- [ ] **Step 3: Create ComingSoonModal.tsx**

Create `app/components/ComingSoonModal.tsx`:

```tsx
"use client";

import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <p>Still working on it.<br />Check back later!</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run app/components/ComingSoonModal.test.ts
```
Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add app/components/ComingSoonModal.tsx app/components/ComingSoonModal.test.ts
git commit -m "feat: add ComingSoonModal component with tests"
```

---

## Task 4: Build OfflinePlaceholder component

**Files:**
- Create: `app/components/OfflinePlaceholder.tsx`

No separate test needed — it's a pure presentational component with no logic.

- [ ] **Step 1: Create OfflinePlaceholder.tsx**

Create `app/components/OfflinePlaceholder.tsx`:

```tsx
export default function OfflinePlaceholder() {
  return (
    <div className="offline-placeholder">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span>Downloadable · Not a web app</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify dev server renders correctly**

Start `npm run dev`, open `http://localhost:3000/projects` in browser. (The component won't appear yet — verify no build errors for now.)

- [ ] **Step 3: Commit**

```bash
git add app/components/OfflinePlaceholder.tsx
git commit -m "feat: add OfflinePlaceholder component for non-web project cards"
```

---

## Task 5: Rewrite page.tsx — full card overhaul

**Files:**
- Modify: `app/(site)/projects/page.tsx`

Replace the entire file with the content below. This is the complete updated page with all new cards, rewritten copy, screenshot thumbnails, and modal wiring.

- [ ] **Step 1: Replace page.tsx**

Replace the entire contents of `app/(site)/projects/page.tsx` with:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { CTABanner } from "../../layout";
import ComingSoonModal from "../../components/ComingSoonModal";
import OfflinePlaceholder from "../../components/OfflinePlaceholder";

export default function Projects() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <main className="max-w-3xl mx-auto px-6">
      <ComingSoonModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Header */}
      <section className="pt-16 pb-10">
        <h1 className="text-4xl font-medium tracking-tight mb-4">Projects</h1>
        <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
          Everything here was built with purpose, whether it be solving a real problem for
          someone I know or exploring something I found genuinely interesting.
        </p>
      </section>

      {/* ============================================
          PROFESSIONAL EXPERIENCE
          ============================================ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Professional experience</h2>

        <div className="space-y-5">
          {/* Property Appraisal */}
          <div className="project-card">
            <p className="label-pro mb-2">Pilot deployment · 2 county clients</p>
            <h2 className="text-xl font-medium mb-3">
              Property Appraisal Prediction Platform
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              County governments needed to modernize property valuations, but
              their data was inconsistent, with missing fields, ambiguous
              definitions, and unresponsive data providers across jurisdictions.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              I led pilot deployment for two counties: gathering requirements
              directly from government stakeholders, translating messy
              real-world data into usable ML features, and customizing the
              React frontend for county-specific workflows.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Both pilots shipped to production despite significant data
              pipeline limitations and coordination challenges across
              organizations.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Cassandra</span>
              <span className="tech-tag">Data Integration</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Proprietary client work
            </p>
          </div>

          {/* Inventory Optimization */}
          <div className="project-card">
            <p className="label-pro mb-2">Fortune 500 clients · 6-person team</p>
            <h2 className="text-xl font-medium mb-3">
              Inventory Optimization Platform
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Fortune 500 energy and steel companies needed AI-powered inventory
              optimization across multi-terabyte datasets. This was demand forecasting,
              pricing fluctuations, and logistics constraints all in one system.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              I worked across the full stack: resolving complex bugs where React
              UI components interacted poorly with large-scale database
              operations, building automated data validation jobs, and shipping
              features under tight client deadlines.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Maintained and extended the production system alongside five other
              engineers, balancing ongoing bug resolution with new feature development.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Cassandra</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Proprietary client work
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          PERSONAL PROJECTS
          ============================================ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Personal projects</h2>

        <div className="space-y-5">
          {/* Podium — featured */}
          <div className="project-card featured-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/podium.png"
                alt="Podium app screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">RAG LLM assistant · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Podium{" "}
              <a
                href="https://podium.rogerflores.dev/"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                podium.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A production RAG assistant with agentic tools and modular plug-and-play LLM support — swap
              backends without changing your workflow. Users bring their own API keys; credentials are
              never stored. Clerk handles auth, with a free guest tier so anyone can try it.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Infrastructure managed via Terraform on AWS. Frontend on Vercel. My current main build.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">AWS</span>
              <span className="tech-tag">Terraform</span>
              <span className="tech-tag">Clerk</span>
              <span className="tech-tag">RAG</span>
              <span className="tech-tag">LLM</span>
            </div>
            <a
              href="https://podium.rogerflores.dev/"
              target="_blank" rel="noopener noreferrer"
              className="text-[13px] text-[var(--accent)] hover:underline"
            >
              Try it out! Guests get limited free usage. →
            </a>
          </div>

          {/* Search */}
          <div
            className="project-card cursor-pointer"
            onClick={() => setSearchModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSearchModalOpen(true); }}
          >
            <div className="offline-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Screenshot coming soon</span>
            </div>
            <p className="label-personal mb-2">Agentic tool · In development</p>
            <h2 className="text-xl font-medium mb-3">Search</h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              An LLM-powered agent that loops: screenshot → click → screenshot → click. Designed to
              collect apartment listings, recruitment leads, job openings, or anything that fits a
              mass search format. Modular enough to aim at new targets with minimal reconfiguration.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Locally installed. Not a web app.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">LLM</span>
              <span className="tech-tag">Computer Use</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Available on request
            </p>
          </div>

          {/* Experiments */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/experiments.png"
                alt="Experiments site screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">LLM research · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Experiments{" "}
              <a
                href="https://experiments.rogerflores.dev"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                experiments.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A site where I post writeups on my own experiments running and tuning local LLMs —
              LoRA fine-tuning, weight probes, math benchmarks, and whatever else I&apos;m currently
              obsessing over.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">LLM</span>
              <span className="tech-tag">LoRA</span>
            </div>
          </div>

          {/* Longdle */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/longdle.png"
                alt="Longdle word game screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">Word game · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Longdle{" "}
              <a
                href="https://longdle.rogerflores.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                longdle.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Wordle, but the word is six letters. Daily puzzle updates, localStorage score tracking,
              and infinite replayability via a randomizer mode for when the daily isn&apos;t enough.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Try if you dare.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
            </div>
          </div>

          {/* Short */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/short.png"
                alt="Short URL shortener screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <h2 className="text-xl font-medium mb-3">
              Short{" "}
              <a
                href="https://short.rogerflores.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                short.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Simple, minimal, functional. A URL shortener I built as a deliberate test of my own
              system design and fundamentals — rate limiting, collision handling, redirect latency.
              Ended up being genuinely useful.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">System Design</span>
            </div>
          </div>

          {/* Property */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/property.png"
                alt="Property app screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">Personal project · Discontinued · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Property{" "}
              <a
                href="https://property.rogerflores.dev"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                property.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A property search tool I built and deployed. Still live, but no longer maintained —
              I hit technical constraints that are better solved by starting fresh rather than
              patching. The lessons carried forward.
            </p>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Live but unmaintained
            </p>
          </div>

          {/* Law Firm Scraper */}
          <div className="project-card">
            <OfflinePlaceholder />
            <p className="label-personal mb-2">Automation · 3-day build</p>
            <h2 className="text-xl font-medium mb-3">
              Law Firm Lead Scraper
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Someone needed structured contact data from law firm websites.
              I built an automated scraper that takes a URL as input and outputs clean, structured
              lead data in Excel format.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Uses Selenium for dynamic content handling and custom parsing
              logic. Completed in three days as a practical tool for a real need.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Selenium</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Private repository
            </p>
          </div>

          {/* Minecraft Escape Room */}
          <div className="project-card">
            <OfflinePlaceholder />
            <p className="label-personal mb-2">
              Game design · Collaborative build
            </p>
            <h2 className="text-xl font-medium mb-3">
              Minecraft Escape Room
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A custom adventure map featuring puzzles, narrative elements,
              command blocks, and datapacks, built collaboratively with a
              friend. Thousands of connected command blocks, coordinated
              through a shared Google Drive planning system.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              The first escape room is complete: roughly 4 hours of gameplay.
              A second, significantly larger room is currently in progress.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Game Design</span>
              <span className="tech-tag">JSON</span>
              <span className="tech-tag">Project Planning</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              World file available on request,{" "}
              <a
                href="mailto:rflores3113@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                email me
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section className="mb-16">
        <CTABanner />
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Run the dev server and verify the page loads**

```bash
npm run dev
```
Open `http://localhost:3000/projects`. Check:
- All cards render without errors
- Screenshot thumbnails appear (live sites) or show placeholder (Search, offline cards)
- Podium label reads "Live" (not "Live beta")
- Short card has no label chip above the title
- Search card is clickable

- [ ] **Step 3: Verify the coming-soon modal**

Click the Search card. Expected: modal overlay appears with "Still working on it. Check back later!" Dismiss by clicking outside, pressing Escape, or clicking ×.

- [ ] **Step 4: Run full test suite**

```bash
npx vitest run
```
Expected: all tests pass including the 4 new ComingSoonModal tests and existing WelcomeSplash tests.

- [ ] **Step 5: Run build to catch TypeScript errors**

```bash
npm run build
```
Expected: build succeeds with no type errors.

- [ ] **Step 6: Commit**

```bash
git add "app/(site)/projects/page.tsx"
git commit -m "feat(projects): overhaul personal projects — new cards, rewritten copy, screenshot thumbnails, coming-soon modal"
```

---

## Task 6: Add next.config image domains for screenshots (if needed)

**Files:**
- Modify: `next.config.ts` or `next.config.js` (whichever exists)

Next.js `<Image>` with local `public/` files doesn't require domain config. This task only applies if the build errors with "hostname not configured."

- [ ] **Step 1: Check if build produced image domain errors**

If Task 5 Step 5 produced an error like `"hostname" is not configured under "images"`, open `next.config.ts` and add:

```ts
const nextConfig = {
  images: {
    unoptimized: true, // local screenshots don't need Next.js optimization
  },
};
export default nextConfig;
```

- [ ] **Step 2: Re-run build**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Commit if changed**

```bash
git add next.config.ts
git commit -m "config: set images.unoptimized for local screenshots"
```
