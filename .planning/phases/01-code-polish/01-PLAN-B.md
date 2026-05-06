---
plan: B
wave: 2
depends_on: [A]
files_modified:
  - app/(site)/reading/page.tsx
  - app/(site)/projects/page.tsx
requirements:
  - READ-01
  - READ-02
  - PROJ-01
  - PROJ-02
  - PROJ-03
  - PROJ-04
autonomous: true
---

## Objective

Add two books to the "Want to read" section of the Reading page (READ-01, READ-02) and update the Projects page with three new personal project cards (URL Shortener, Longdle, LLM Eval Harness) inserted between Podium and the existing Law Firm Scraper (PROJ-01, PROJ-02, PROJ-04), ordered per D-06. All new links use `rel="noopener noreferrer"` from the start (anti-pattern from RESEARCH.md: copy from already-fixed Podium card, not from unfixed originals). Plan A must complete first so the Podium card in projects/page.tsx is already correct and safe to reference as a template.

## Must Haves

- `grep -n 'Notes on Being a Man' app/\(site\)/reading/page.tsx` returns 1 match (READ-01)
- `grep -n 'Empire of AI' app/\(site\)/reading/page.tsx` returns 1 match (READ-02)
- The "send me a suggestion" email link paragraph remains present and unmodified in reading/page.tsx
- `grep -n 'short.rogerflores.dev' app/\(site\)/projects/page.tsx` returns at least 1 match (PROJ-01)
- `grep -n 'longdle.rogerflores.dev' app/\(site\)/projects/page.tsx` returns at least 1 match (PROJ-02)
- `grep -n 'LLM Eval Harness' app/\(site\)/projects/page.tsx` returns 1 match (PROJ-04)
- `grep -n 'GitHub and writeup coming soon' app/\(site\)/projects/page.tsx` returns 1 match (D-07 exact copy)
- `grep -r 'target="_blank"' app/ --include="*.tsx" | grep -v 'noopener'` returns empty output (no new insecure links introduced)
- `npx next build` exits 0

## Tasks

### Task B1: READ-01 + READ-02 — Add "Want to read" book list to reading/page.tsx

```xml
<task id="B1" type="execute">
  <title>Insert bullet list of unread books before existing email suggestion paragraph</title>
  <read_first>
    - app/(site)/reading/page.tsx
  </read_first>
  <action>
    In `app/(site)/reading/page.tsx`, the "Want to read" section (lines 100–114) currently contains only a single `<p>` element with a comment block and the email suggestion link. Add a `<ul>` immediately BEFORE that `<p>` — do not replace or modify the existing `<p>`.

    The current section content (lines 101–113):
    ```tsx
    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Want to read</h2>
    <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
      {/* Add your upcoming books here. Even 2-3 titles makes the page
          feel like a living document instead of a finished list. Example: */}
      Updating this as I go. Recommendations welcome —{" "}
      <a
        href="mailto:rflores3113@gmail.com"
        className="text-[var(--accent)] hover:underline"
      >
        send me a suggestion
      </a>
      .
    </p>
    ```

    Replace the section content with:
    ```tsx
    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Want to read</h2>
    <ul className="text-[15px] text-[var(--foreground-muted)] leading-relaxed space-y-1 mb-4 list-disc list-inside">
      <li><em>Notes on Being a Man</em> — Scott Galloway</li>
      <li><em>Empire of AI</em> — Karen Hao</li>
    </ul>
    <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
      Updating this as I go. Recommendations welcome —{" "}
      <a
        href="mailto:rflores3113@gmail.com"
        className="text-[var(--accent)] hover:underline"
      >
        send me a suggestion
      </a>
      .
    </p>
    ```

    Key rules:
    - The comment block inside the original `<p>` is removed (it was placeholder guidance, not real content)
    - The `Updating this as I go. Recommendations welcome —` prose and email link are PRESERVED exactly, moved outside the comment
    - `<ul>` is added BEFORE the `<p>`, not replacing it
    - Title text in `<em>` per D-05 format
    - No `target="_blank"` added (email link uses `mailto:`)
  </action>
  <acceptance_criteria>
    - `grep -n 'Notes on Being a Man' app/\(site\)/reading/page.tsx` returns 1 match
    - `grep -n 'Empire of AI' app/\(site\)/reading/page.tsx` returns 1 match
    - `grep -n 'send me a suggestion' app/\(site\)/reading/page.tsx` returns 1 match (email link preserved)
    - `grep -n 'list-disc list-inside' app/\(site\)/reading/page.tsx` returns 1 match (ul class)
    - `grep -n 'Scott Galloway' app/\(site\)/reading/page.tsx` returns 1 match
    - `grep -n 'Karen Hao' app/\(site\)/reading/page.tsx` returns 1 match
  </acceptance_criteria>
</task>
```

### Task B2: PROJ-01 + PROJ-02 — Add URL Shortener and Longdle project cards to projects/page.tsx

```xml
<task id="B2" type="execute">
  <title>Insert URL Shortener and Longdle project cards after Podium in the personal projects section</title>
  <read_first>
    - app/(site)/projects/page.tsx
  </read_first>
  <action>
    In `app/(site)/projects/page.tsx`, insert two new project cards inside the `{/* Personal Projects */}` section's `<div className="space-y-5">` container. They go AFTER the closing `</div>` of the Podium featured card (after line 135) and BEFORE the opening `<div className="project-card">` of the existing Law Firm Scraper card (currently line 137).

    Current order inside space-y-5:
    1. Podium featured card (lines 98–135)
    2. Law Firm Scraper (lines 137–161)
    3. Minecraft Escape Room (lines 163–195)

    Target order after this task:
    1. Podium featured card (unchanged)
    2. URL Shortener (NEW)
    3. Longdle (NEW)
    4. Law Firm Scraper (unchanged)
    5. Minecraft Escape Room (unchanged)

    Insert the following JSX between the Podium card and the Law Firm Scraper card:

    ```tsx
          {/* URL Shortener */}
          <div className="project-card">
            <p className="label-personal mb-2">System design · Live tool</p>
            <h2 className="text-xl font-medium mb-3">
              URL Shortener{" "}
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
              Built to understand how URL shortening actually works at the system
              level — rate limiting, collision handling, redirect latency. Ended
              up being genuinely useful, so it lives at its own domain.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              An AI agent handles the link-shortening workflow. Gave me a good
              excuse to think through agentic tool design in a low-stakes context.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">System Design</span>
            </div>
          </div>

          {/* Longdle */}
          <div className="project-card">
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
              Wordle, but the word is six letters. Daily puzzle updates,
              localStorage score tracking, and a share button — because
              apparently I needed to be able to brag about my guesses.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Mostly built because I found five-letter Wordle too easy. Mostly.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
            </div>
          </div>
    ```

    Voice notes (per D-02 — direct, slightly informal, focused, occasionally dry):
    - URL Shortener: frames it as a learning project that became actually useful; references system design thinking and AI agent usage without over-hyping.
    - Longdle: leads with fun, acknowledges the slightly absurd premise, uses first person. The second paragraph is dry.

    Both cards use `rel="noopener noreferrer"` on their inline title links (critical — do not omit).
  </action>
  <acceptance_criteria>
    - `grep -n 'short.rogerflores.dev' app/\(site\)/projects/page.tsx` returns at least 2 matches (href + display text)
    - `grep -n 'longdle.rogerflores.dev' app/\(site\)/projects/page.tsx` returns at least 2 matches (href + display text)
    - `grep -n 'URL Shortener' app/\(site\)/projects/page.tsx` returns at least 1 match
    - `grep -n 'Longdle' app/\(site\)/projects/page.tsx` returns at least 1 match
    - `grep -n 'System design · Live tool' app/\(site\)/projects/page.tsx` returns 1 match
    - `grep -n 'Word game · Live' app/\(site\)/projects/page.tsx` returns 1 match
    - `grep -n 'target="_blank"' app/\(site\)/projects/page.tsx | grep -v 'noopener'` returns empty output (all new links have rel)
    - `npx next build` exits 0
  </acceptance_criteria>
</task>
```

### Task B3: PROJ-04 — Add LLM Eval Harness WIP card to projects/page.tsx

```xml
<task id="B3" type="execute">
  <title>Insert muted LLM Eval Harness WIP card after Longdle and before Law Firm Scraper</title>
  <read_first>
    - app/(site)/projects/page.tsx
  </read_first>
  <action>
    In `app/(site)/projects/page.tsx`, after Task B2 completes, the personal projects order will be:
    1. Podium
    2. URL Shortener
    3. Longdle
    4. Law Firm Scraper
    5. Minecraft Escape Room

    Insert the LLM Eval Harness card between Longdle (3) and Law Firm Scraper (4) to achieve D-06's target order.

    Insert this JSX block immediately after the closing `</div>` of the Longdle card and before the opening `<div className="project-card">` of Law Firm Scraper:

    ```tsx
          {/* LLM Eval Harness — WIP */}
          <div className="project-card opacity-60">
            <p className="label-personal mb-2">Dev tooling · In progress</p>
            <h2 className="text-xl font-medium mb-3">LLM Eval Harness</h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A local evaluation harness for benchmarking LLM outputs across
              different models and prompting strategies. Runs test suites,
              scores responses, and logs results for comparison.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Built because eyeballing model outputs is not a methodology.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">LLM</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              GitHub and writeup coming soon.
            </p>
          </div>
    ```

    Key rules:
    - `opacity-60` on the outer div — this is the muted/WIP signal per D-07
    - No `target="_blank"` link in the title (no live URL for WIP project)
    - Footer note is the EXACT string from D-07: `GitHub and writeup coming soon.` — do not paraphrase
    - Label is the EXACT string from D-07: `Dev tooling · In progress`
    - Voice: signals "smart work in progress" — describes what it does, is honest about status, ends with a dry one-liner

    Final card order after this task:
    1. Podium (featured-card)
    2. URL Shortener
    3. Longdle
    4. LLM Eval Harness (opacity-60)
    5. Law Firm Scraper
    6. Minecraft Escape Room
  </action>
  <acceptance_criteria>
    - `grep -n 'LLM Eval Harness' app/\(site\)/projects/page.tsx` returns 1 match
    - `grep -n 'GitHub and writeup coming soon' app/\(site\)/projects/page.tsx` returns 1 match (exact D-07 copy)
    - `grep -n 'Dev tooling · In progress' app/\(site\)/projects/page.tsx` returns 1 match (exact D-07 copy)
    - `grep -n 'opacity-60' app/\(site\)/projects/page.tsx` returns 1 match (WIP card only)
    - `grep -n 'featured-card' app/\(site\)/projects/page.tsx` returns 1 match (Podium only — new cards do not use featured-card)
    - Card order in file: Podium → URL Shortener → Longdle → LLM Eval Harness → Law Firm Scraper → Minecraft Escape Room (verify by reading the file and confirming comment labels appear in this sequence)
    - `npx next build` exits 0
  </acceptance_criteria>
</task>
```

## Verification

Run these commands after all tasks complete to confirm Plan B is done:

```bash
# READ-01: Notes on Being a Man present
grep -n 'Notes on Being a Man' app/\(site\)/reading/page.tsx
# Expected: 1 match

# READ-02: Empire of AI present
grep -n 'Empire of AI' app/\(site\)/reading/page.tsx
# Expected: 1 match

# Email suggestion link still present
grep -n 'send me a suggestion' app/\(site\)/reading/page.tsx
# Expected: 1 match

# PROJ-01: URL Shortener card exists
grep -n 'short.rogerflores.dev' app/\(site\)/projects/page.tsx
# Expected: 2+ matches

# PROJ-02: Longdle card exists
grep -n 'longdle.rogerflores.dev' app/\(site\)/projects/page.tsx
# Expected: 2+ matches

# PROJ-04: LLM Eval Harness WIP card exists with correct footer
grep -n 'GitHub and writeup coming soon' app/\(site\)/projects/page.tsx
# Expected: 1 match

# SEC-01: No new insecure links introduced
grep -r 'target="_blank"' app/ --include="*.tsx" | grep -v 'noopener'
# Expected: empty output

# PROJ-03: Old URL still absent (confirms Plan A held)
grep -rn 'podium-beta.vercel.app' app/
# Expected: empty output

# Build passes
npx next build
# Expected: exit 0
```

## Success Criteria

- Reading page "Want to read" section contains a `<ul>` with both books in `<em>` per D-05 format, followed by the unchanged email suggestion paragraph (READ-01, READ-02 complete)
- Projects page personal projects section contains URL Shortener, Longdle, and LLM Eval Harness cards in D-06 order (after Podium, before Law Firm Scraper) (PROJ-01, PROJ-02, PROJ-04 complete)
- LLM Eval Harness card has `opacity-60`, label `Dev tooling · In progress`, and footer `GitHub and writeup coming soon.` exactly per D-07
- Zero `target="_blank"` links without `rel="noopener noreferrer"` in any `.tsx` file (SEC-01 remains clean)
- `npx next build` exits 0
