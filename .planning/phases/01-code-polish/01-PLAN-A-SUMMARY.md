---
phase: "01"
plan: "A"
subsystem: "security, images, content"
tags: ["security", "tabnapping", "next-image", "url-update"]
dependency_graph:
  requires: []
  provides: ["SEC-01", "ABT-01", "PROJ-03"]
  affects: ["app/(site)/layout.tsx", "app/(site)/about/page.tsx", "app/(site)/projects/page.tsx", "app/(site)/boring/page.tsx", "app/components/PlatformerGame.tsx"]
tech_stack:
  added: []
  patterns: ["next/image fill pattern with relative aspect-ratio wrapper"]
key_files:
  created: []
  modified:
    - "app/(site)/layout.tsx"
    - "app/(site)/about/page.tsx"
    - "app/(site)/projects/page.tsx"
    - "app/(site)/boring/page.tsx"
    - "app/components/PlatformerGame.tsx"
decisions:
  - "Combined target and rel on same JSX line to satisfy single-line grep verification checks"
  - "PlatformerGame.tsx pre-existing ESC menu rel was reformatted to same line (no behavior change)"
metrics:
  duration: "~12 minutes"
  completed: "2026-05-06"
  tasks_completed: 5
  tasks_total: 5
---

# Phase 01 Plan A: Code Polish — Security, Image, URL Summary

## One-liner

Fixed 11 tabnapping vulnerabilities across 5 files, replaced bare img with Next.js Image fill on About page, and updated all 7 Podium href occurrences from podium-beta.vercel.app to podium.rogerflores.dev.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| A1 | Add rel to footer links in layout.tsx | d1c2d2e | app/(site)/layout.tsx |
| A2 | Fix nanochat noopener + update Podium URL in about/page.tsx | 24af8c4 | app/(site)/about/page.tsx |
| A3 | Replace bare img with Image fill on About page | 78ef072 | app/(site)/about/page.tsx |
| A4 | Add rel + update Podium URLs in projects/page.tsx | 69cb2ef | app/(site)/projects/page.tsx |
| A5 | Add rel + update Podium URLs in boring/page.tsx + PlatformerGame.tsx | 8974196 | app/(site)/boring/page.tsx, app/components/PlatformerGame.tsx |

## Verification Results

- SEC-01: `grep -r 'target="_blank"' app/ --include="*.tsx" | grep -v 'noopener'` — empty (PASS)
- ABT-01: `grep -n '<img' app/(site)/about/page.tsx` — empty (PASS)
- ABT-01: `grep -n 'relative aspect-\[4/5\]' app/(site)/about/page.tsx` — 1 match (PASS)
- PROJ-03: `grep -rn 'podium-beta.vercel.app' app/` — empty (PASS)
- Build: `npx next build` — exit 0 (PASS)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Style] Combined target and rel attributes on the same JSX line**
- **Found during:** A1 execution
- **Issue:** The plan's acceptance criteria uses `grep 'target="_blank"' | grep -v 'noopener'` for verification. In multi-line JSX attribute format, `target="_blank"` and `rel="noopener noreferrer"` appear on separate lines, making each `target` line fail the grep check even when `rel` is present on the next line.
- **Fix:** Combined `target="_blank" rel="noopener noreferrer"` on the same line for all anchors. This satisfies the verification check and matches the single-line pattern used in PlatformerGame.tsx.
- **Files modified:** app/(site)/layout.tsx, app/(site)/about/page.tsx, app/components/PlatformerGame.tsx
- **Commits:** d1c2d2e, 24af8c4, 8974196

**2. [Rule 1 - Minor] PlatformerGame.tsx noopener count is 7 not 6**
- **Found during:** A5 verification
- **Issue:** Plan's acceptance criteria expects `grep -c 'noopener' app/components/PlatformerGame.tsx` to return 6. The file contains `window.open(url, "_blank", "noopener,noreferrer")` at line 312 (pre-existing, not an anchor `rel` attribute), which adds 1 to the grep count.
- **Fix:** No fix needed — this is a pre-existing secure pattern. All 6 anchor `rel` attributes are correctly in place; the 7th match is a JS window.open security option string.
- **Files modified:** None
- **Impact:** Cosmetic discrepancy in acceptance criteria count only; security posture is correct.

## Known Stubs

None — all links are wired to real URLs, Image fill is wired to the actual profile photo path.

## Threat Flags

None — this plan only adds `rel="noopener noreferrer"` to existing external anchors (reducing attack surface), swaps a rendering component, and updates URLs. No new network endpoints, auth paths, or trust boundaries introduced.

## Self-Check: PASSED

All source files verified present. All 5 task commits confirmed in git log.
