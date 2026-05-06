# Architecture

## Overview
A personal portfolio website with a dual-mode experience: a full-screen Phaser.js platformer game (the "fun" site) and a traditional static site (the "boring" site). Users choose their mode on first visit via a welcome splash.

## Application Type
Next.js 15 App Router — SSG/SSR hybrid. The game page is fully client-rendered; the boring site pages are server components.

## Core Data Flow
1. Root page (`/`) checks `localStorage` for saved mode preference
2. If no preference → shows `WelcomeSplash` to choose game or boring mode
3. Game mode → dynamically imports `PlatformerGame` (Phaser, SSR disabled)
4. Boring mode → redirects to `/boring` (static text-based portfolio)
5. Mode preference persisted to `localStorage`

## Key Patterns
- `dynamic()` with `ssr: false` for the Phaser game to avoid SSR conflicts
- `"use client"` on all interactive components; pages are server components by default
- `localStorage` for cross-visit state persistence (mode selection, game progress)
- Phaser game instance managed via `useRef` and cleaned up in `useEffect` return
- `PandaWalker` uses `setInterval` at 100ms to animate a walking sprite on the boring site

## Page/Route Structure
- `/` — Home: WelcomeSplash → PlatformerGame (game mode) or redirect to `/boring`
- `/boring` — Traditional portfolio landing (the "boring" version)
- `/about` — About page with bio
- `/projects` — Projects listing
- `/reading` — Reading list / book recommendations
- All `/boring`, `/about`, `/projects`, `/reading` share a `(site)` layout group

## Component Architecture
- `app/components/` — shared interactive components
  - `PlatformerGame.tsx` — monolithic Phaser game (~1,230 lines)
  - `GameLoader.tsx` — loading screen shown while Phaser loads
  - `WelcomeSplash.tsx` — mode selection screen
  - `PandaWalker.tsx` — animated red panda sprite for the boring site header
- `app/(site)/` — boring site route group with shared layout
- `app/layout.tsx` — root layout (metadata, fonts, globals.css)
