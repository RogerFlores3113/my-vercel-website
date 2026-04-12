import { CTABanner } from "../../layout";

export default function Reading() {
  return (
    <main className="max-w-3xl mx-auto px-6">
      {/* Header */}
      <section className="pt-16 pb-10">
        <h1 className="text-4xl font-medium tracking-tight mb-4">Reading</h1>
        <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
          Books I&apos;ve read in 2026, and what I thought about them.
        </p>
      </section>

      {/* ============================================
          BOOK LIST
          ============================================ */}
      <section className="mb-16 space-y-5">
        {/* Foundation */}
        <div className="project-card">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h2 className="text-xl font-medium italic">Foundation</h2>
              <p className="text-[var(--foreground-faint)] text-sm">
                Isaac Asimov
              </p>
            </div>
            <span className="tech-tag">Worth reading</span>
          </div>
          <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mt-3">
            The characters have 1950s vibes — cigars, all men in charge, the way
            they talk. Reminds me of <em>Star Trek&apos;s</em> original series
            and the <em>Dune</em> books. Unusual in that there isn&apos;t really
            a main character. Fun to see how science fiction started.
          </p>
        </div>

        {/* Random Walk */}
        <div className="project-card">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h2 className="text-xl font-medium italic">
                A Random Walk Down Wall Street
              </h2>
              <p className="text-[var(--foreground-faint)] text-sm">
                Burton Malkiel
              </p>
            </div>
            <span className="tech-tag">Loved it</span>
          </div>
          <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mt-3">
            A phenomenal book for anyone looking into investing. Easy to read,
            and gives you a solid framework for making good decisions with your
            money. Well worth the time.
          </p>
        </div>

        {/* Runnin' Down a Dream */}
        <div className="project-card">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h2 className="text-xl font-medium italic">
                Runnin&apos; Down a Dream
              </h2>
              <p className="text-[var(--foreground-faint)] text-sm">
                Bill Gurley
              </p>
            </div>
            <span className="tech-tag">Good reference</span>
          </div>
          <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mt-3">
            Advocates finding your obsession and turning it into a career, which
            I largely agree with. Full of example success stories. The real gold
            is the author&apos;s recommended reading list at the end — a curated
            set of self-improvement and general knowledge books that&apos;s worth
            the price of admission on its own.
          </p>
        </div>
      </section>

      {/* ============================================
          WANT TO READ
          ============================================ */}
      <section className="mb-16">
        <p className="eyebrow">Want to read</p>
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