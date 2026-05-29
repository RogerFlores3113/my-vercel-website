
## Modal "full site →" link — localStorage consistency

**What:** The sign modal footer has a "full site →" link to /boring. It doesn't set localStorage.
**Why:** After the splash ships, this link is a "temporary visit" (doesn't change the user's mode preference). But it could be argued any navigation to /boring should be a permanent choice.
**Pros:** Setting localStorage on click makes mode-switching fully intentional and consistent.
**Cons:** A curiosity click ("let me quickly check the boring version") would permanently switch the user to boring mode.
**Context:** Decide after splash ships. Observe whether game-mode users who click "full site →" come back to the game (good — shows temporary behavior is correct) or don't (suggests they wanted to switch). File: `app/components/PlatformerGame.tsx`, modal footer section (~line 193).
**Depends on:** Welcome splash feature shipping first.

---

## /boring "coming soon" modals point to pages that already exist

**What:** On `/boring`, the about-section links (climbing log, trails list, games list,
reading list) open a "Still working on it! Check back soon!" modal (`ComingSoonLink` in
`app/boring/BoringClient.tsx`). But `/reading` has full book content, and `/games`,
`/trails`, `/climbing` exist as "Shelf coming" stubs.

Wait — as of the 2026-05-29 cleanup, the orphaned `/about`, `/projects`, `/reading`,
`/games`, `/trails`, `/climbing` routes were **deleted** (they were unreachable from the
game/boring flow). So the `ComingSoonLink` modals are now correct: those pages no longer
exist. **Before reviving any of them, wire the `ComingSoonLink` to a real route.** The
reading-list content (4 books) was the most complete — it lives in git history at the
deleted `app/(site)/reading/page.tsx` if you want to bring it back.
**File:** `app/boring/BoringClient.tsx`, `ComingSoonLink`.

---

## Low-severity polish (found in 2026-05-29 QA sweep)

- **`app/page.tsx:25`** — `setPhase("game")` called synchronously inside `useEffect`
  triggers a lint warning (cascading renders). Works fine; could read localStorage
  during the initial `useState` to avoid the extra render.
- **Resume link inconsistency** — `app/boring/page.tsx` links to the absolute
  `https://rogerflores.dev/rflores_resume.pdf` (2 spots), while the game ESC menu uses
  the relative `/rflores_resume.pdf`. Absolute links break on localhost/preview. Pick one
  (relative is safest).
- **`app/boring/page.tsx`** — 5 raw `<img>` tags (project screenshots) instead of
  `next/image`; lint flags slower LCP. Cosmetic/perf.
- **Custom-font lint warning** in `app/boring/layout.tsx` (no-page-custom-font).
