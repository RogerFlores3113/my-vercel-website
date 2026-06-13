// Central source of truth for off-site profile links.
//
// Override per-environment via NEXT_PUBLIC_* vars (set them in `.env.local`
// locally and in the Vercel project settings for deploys). The fallbacks below
// keep the site working even when the vars are unset.

export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/RogerFlores3113";

export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/rogflores/";

/** Build a link to one of my GitHub repos, e.g. githubRepo("search"). */
export const githubRepo = (name: string) => `${GITHUB_URL}/${name}`;
