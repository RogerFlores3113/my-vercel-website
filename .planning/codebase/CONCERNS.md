# Codebase Concerns

## Critical Issues
- Missing `rel="noopener noreferrer"` on all `target="_blank"` links across 5+ files (security vulnerability)
- No touch/mobile controls for the platformer game — mobile users see a non-interactive screen with no fallback

## Technical Debt
- `PlatformerGame.tsx` is ~1,230 lines — monolithic component doing too much
- `gameRef` typed as `unknown` instead of a proper type
- Content duplicated between game modals and boring-site pages
- Dead multi-room transition code left in codebase

## Performance Concerns
- ~40 sprite frames loaded as individual HTTP requests (no sprite sheet batching)
- ~35 prop textures preloaded unconditionally on every page load
- `PandaWalker` component triggers React re-renders at 100ms intervals via setInterval

## Missing Pieces
- No mobile redirect or fallback UI for the game
- No React error boundary wrapping the game component
- `next.config.ts` is essentially empty — no image domains, headers, or optimizations configured
- `<img>` used instead of Next.js `<Image>` in the about page (misses optimization)

## Dependency Risks
- `next: "16.1.1"` appears to be a non-standard/unreleased version — may not exist on npm or could be misconfigured
- No CI pipeline to verify lockfile integrity or catch broken installs

## Scalability Concerns
- As the sprite library grows, the individual-file loading approach will increasingly hurt performance
- Single monolithic game file will be hard to extend or maintain

## Quick Wins
- Add `rel="noopener noreferrer"` to all `target="_blank"` anchors (~10 lines)
- Switch `<img>` to `<Image>` on the about page
- Add a simple mobile detection redirect or "desktop only" message
- Remove ~25 unused legacy sprite files from `public/sprites/`
- Add an error boundary around `PlatformerGame`
