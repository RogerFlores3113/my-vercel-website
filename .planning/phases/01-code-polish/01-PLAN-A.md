---
plan: A
wave: 1
depends_on: []
files_modified:
  - app/(site)/layout.tsx
  - app/(site)/about/page.tsx
  - app/(site)/projects/page.tsx
  - app/(site)/boring/page.tsx
  - app/components/PlatformerGame.tsx
requirements:
  - SEC-01
  - ABT-01
  - PROJ-03
autonomous: true
---

## Objective

Fix the tabnapping security vulnerability (SEC-01) by adding `rel="noopener noreferrer"` to all 11 `target="_blank"` anchors across 5 files. Simultaneously, swap the `<img>` profile photo on the About page for a Next.js `<Image fill>` component (ABT-01), and update the Podium URL from `podium-beta.vercel.app` to `podium.rogerflores.dev` in every file that references it (PROJ-03 — 7 total href occurrences across 5 files). Plan B depends on Plan A having completed the security fixes so new links in Plan B can use the fixed Podium card as a safe copy template.

## Must Haves

- `grep -r 'target="_blank"' app/ --include="*.tsx" | grep -v 'noopener'` returns empty output (zero insecure links remaining)
- `grep -n '<img' app/\(site\)/about/page.tsx` returns empty output (no bare `<img>` tags on About page)
- `grep -rn 'podium-beta.vercel.app' app/` returns empty output (old URL fully replaced)
- `npx next build` exits 0 (no TypeScript errors introduced)
- About page profile photo renders using `<Image fill>` inside a `relative aspect-[4/5]` container

## Tasks

### Task A1: Fix SEC-01 in layout.tsx (footer GitHub + LinkedIn links)

```xml
<task id="A1" type="execute">
  <title>Add rel="noopener noreferrer" to footer anchor tags in layout.tsx</title>
  <read_first>
    - app/(site)/layout.tsx
  </read_first>
  <action>
    In `app/(site)/layout.tsx`, the `Footer` component (lines 16–46) contains two external `target="_blank"` anchors missing `rel="noopener noreferrer"`:

    Line 22–27 — GitHub link. Change from:
    ```tsx
    <a
      href="https://github.com/RogerFlores3113"
      target="_blank"
      className="hover:text-[var(--foreground-muted)] transition-colors"
    >
    ```
    To:
    ```tsx
    <a
      href="https://github.com/RogerFlores3113"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[var(--foreground-muted)] transition-colors"
    >
    ```

    Line 29–34 — LinkedIn link. Change from:
    ```tsx
    <a
      href="https://www.linkedin.com/in/roger-flores-3113-nu/"
      target="_blank"
      className="hover:text-[var(--foreground-muted)] transition-colors"
    >
    ```
    To:
    ```tsx
    <a
      href="https://www.linkedin.com/in/roger-flores-3113-nu/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[var(--foreground-muted)] transition-colors"
    >
    ```

    No other changes to this file.
  </action>
  <acceptance_criteria>
    - `grep -n 'target="_blank"' app/\(site\)/layout.tsx` returns exactly 2 matches
    - `grep -n 'noopener' app/\(site\)/layout.tsx` returns exactly 2 matches (one per anchor)
    - `grep -n 'target="_blank"' app/\(site\)/layout.tsx | grep -v 'noopener'` returns empty output
  </acceptance_criteria>
</task>
```

### Task A2: Fix SEC-01 + PROJ-03 in about/page.tsx (nanochat link + Podium URL)

```xml
<task id="A2" type="execute">
  <title>Add rel to nanochat link and update Podium URL in about/page.tsx</title>
  <read_first>
    - app/(site)/about/page.tsx
  </read_first>
  <action>
    In `app/(site)/about/page.tsx`, make two changes:

    **Change 1 — SEC-01: nanochat link (line 67–70)**
    Change from:
    ```tsx
    <a
      href="https://github.com/karpathy/nanochat"
      target="_blank"
      className="text-[var(--accent)] hover:underline"
    >
    ```
    To:
    ```tsx
    <a
      href="https://github.com/karpathy/nanochat"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--accent)] hover:underline"
    >
    ```

    **Change 2 — PROJ-03: Podium href (line 52–55)**
    The "What I'm doing now" section links to Podium without `target="_blank"` (it is an internal-style link), so only the href value needs updating. Change from:
    ```tsx
    <a
      href="https://podium-beta.vercel.app/"
      className="text-[var(--accent)] hover:underline"
    >
    ```
    To:
    ```tsx
    <a
      href="https://podium.rogerflores.dev/"
      className="text-[var(--accent)] hover:underline"
    >
    ```

    No other changes to this file in Plan A. (ABT-01 is handled in Task A3.)
  </action>
  <acceptance_criteria>
    - `grep -n 'noopener' app/\(site\)/about/page.tsx` returns 1 match (nanochat link)
    - `grep -n 'target="_blank"' app/\(site\)/about/page.tsx | grep -v 'noopener'` returns empty output
    - `grep -n 'podium-beta.vercel.app' app/\(site\)/about/page.tsx` returns empty output
    - `grep -n 'podium.rogerflores.dev' app/\(site\)/about/page.tsx` returns 1 match
  </acceptance_criteria>
</task>
```

### Task A3: ABT-01 — Swap profile photo from `<img>` to `<Image fill>` in about/page.tsx

```xml
<task id="A3" type="execute">
  <title>Replace bare img tag with Next.js Image fill component on About page</title>
  <read_first>
    - app/(site)/about/page.tsx
  </read_first>
  <action>
    In `app/(site)/about/page.tsx`, the profile photo block (lines 13–20) currently uses a bare `<img>`. Replace it with Next.js `<Image fill>`.

    **Step 1 — Add import at top of file.**
    The file currently starts with `import { CTABanner } from "../../layout";`. Add the next/image import on line 2:
    ```tsx
    import { CTABanner } from "../../layout";
    import Image from "next/image";
    ```

    **Step 2 — Replace the photo block (lines 13–20).** Change from:
    ```tsx
    {/* Photo  wider aspect ratio, full-width */}
    <div className="mb-10 rounded-2xl overflow-hidden">
      <img
        src="/full_profile.jpg"
        alt="Roger Flores"
        className="w-full aspect-[4/5] object-cover object-center"
      />
    </div>
    ```
    To:
    ```tsx
    {/* Photo  wider aspect ratio, full-width */}
    <div className="mb-10 rounded-2xl overflow-hidden relative aspect-[4/5]">
      <Image
        src="/full_profile.jpg"
        alt="Roger Flores"
        fill
        className="object-cover object-center"
      />
    </div>
    ```

    Key details:
    - The wrapper div gains `relative` (required for fill positioning) and `aspect-[4/5]` (provides intrinsic height so fill doesn't render at 0px)
    - The `<Image>` component loses `w-full` and `aspect-[4/5]` (those are now on the wrapper) but keeps `object-cover object-center`
    - Image source path `/full_profile.jpg` is unchanged
    - `fill` is a boolean prop — no value needed, just the word `fill`
  </action>
  <acceptance_criteria>
    - `grep -n '<img' app/\(site\)/about/page.tsx` returns empty output (no bare img tags)
    - `grep -n 'Image from "next/image"' app/\(site\)/about/page.tsx` returns 1 match
    - `grep -n 'fill' app/\(site\)/about/page.tsx` returns at least 1 match (the fill prop)
    - `grep -n 'relative aspect-\[4/5\]' app/\(site\)/about/page.tsx` returns 1 match (wrapper div)
    - `npx next build` exits 0
  </acceptance_criteria>
</task>
```

### Task A4: Fix SEC-01 + PROJ-03 in projects/page.tsx (Podium card links)

```xml
<task id="A4" type="execute">
  <title>Add rel and update Podium URL in projects/page.tsx featured card</title>
  <read_first>
    - app/(site)/projects/page.tsx
  </read_first>
  <action>
    In `app/(site)/projects/page.tsx`, the Podium featured card (lines 98–135) has two `target="_blank"` anchors missing `rel`, and both reference the old `podium-beta.vercel.app` URL. Fix both simultaneously.

    **Change 1 — Line 103–107 (Podium h2 inline link)**
    Change from:
    ```tsx
    <a
      href="https://podium-beta.vercel.app/"
      target="_blank"
      className="text-sm text-[var(--accent)] hover:underline font-normal"
    >
      podium-beta.vercel.app ↗
    </a>
    ```
    To:
    ```tsx
    <a
      href="https://podium.rogerflores.dev/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-[var(--accent)] hover:underline font-normal"
    >
      podium.rogerflores.dev ↗
    </a>
    ```

    **Change 2 — Lines 128–131 (Podium footer "Try the live beta" link)**
    Change from:
    ```tsx
    <a
      href="https://podium-beta.vercel.app/"
      target="_blank"
      className="text-[13px] text-[var(--accent)] hover:underline"
    >
    ```
    To:
    ```tsx
    <a
      href="https://podium.rogerflores.dev/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[13px] text-[var(--accent)] hover:underline"
    >
    ```

    Note: The display text inside the h2 link also changes from `podium-beta.vercel.app ↗` to `podium.rogerflores.dev ↗` to match the new URL.
  </action>
  <acceptance_criteria>
    - `grep -n 'podium-beta.vercel.app' app/\(site\)/projects/page.tsx` returns empty output
    - `grep -n 'podium.rogerflores.dev' app/\(site\)/projects/page.tsx` returns 2 matches
    - `grep -n 'target="_blank"' app/\(site\)/projects/page.tsx | grep -v 'noopener'` returns empty output (after this task; Plan B adds new links with rel already present)
    - `grep -n 'noopener' app/\(site\)/projects/page.tsx` returns at least 2 matches
  </acceptance_criteria>
</task>
```

### Task A5: Fix SEC-01 + PROJ-03 in boring/page.tsx and PlatformerGame.tsx

```xml
<task id="A5" type="execute">
  <title>Add rel and update Podium URLs in boring/page.tsx and PlatformerGame.tsx</title>
  <read_first>
    - app/(site)/boring/page.tsx
    - app/components/PlatformerGame.tsx
  </read_first>
  <action>
    Fix the remaining 6 insecure `target="_blank"` links and update all remaining old Podium URLs for consistency (RESEARCH.md recommendation — 4 occurrences outside D-08 scope, updating all for consistency per planner judgment).

    **boring/page.tsx — Line 44–48 (Podium link in featured card h2)**
    Change from:
    ```tsx
    <a
      href="https://podium-beta.vercel.app/"
      target="_blank"
      className="text-sm text-[var(--accent)] font-normal hover:underline"
    >
      podium-beta.vercel.app ↗
    </a>
    ```
    To:
    ```tsx
    <a
      href="https://podium.rogerflores.dev/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-[var(--accent)] font-normal hover:underline"
    >
      podium.rogerflores.dev ↗
    </a>
    ```

    **PlatformerGame.tsx — 5 fixes across lines 37, 45, 49, 79, 107**

    Line 37 — Podium link in "landing" modal (no display text change needed — display text is "Podium"):
    Change from:
    ```tsx
    <a href="https://podium-beta.vercel.app/" target="_blank" style={{ color: "#5dcaa5" }}>Podium</a>
    ```
    To:
    ```tsx
    <a href="https://podium.rogerflores.dev/" target="_blank" rel="noopener noreferrer" style={{ color: "#5dcaa5" }}>Podium</a>
    ```

    Line 45 — GitHub link in "landing" modal:
    Change from:
    ```tsx
    <a href="https://github.com/RogerFlores3113" target="_blank" style={{ color: "#5dcaa5" }}>
    ```
    To:
    ```tsx
    <a href="https://github.com/RogerFlores3113" target="_blank" rel="noopener noreferrer" style={{ color: "#5dcaa5" }}>
    ```

    Line 49 — LinkedIn link in "landing" modal:
    Change from:
    ```tsx
    <a href="https://www.linkedin.com/in/roger-flores-3113-nu/" target="_blank" style={{ color: "#5dcaa5" }}>
    ```
    To:
    ```tsx
    <a href="https://www.linkedin.com/in/roger-flores-3113-nu/" target="_blank" rel="noopener noreferrer" style={{ color: "#5dcaa5" }}>
    ```

    Line 79 — Podium link in "projects" modal (display text is "↗ live beta"):
    Change from:
    ```tsx
    <a href="https://podium-beta.vercel.app/" target="_blank" style={{ color: "#5dcaa5", fontSize: 12 }}>↗ live beta</a>
    ```
    To:
    ```tsx
    <a href="https://podium.rogerflores.dev/" target="_blank" rel="noopener noreferrer" style={{ color: "#5dcaa5", fontSize: 12 }}>↗ live beta</a>
    ```

    Line 107 — Podium link in "about" modal (display text is "Podium"):
    Change from:
    ```tsx
    <a href="https://podium-beta.vercel.app/" target="_blank" style={{ color: "#5dcaa5" }}>Podium</a>
    ```
    To:
    ```tsx
    <a href="https://podium.rogerflores.dev/" target="_blank" rel="noopener noreferrer" style={{ color: "#5dcaa5" }}>Podium</a>
    ```

    Line 206 in PlatformerGame.tsx already has `rel="noopener noreferrer"` — do not touch it.

    D-03 lock: Do NOT change any game logic, canvas rendering, room configuration, or modal content other than the href values and rel attributes listed above.
  </action>
  <acceptance_criteria>
    - `grep -n 'podium-beta.vercel.app' app/\(site\)/boring/page.tsx` returns empty output
    - `grep -n 'podium-beta.vercel.app' app/components/PlatformerGame.tsx` returns empty output
    - `grep -n 'target="_blank"' app/\(site\)/boring/page.tsx | grep -v 'noopener'` returns empty output
    - `grep -n 'target="_blank"' app/components/PlatformerGame.tsx | grep -v 'noopener'` returns empty output
    - `grep -c 'noopener' app/components/PlatformerGame.tsx` returns 6 (5 new + 1 existing at line 206)
    - `npx next build` exits 0
  </acceptance_criteria>
</task>
```

## Verification

Run these commands after all tasks complete to confirm Plan A is done:

```bash
# SEC-01: Zero insecure blank-target links remain anywhere in app/
grep -r 'target="_blank"' app/ --include="*.tsx" | grep -v 'noopener'
# Expected: empty output

# ABT-01: No bare <img> on About page
grep -n '<img' app/\(site\)/about/page.tsx
# Expected: empty output

# ABT-01: Image fill wrapper present
grep -n 'relative aspect-\[4/5\]' app/\(site\)/about/page.tsx
# Expected: 1 match

# PROJ-03: Old Podium URL gone from all files
grep -rn 'podium-beta.vercel.app' app/
# Expected: empty output

# Build passes
npx next build
# Expected: exit 0
```

## Success Criteria

- Zero `target="_blank"` links exist in `app/` without `rel="noopener noreferrer"` (SEC-01 complete)
- About page profile photo block uses `<Image fill>` from `next/image` inside a `relative aspect-[4/5]` wrapper (ABT-01 complete)
- Every href referencing `podium-beta.vercel.app` across all 5 affected files is updated to `podium.rogerflores.dev` (PROJ-03 complete)
- `npx next build` exits 0
