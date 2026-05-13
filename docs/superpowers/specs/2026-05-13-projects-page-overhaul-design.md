# Projects Page Overhaul — Design Spec
**Date:** 2026-05-13

## Overview
Overhaul the personal projects section of the projects page: update copy for existing cards, add three new cards, add screenshot thumbnails to every card, and wire up a "coming soon" modal for Search.

---

## 1. Screenshot Thumbnails

**Layout:** Full-width image at the top of each project card, ~180px tall, rounded top corners matching card border-radius. Below the image, existing card content continues unchanged (label, title, description, tags, links).

**Implementation:**
- Add an `<Image>` (Next.js) or `<img>` element as the first child inside `.project-card`
- Use `object-fit: cover` so varying screenshot dimensions fill the slot cleanly
- Store screenshots in `public/screenshots/` as `.png` or `.webp`
- Live projects: screenshots captured via browse skill at build time, saved to `public/screenshots/<slug>.png`
- Search: `public/screenshots/search-placeholder.png` — user-supplied later; slot renders with a grey fill and "Screenshot coming soon" label until the file is present
- Offline projects (Law Firm Scraper, Minecraft): styled placeholder component showing a terminal icon + "Downloadable · Not a web app"

---

## 2. Card Content Changes

### Podium (existing, featured)
- **Label:** `RAG LLM assistant · Live` (remove "beta")
- **Description rewrite:**
  > A production RAG assistant with agentic tools and modular plug-and-play LLM support — swap backends without changing your workflow. Users bring their own API keys; credentials are never stored. Clerk handles auth, with a free guest tier so anyone can try it.
  >
  > Infrastructure managed via Terraform on AWS. Frontend on Vercel. My current main build.
- **"bring-your-own-key"** is currently in a span with a different color — fix to `text-[var(--foreground-muted)]` matching surrounding text
- **CTA link:** `Try it out! Guests get limited free usage. →`

### Longdle (existing)
- **Description rewrite:**
  > Wordle, but the word is six letters. Daily puzzle updates, localStorage score tracking, and infinite replayability via a randomizer mode for when the daily isn't enough.
  >
  > Try if you dare.

### Short / URL Shortener (existing)
- **Remove all label chips** (the `<p className="label-personal">` element)
- **Description rewrite:**
  > Simple, minimal, functional. A URL shortener I built as a deliberate test of my own system design and fundamentals — rate limiting, collision handling, redirect latency. Ended up being genuinely useful.

### Experiments (existing "LLM Eval Harness" card — rename + update)
- **Card renamed** to "Experiments"
- **Label:** `LLM research · Live`
- **Link:** `experiments.rogerflores.dev ↗` (add URL, remove WIP opacity)
- **Description rewrite:**
  > A site where I post writeups on my own experiments running and tuning local LLMs — LoRA fine-tuning, weight probes, math benchmarks, and whatever else I'm currently obsessing over.
- Remove `opacity-60` class and "GitHub and writeup coming soon" footer

### Property (new personal card)
- **Label:** `Personal project · Discontinued · Live`
- **Title:** `Property` + link `property.rogerflores.dev ↗`
- **Description:**
  > A property search tool I built and deployed. Still live, but no longer maintained — I hit technical constraints that are better solved by starting fresh rather than patching. The lessons carried forward.
- **Footer:** `Live but unmaintained`

### Search (new card)
- **Label:** `Agentic tool · In development`
- **Title:** `Search` (no URL link)
- **Description:**
  > An LLM-powered agent that loops: screenshot → click → screenshot → click. Designed to collect apartment listings, recruitment leads, job openings, or anything that fits a "mass search" format. Modular enough to aim at new targets with minimal reconfiguration.
  >
  > Locally installed. Not a web app.
- **Footer:** `Available on request`
- **On-click behavior:** opens a modal overlay with "Still working on it. Check back later!" — dismiss on click-outside or Escape key

---

## 3. Card Order (Personal Projects Section)

1. Podium — featured
2. Search — coming soon modal
3. Experiments
4. Longdle
5. Short
6. Property — discontinued
7. Law Firm Scraper — offline placeholder
8. Minecraft Escape Room — offline placeholder

---

## 4. Coming-Soon Modal

A minimal reusable component (`<ComingSoonModal>`):
- Centered overlay, semi-transparent backdrop
- Single line: "Still working on it. Check back later!"
- Dismiss: click outside, Escape key, or an × button
- No routing or URL change
- Search card wraps its clickable area in a handler that opens this modal instead of navigating

---

## 5. Offline Placeholder Component

For Law Firm Scraper and Minecraft Escape Room (and future offline projects):
- Renders in place of the screenshot slot
- Contains: a download/terminal icon (SVG inline), text "Downloadable · Not a web app"
- Styled to match card palette: muted background, faint border, same height as screenshot slots (~180px)

---

## 6. Out of Scope
- Professional experience section (no changes)
- LLM Eval Harness is being replaced by the Experiments card — the WIP card is removed
- No routing/sub-pages per project (future work)
