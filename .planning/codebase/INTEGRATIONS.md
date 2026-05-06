# External Integrations

**Analysis Date:** 2026-05-06

## Deployment

**Hosting:**
- Vercel - Project name `my-portfolio` (inferred from `package.json` name and repo name `my-vercel-website`)
- `next build` / `next start` - standard Vercel deployment pipeline

**CI/CD:**
- Not detected - no `.github/workflows/`, CircleCI, or other CI config files found

## APIs & Services

**Google Fonts:**
- Used via `next/font/google` in `app/layout.tsx`
- Fonts loaded at build/render time: `Geist`, `Geist_Mono`, `Nunito`
- No API key required; Next.js fetches and self-hosts fonts automatically

**PixelLab (MCP / development tooling only):**
- MCP server available in the dev environment for AI pixel art generation
- Used to generate red panda sprite assets in `public/sprites/pixellab_red_panda/`
- Not integrated into the running application; assets are pre-generated static files
- No runtime API calls to PixelLab from the application

## Data Storage

**Databases:** None - no database, ORM, or data-fetching layer detected

**File Storage:** Local filesystem / Vercel static serving
- Sprites: `public/sprites/pixellab_red_panda/animations/` (PNG frames)
- Props/assets: `public/props/` (PNG images)
- Game data: `public/dad-jokes.json` (loaded at runtime by Phaser via `this.load.json`)
- Resume: `public/rflores_resume.pdf`

**Client-Side Persistence:**
- `localStorage` key `rflor-site-mode` - stores user preference (`"game"` | `"boring"`)

**Caching:** None (beyond Next.js default static asset caching)

## Authentication & Identity

**Auth Provider:** None - no authentication system detected

## Analytics & Monitoring

**Error Tracking:** None detected - no Sentry, Datadog, or similar integration

**Analytics:** None detected - no Google Analytics, Plausible, or similar scripts

**Logs:** `console.error` used for Phaser load failures in `app/components/PlatformerGame.tsx`

## Environment Variables

No `process.env` references found in source code. No `.env` files present in the repository.

The application has no runtime environment variable dependencies - all configuration is hardcoded or static.

## Webhooks & Callbacks

**Incoming:** None

**Outgoing:** None - external links (LinkedIn, GitHub, email) are plain `<a>` tags / `window.open` calls from Phaser, not webhooks

## External URLs Referenced in Code

The following external URLs are hardcoded directly in `app/components/PlatformerGame.tsx`:
- `https://podium-beta.vercel.app/` - Personal project (live beta)
- `https://github.com/RogerFlores3113` - GitHub profile
- `https://www.linkedin.com/in/roger-flores-3113-nu/` - LinkedIn profile
- `mailto:rflores3113@gmail.com` - Contact email

---

*Integration audit: 2026-05-06*
