# Technology Stack

**Analysis Date:** 2026-05-06

## Runtime & Language

**Primary:**
- TypeScript 5.x - All source files (`app/**/*.ts`, `app/**/*.tsx`)
- Target: ES2017, strict mode enabled, `isolatedModules: true`

**Runtime:**
- Node.js (LTS ~20) - Development and build
- Browser - Production target (client-side game rendering via Phaser)

**Package Manager:**
- npm - Lockfile: `package-lock.json` present

## Framework

**Core:**
- Next.js 16.1.1 - App Router with React Server Components
- Config: `next.config.ts` (minimal, no custom options set)
- Path alias: `@/*` maps to repo root (`tsconfig.json`)
- Route groups: `app/(site)/` for traditional pages, `app/` root for game entry

**React:**
- React 19.2.3 / react-dom 19.2.3
- JSX transform: `react-jsx` (no explicit React imports needed)

## Build & Tooling

**Bundler:**
- Next.js built-in (Webpack/Turbopack via `next build`)
- Module resolution: `bundler` mode

**Linting:**
- ESLint 9 with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Config: `eslint.config.mjs` (flat config format)

**Type Checking:**
- TypeScript 5 (`tsc --noEmit` via `next build`)
- Incremental compilation enabled (`tsconfig.tsbuildinfo`)

**PostCSS:**
- `@tailwindcss/postcss` plugin - Config: `postcss.config.mjs`

## Styling

**Approach:** Tailwind CSS v4 (utility-first)
- Imported via `@import "tailwindcss"` in `app/globals.css`
- Custom design tokens defined as CSS variables in `:root` and `@media (prefers-color-scheme: dark)`
- Color palette: warm neutrals (`--background`, `--foreground`), sage/teal accent (`--accent`, `--accent-mid`), coral secondary
- Fonts via `next/font/google`: Geist Sans, Geist Mono, Nunito

**Dark Mode:** CSS `prefers-color-scheme` media query (no JS toggle)

## State Management

- React `useState` / `useEffect` only - no external state library
- `localStorage` key `rflor-site-mode` persists user's choice between game and traditional view

## Testing

**Runner:** Vitest 4.1.4
- Config: `vitest.config.ts` — environment: `node`, globals: `true`
- UI: `@vitest/ui` 4.1.4

**Approach:** Logic extraction pattern — complex component logic is extracted into pure functions and tested in isolation (no DOM/React Testing Library). See `app/components/WelcomeSplash.test.ts` and `app/page.test.ts`.

**Run Commands:**
```bash
npx vitest          # Run all tests
npx vitest --ui     # Visual UI mode
npx vitest run      # CI/single-pass
```

## Key Dependencies

**Critical:**
- `next` 16.1.1 - Full-stack React framework, routing, SSR/SSG, font optimization
- `react` 19.2.3 - UI rendering, hooks
- `react-dom` 19.2.3 - DOM renderer
- `phaser` ^3.87.0 - 2D game engine powering the interactive portfolio homepage; loaded client-side only via `next/dynamic` with `ssr: false`

**Dev / Build:**
- `tailwindcss` ^4 - Utility CSS framework
- `@tailwindcss/postcss` ^4 - PostCSS integration for Tailwind v4
- `typescript` ^5 - Type checking
- `eslint` ^9 - Linting
- `eslint-config-next` 16.1.1 - Next.js-specific lint rules
- `vitest` ^4.1.4 - Unit test runner
- `@vitest/ui` ^4.1.4 - Test UI dashboard

---

*Stack analysis: 2026-05-06*
