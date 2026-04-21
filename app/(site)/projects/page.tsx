import { CTABanner } from "../../layout";

export default function Projects() {
  return (
    <main className="max-w-3xl mx-auto px-6">
      {/* Header */}
      <section className="pt-16 pb-10">
        <h1 className="text-4xl font-medium tracking-tight mb-4">Projects</h1>
        <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
          Everything here was built with purpose, whether it be solving a real problem for
          someone I know or exploring something I found genuinely interesting.
        </p>
      </section>

      {/* ============================================
          PROFESSIONAL EXPERIENCE
          ============================================ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Professional experience</h2>

        <div className="space-y-5">
          {/* Property Appraisal */}
          <div className="project-card">
            <p className="label-pro mb-2">Pilot deployment · 2 county clients</p>
            <h2 className="text-xl font-medium mb-3">
              Property Appraisal Prediction Platform
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              County governments needed to modernize property valuations, but
              their data was inconsistent, with missing fields, ambiguous
              definitions, and unresponsive data providers across jurisdictions.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              I led pilot deployment for two counties: gathering requirements
              directly from government stakeholders, translating messy
              real-world data into usable ML features, and customizing the
              React frontend for county-specific workflows.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Both pilots shipped to production despite significant data
              pipeline limitations and coordination challenges across
              organizations.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Cassandra</span>
              <span className="tech-tag">Data Integration</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Proprietary client work
            </p>
          </div>

          {/* Inventory Optimization */}
          <div className="project-card">
            <p className="label-pro mb-2">Fortune 500 clients · 6-person team</p>
            <h2 className="text-xl font-medium mb-3">
              Inventory Optimization Platform
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Fortune 500 energy and steel companies needed AI-powered inventory
              optimization across multi-terabyte datasets. This was demand forecasting,
              pricing fluctuations, and logistics constraints all in one system.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              I worked across the full stack: resolving complex bugs where React
              UI components interacted poorly with large-scale database
              operations, building automated data validation jobs, and shipping
              features under tight client deadlines.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Maintained and extended the production system alongside five other
              engineers, balancing ongoing bug resolution with new feature
              development.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Cassandra</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Proprietary client work
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          PERSONAL PROJECTS
          ============================================ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Personal projects</h2>

        <div className="space-y-5">
          {/* Podium — featured */}
          <div className="project-card featured-card">
            <p className="label-personal mb-2">RAG LLM assistant · Live beta</p>
            <h2 className="text-xl font-medium mb-3">
              Podium{" "}
              <a
                href="https://podium-beta.vercel.app/"
                target="_blank"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                podium-beta.vercel.app ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A production RAG assistant with bring-your-own-key architecture — users supply
              their own API keys and the system never stores credentials. Supports multiple
              LLM backends with agentic tool compatibility for retrieval and web search.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Infrastructure managed via Terraform IaC on AWS. Frontend deployed on Vercel.
              My current main build.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">AWS</span>
              <span className="tech-tag">Terraform</span>
              <span className="tech-tag">RAG</span>
              <span className="tech-tag">LLM</span>
            </div>
            <a
              href="https://podium-beta.vercel.app/"
              target="_blank"
              className="text-[13px] text-[var(--accent)] hover:underline"
            >
              Try the live beta →
            </a>
          </div>

          {/* Law Firm Scraper */}
          <div className="project-card">
            <p className="label-personal mb-2">Automation · 3-day build</p>
            <h2 className="text-xl font-medium mb-3">
              Law Firm Lead Scraper
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Someone needed structured contact data from law firm websites.
              I built an automated
              scraper that takes a URL as input and outputs clean, structured
              lead data in Excel format.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Uses Selenium for dynamic content handling and custom parsing
              logic. Completed in three days as a practical tool for a real
              need.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Selenium</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Private repository
            </p>
          </div>

          {/* Minecraft Escape Room */}
          <div className="project-card">
            <p className="label-personal mb-2">
              Game design · Collaborative build
            </p>
            <h2 className="text-xl font-medium mb-3">
              Minecraft Escape Room
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A custom adventure map featuring puzzles, narrative elements,
              command blocks, and datapacks, built collaboratively with a
              friend. Thousands of connected command blocks, coordinated
              through a shared Google Drive planning system.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              The first escape room is complete: roughly 4 hours of gameplay.
              A second, significantly larger room is currently in progress.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Game Design</span>
              <span className="tech-tag">JSON</span>
              <span className="tech-tag">Project Planning</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              World file available on request, {" "}
              <a
                href="mailto:rflores3113@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                email me
              </a>
            </p>
          </div>
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