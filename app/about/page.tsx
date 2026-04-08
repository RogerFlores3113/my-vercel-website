import { CTABanner } from "../layout";

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6">
      {/* ============================================
          HEADER + PHOTO
          ============================================ */}
      <section className="pt-16 pb-10">
        <h1 className="text-4xl font-medium tracking-tight mb-2">About me</h1>
        <a
          href="mailto:rflores3113@gmail.com"
          className="text-[var(--accent)] hover:underline text-[15px]"
        >
          rflores3113@gmail.com
        </a>
      </section>

      {/* Photo  wider aspect ratio, full-width */}
      <div className="mb-10 rounded-2xl overflow-hidden">
        <img
          src="/Roger_Website.jpg"
          alt="Roger Flores"
          className="w-full aspect-[16/10] object-cover"
        />
      </div>

      {/* ============================================
          BIO
          ============================================ */}
      <section className="mb-14">
        <div className="space-y-4 text-[17px] leading-relaxed text-[var(--foreground-muted)]">
          <p>
            I&apos;m a software engineer who&apos;s happiest when a problem
            requires both technical depth and talking to real people. My
            professional work has ranged from ML-powered inventory optimization
            for Fortune 500 companies to deploying property appraisal systems
            for county governments.
          </p>
          <p>
            I&apos;m drawn to the kind of work where you have to figure out
            what the actual problem is before you can solve it. Client-facing
            requirements gathering, ambiguous data, systems that need to work
            in the real world; these are where I do my best work.
          </p>
        </div>
      </section>

      {/* ============================================
          WHAT I'M DOING NOW
          ============================================ */}
      <section className="mb-14">
        <p className="eyebrow">What I&apos;m doing now</p>
        <div className="space-y-4 text-[15px] leading-relaxed text-[var(--foreground-muted)]">
          <p>
            Building{" "}
            <a
              href="https://podium-beta.vercel.app/"
              className="text-[var(--accent)] hover:underline"
            >
              Podium
            </a>
            , an LLM assistant. The beta is live. Try it out!
          </p>
          <p>
            Training toward my private pilot&apos;s license.
          </p>
          <p>
            Exploring Andrej Karpathy&apos;s{" "}
            <a
              href="https://github.com/karpathy/nanochat"
              target="_blank"
              className="text-[var(--accent)] hover:underline"
            >
              nanochat
            </a>{" "}
            — specifically, how to get meaningful results from a model designed
            for 40 hours on 8×H100 GPUs when all I have is a 4080 Super.
          </p>
        </div>
      </section>

      {/* ============================================
          INTERESTS
          ============================================ */}
      <section className="mb-14">
        <p className="eyebrow">Interests</p>
        <p className="text-[15px] leading-relaxed text-[var(--foreground-muted)]">
          I read a lot :D {" "}
          <a
            href="/reading"
            className="text-[var(--accent)] hover:underline"
          >
            here&apos;s what I&apos;ve been reading
          </a>
          . I play board games (Terraforming Mars and Blood on the Clocktower
          are current favorites). Rock climbing is my main physical activity,
          but I also love hiking and flying. And I&apos;m still searching for
          the perfect morning green tea. If you have any leads i'll take thdm!
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