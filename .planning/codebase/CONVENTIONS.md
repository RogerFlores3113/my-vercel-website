# Code Conventions

## Language & Types
- TypeScript strict mode enabled, ES2017 target
- All interactive components use `"use client"` directive; pages default to server components
- Named exports for all components except page files (which use default export)
- No custom type utilities — plain interfaces and type aliases

## Component Patterns
- Functional components only, no class components
- Props typed inline with `interface` or inline type annotations
- Local state only via `useState` — no global state library
- Phaser game components use refs to manage the game instance lifecycle

## Imports & Modules
- Path alias `@/` maps to project root (via tsconfig)
- No barrel files (`index.ts` re-exports) observed
- Relative imports within component directories, alias imports across directories

## Naming Conventions
- `camelCase` for variables and functions
- `SCREAMING_SNAKE_CASE` for module-level constants
- `PascalCase` for React components and TypeScript interfaces
- Files named after their default export component

## State & Side Effects
- All state local to components via `useState`
- `useEffect` used for Phaser game initialization and cleanup
- `localStorage` always wrapped in `try/catch` (observed in 5+ places)
- Phaser load failures caught with `.catch()` and surfaced via `GameLoader` error prop

## Error Handling
- localStorage access wrapped in try/catch throughout
- Phaser async operations use `.catch()` for error surfacing
- No global error boundary around the game component (gap)

## Code Style
- ESLint via `eslint-config-next/core-web-vitals` + TypeScript preset, no custom overrides
- No Prettier config detected
- CSS: `globals.css` for reusable classes + Tailwind utilities for layout + inline styles in Phaser overlays
