import { CTABanner } from "./layout";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6">
      {/* ============================================
          HERO
          ============================================ */}
      <section className="pt-16 pb-14">
        {/* Eyebrow */}
        <p className="text-[13px] font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
          Software Engineer · AI Enthusiast · Pilot in Training
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-[42px] font-medium leading-[1.15] tracking-tight mb-5 text-[var(--foreground)]">
          I build tools that solve real problems  and explore AI when
          it&apos;s interesting, not just trending.
        </h1>

        {/* Currently */}
        <p className="text-lg leading-relaxed text-[var(--foreground-muted)] mb-8">
          Right now I&apos;m training LLMs on a 4080 Super (vs. the usual
          8×H100 setup), building an LLM assistant called{" "}
          <a
            href="https://podium-beta.vercel.app/"
            target="_blank"
            className="text-[var(--accent)] hover:underline"
          >
            Podium
          </a>
          , and working toward my private pilot&apos;s license.
        </p>

        {/* Social links */}
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/RogerFlores3113"
            target="_blank"
            className="pill-link"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/roger-flores-3113-nu/"
            target="_blank"
            className="pill-link"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:rflores3113@gmail.com" className="pill-link">
            Email me
          </a>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-[var(--border)] mb-12" />

      {/* ============================================
          FEATURED WORK
          ============================================ */}
      <section className="mb-16">
        <p className="eyebrow">Featured work</p>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {/* Professional project */}
          <div className="project-card">
            <p className="label-pro mb-2">Professional · Pilot deployment</p>
            <h3 className="text-xl font-medium mb-3">
              Property Appraisal Prediction Platform
            </h3>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              County governments needed to modernize property valuations using
              inconsistent, incomplete data. I led deployment for two counties,
              translating ambiguous government data into ML features. Both pilots
              shipped to production.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Cassandra</span>
              <span className="tech-tag">ML</span>
            </div>
          </div>

          {/* Personal project */}
          <div className="project-card">
            <p className="label-personal mb-2">Personal · 3-day build</p>
            <h3 className="text-xl font-medium mb-3">
              Law Firm Lead Scraper
            </h3>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Someone needed lead data from law firm websites. I built an
              automated scraper; URL input, structured Excel outut. Selenium for
              dynamic content, completed in a weekend.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Selenium</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/projects"
            className="text-[var(--accent)] font-medium hover:underline"
          >
            View all projects →
          </a>
        </div>
      </section>

      {/* ============================================
          BOTTOM GRID personality + currently reading
          ============================================ */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <p className="eyebrow">Currently reading</p>
          <p className="text-lg font-medium italic mb-1">Foundation</p>
          <p className="text-[var(--foreground-muted)] text-sm mb-2">
            Isaac Asimov
          </p>
          <a
            href="/reading"
            className="text-[var(--accent)] text-sm hover:underline"
          >
            See full reading list →
          </a>
        </div>
        <div>
          <p className="eyebrow">Outside of code</p>
          <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
            Rock climbing, board games (Terraforming Mars and Blood on the
            Clocktower are current favorites), hiking, flying, and an ongoing
            search for the perfect morning green tea.
          </p>
        </div>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section className="mb-16">
        <CTABanner />
      </section>
    </main>
  );
}