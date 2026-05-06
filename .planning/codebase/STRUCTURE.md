# Directory Structure

## Root Layout
```
my-vercel-website/
├── app/                    # Next.js App Router source
├── public/                 # Static assets
├── node_modules/
├── CLAUDE.md               # Project AI instructions
├── TODOS.md                # Developer task notes
├── next.config.ts          # Next.js config (currently empty)
├── tsconfig.json           # TypeScript config
├── vitest.config.ts        # Vitest test config
├── eslint.config.mjs       # ESLint config
├── postcss.config.mjs      # PostCSS / Tailwind config
└── package.json
```

## Source Tree
```
app/
├── layout.tsx              # Root layout: metadata, fonts, globals.css
├── page.tsx                # Home page: splash/game mode logic
├── page.test.ts            # Tests for home page logic
├── globals.css             # Global styles + reusable CSS classes
├── icon.png                # Favicon
├── components/
│   ├── PlatformerGame.tsx  # Phaser platformer game (~1,230 lines)
│   ├── GameLoader.tsx      # Loading screen for game
│   ├── WelcomeSplash.tsx   # Mode selection splash screen
│   ├── WelcomeSplash.test.ts
│   └── PandaWalker.tsx     # Animated red panda for boring site
└── (site)/                 # Route group for boring site
    ├── layout.tsx          # Shared layout with nav + PandaWalker
    ├── boring/
    │   ├── page.tsx        # Boring site home
    │   └── GameVersionLink.tsx
    ├── about/page.tsx
    ├── projects/page.tsx
    └── reading/page.tsx
```

## Key Files
| File | Role |
|------|------|
| `app/page.tsx` | Entry point — mode routing logic |
| `app/components/PlatformerGame.tsx` | Core game — Phaser scene, sprites, physics |
| `app/components/WelcomeSplash.tsx` | First-run mode selection |
| `app/(site)/layout.tsx` | Boring site shell with nav |
| `app/globals.css` | Global + reusable CSS |
| `next.config.ts` | Next.js config (currently empty) |
| `vitest.config.ts` | Test runner config |

## Naming Conventions
- Component files: `PascalCase.tsx`
- Test files: `ComponentName.test.ts` co-located with component
- Route files: `page.tsx` (Next.js convention)
- Public assets: `snake_case` or `kebab-case` depending on source
- Route groups: `(site)` — parentheses for layout grouping without URL segment
