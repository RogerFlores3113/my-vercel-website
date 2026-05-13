import { BoringClient, JokeCard, CalendarWidget, ComingSoonLink, GameVersionLink } from './BoringClient'

export default function Boring() {
  return (
    <div className="boring-page">

      {/* ─── TOP RAIL ─── */}
      <header className="rail">
        <div className="rail-inner">
          <a className="brand" href="#top">
            <span className="face" aria-hidden="true" />
            <span>Roger Flores</span>
          </a>
          <span className="slash">/</span>
          <span className="here">boring</span>
          <nav>
            <a href="#projects">projects</a><span className="sep">·</span>
            <a href="#about">about</a><span className="sep">·</span>
            <a href="#chat">chat</a><span className="sep">·</span>
            <a href="https://rogerflores.dev/rflores_resume.pdf">resume</a>
            <span className="badges" aria-label="Profiles">
              <a className="badge gh" href="https://github.com/RogerFlores3113" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </a>
              <a className="badge li" href="https://www.linkedin.com/in/roger-flores-3113-nu/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </span>
            <GameVersionLink />
          </nav>
        </div>
      </header>

      <div className="page" id="top">

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero">

          <div className="hero-status">
            <span className="live-dot" aria-hidden="true" />
            <span>Open · May 2026</span>
            <span className="sep">·</span>
            <span>Builds, ships, answers pages</span>
            <span className="sep">·</span>
            <span>SF Bay Area</span>
          </div>

          {/* Atmosphere layer */}
          <div className="atmos" aria-hidden="true">
            {/* Sun */}
            <div className="hero-sun" />

            {/* Clouds */}
            <div className="cloud c-a" style={{ top: '6%', transform: 'scale(0.9)', ['--dur' as string]: '110s', ['--delay' as string]: '-10s' }}>
              <svg width="200" height="50" viewBox="0 0 200 50"><ellipse cx="40" cy="32" rx="40" ry="13" fill="rgba(255,250,240,0.78)"/><ellipse cx="90" cy="22" rx="38" ry="18" fill="rgba(255,250,240,0.88)"/><ellipse cx="140" cy="28" rx="46" ry="14" fill="rgba(255,250,240,0.82)"/><ellipse cx="180" cy="34" rx="24" ry="9" fill="rgba(255,250,240,0.7)"/></svg>
            </div>
            <div className="cloud c-b" style={{ top: '13%', transform: 'scale(1.15)', ['--dur' as string]: '150s', ['--delay' as string]: '-45s' }}>
              <svg width="240" height="46" viewBox="0 0 240 46"><ellipse cx="60" cy="26" rx="58" ry="12" fill="rgba(255,250,240,0.68)"/><ellipse cx="140" cy="20" rx="66" ry="14" fill="rgba(255,250,240,0.72)"/><ellipse cx="210" cy="26" rx="30" ry="9" fill="rgba(255,250,240,0.6)"/></svg>
            </div>
            <div className="cloud c-c" style={{ top: '19%', transform: 'scale(0.75)', ['--dur' as string]: '95s', ['--delay' as string]: '-70s' }}>
              <svg width="160" height="38" viewBox="0 0 160 38"><ellipse cx="40" cy="20" rx="40" ry="10" fill="rgba(255,250,240,0.6)"/><ellipse cx="100" cy="18" rx="50" ry="11" fill="rgba(255,250,240,0.65)"/></svg>
            </div>
            <div className="cloud c-d" style={{ top: '26%', transform: 'scale(1.3)', ['--dur' as string]: '175s', ['--delay' as string]: '-120s' }}>
              <svg width="280" height="48" viewBox="0 0 280 48"><ellipse cx="60" cy="26" rx="58" ry="12" fill="rgba(255,250,240,0.55)"/><ellipse cx="160" cy="20" rx="80" ry="14" fill="rgba(255,250,240,0.62)"/><ellipse cx="245" cy="26" rx="34" ry="10" fill="rgba(255,250,240,0.5)"/></svg>
            </div>
            <div className="cloud c-e" style={{ top: '34%', transform: 'scale(0.85)', ['--dur' as string]: '130s', ['--delay' as string]: '-25s' }}>
              <svg width="200" height="44" viewBox="0 0 200 44"><ellipse cx="50" cy="24" rx="48" ry="11" fill="rgba(255,250,240,0.55)"/><ellipse cx="120" cy="20" rx="58" ry="12" fill="rgba(255,250,240,0.6)"/><ellipse cx="180" cy="26" rx="24" ry="8" fill="rgba(255,250,240,0.48)"/></svg>
            </div>
            <div className="cloud c-f" style={{ top: '41%', opacity: 0.55, transform: 'scale(0.7)', ['--dur' as string]: '100s', ['--delay' as string]: '-90s' }}>
              <svg width="160" height="36" viewBox="0 0 160 36"><ellipse cx="40" cy="18" rx="40" ry="9" fill="rgba(255,250,240,0.5)"/><ellipse cx="110" cy="16" rx="50" ry="11" fill="rgba(255,250,240,0.55)"/></svg>
            </div>
            <div className="cloud c-g" style={{ top: '48%', opacity: 0.5, transform: 'scale(1.1)', ['--dur' as string]: '165s', ['--delay' as string]: '-55s' }}>
              <svg width="240" height="40" viewBox="0 0 240 40"><ellipse cx="60" cy="22" rx="60" ry="11" fill="rgba(255,250,240,0.42)"/><ellipse cx="160" cy="18" rx="70" ry="11" fill="rgba(255,250,240,0.48)"/></svg>
            </div>

            {/* Planes */}
            <div className="plane plane-a"><span className="trail" /><span className="caret">›</span></div>
            <div className="plane plane-b"><span className="trail" /><span className="caret">›</span></div>

            {/* Mountains far */}
            <div className="px-wrap" data-parallax="0.06">
              <div className="mountains mountains-far">
                <svg viewBox="0 0 2560 220" preserveAspectRatio="none">
                  <defs>
                    <clipPath id="farMtnClip" clipPathUnits="userSpaceOnUse">
                      <path d="M0 220 L0 130 L80 110 L150 130 L240 80 L320 120 L400 70 L500 110 L600 60 L700 95 L800 50 L900 90 L1000 65 L1100 95 L1200 55 L1300 90 L1400 70 L1500 105 L1600 80 L1700 115 L1800 70 L1900 105 L2000 60 L2100 95 L2200 75 L2300 110 L2400 80 L2500 110 L2560 95 L2560 220 Z" />
                    </clipPath>
                    <linearGradient id="snowShade" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,253,247,1)" />
                      <stop offset="55%" stopColor="rgba(255,250,240,0.96)" />
                      <stop offset="88%" stopColor="rgba(248,242,228,0.7)" />
                      <stop offset="100%" stopColor="rgba(232,222,200,0.3)" />
                    </linearGradient>
                    <filter id="snowRough" x="-5%" y="-5%" width="110%" height="110%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.018 0.045" numOctaves={2} seed={9} result="n" />
                      <feDisplacementMap in="SourceGraphic" in2="n" scale={14} />
                    </filter>
                    <filter id="snowRoughFine" x="-5%" y="-5%" width="110%" height="110%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.08" numOctaves={2} seed={3} result="n" />
                      <feDisplacementMap in="SourceGraphic" in2="n" scale={6} />
                    </filter>
                  </defs>
                  <path d="M0 220 L0 130 L80 110 L150 130 L240 80 L320 120 L400 70 L500 110 L600 60 L700 95 L800 50 L900 90 L1000 65 L1100 95 L1200 55 L1300 90 L1400 70 L1500 105 L1600 80 L1700 115 L1800 70 L1900 105 L2000 60 L2100 95 L2200 75 L2300 110 L2400 80 L2500 110 L2560 95 L2560 220 Z" fill="#b8c4ce" />
                  <g clipPath="url(#farMtnClip)">
                    <g filter="url(#snowRough)">
                      <path fill="rgba(255,250,240,0.55)" d="M -50 -10 L 2610 -10 L 2610 120 L 2540 122 L 2480 108 L 2420 118 L 2370 108 L 2300 116 L 2240 118 L 2180 108 L 2120 100 L 2060 102 L 2000 110 L 1950 102 L 1900 102 L 1850 100 L 1800 110 L 1750 116 L 1700 110 L 1640 106 L 1600 116 L 1550 100 L 1500 108 L 1440 100 L 1400 108 L 1340 106 L 1280 100 L 1220 92 L 1180 92 L 1140 100 L 1080 98 L 1040 92 L 1000 100 L 940 92 L 900 100 L 860 100 L 820 96 L 800 96 L 770 90 L 730 100 L 690 102 L 650 96 L 600 98 L 560 96 L 510 110 L 460 112 L 410 100 L 360 116 L 320 124 L 270 110 L 240 114 L 195 108 L 150 124 L 100 118 L 50 122 L 0 132 Z" />
                    </g>
                    <g filter="url(#snowRough)">
                      <path fill="url(#snowShade)" d="M -50 -10 L 2610 -10 L 2610 102 L 2540 102 L 2480 90 L 2420 102 L 2380 92 L 2320 100 L 2260 96 L 2200 102 L 2150 90 L 2090 92 L 2030 88 L 1980 88 L 1940 84 L 1900 90 L 1860 88 L 1820 96 L 1780 94 L 1740 102 L 1690 96 L 1640 96 L 1600 102 L 1560 88 L 1510 92 L 1470 96 L 1430 86 L 1395 90 L 1350 84 L 1300 92 L 1250 84 L 1210 82 L 1170 78 L 1130 90 L 1090 92 L 1050 84 L 1010 86 L 980 82 L 940 76 L 900 88 L 860 92 L 820 84 L 800 80 L 780 80 L 740 76 L 700 90 L 660 90 L 620 82 L 590 82 L 550 88 L 510 98 L 470 94 L 430 100 L 400 88 L 370 88 L 330 98 L 280 96 L 240 96 L 200 96 L 160 110 L 110 102 L 60 108 L 0 116 Z" />
                    </g>
                    <g filter="url(#snowRoughFine)">
                      <path fill="rgba(255,253,247,0.98)" d="M -50 -10 L 2610 -10 L 2610 92 L 2560 96 L 2520 80 L 2480 82 L 2440 86 L 2400 90 L 2370 82 L 2330 80 L 2280 80 L 2230 78 L 2200 88 L 2170 80 L 2130 78 L 2080 76 L 2040 74 L 2000 80 L 1970 72 L 1930 72 L 1890 76 L 1860 78 L 1830 80 L 1800 84 L 1770 80 L 1740 78 L 1700 76 L 1660 78 L 1620 80 L 1600 86 L 1570 76 L 1540 76 L 1500 78 L 1460 78 L 1420 76 L 1400 80 L 1370 76 L 1340 72 L 1300 76 L 1260 72 L 1220 70 L 1200 72 L 1170 66 L 1140 72 L 1100 76 L 1060 72 L 1020 72 L 1000 76 L 970 72 L 940 68 L 910 70 L 870 72 L 830 70 L 800 70 L 770 68 L 730 64 L 700 76 L 670 74 L 640 70 L 610 72 L 590 70 L 560 76 L 520 80 L 480 82 L 440 84 L 410 80 L 380 78 L 350 86 L 310 84 L 270 82 L 240 80 L 210 80 L 170 86 L 130 92 L 90 88 L 50 92 L 0 96 Z" />
                    </g>
                  </g>
                  <g fill="rgba(255,253,247,0.98)">
                    <polygon points="590,73 600,58 612,73" />
                    <polygon points="790,63 800,48 812,63" />
                    <polygon points="1190,69 1200,53 1212,69" />
                    <polygon points="1990,73 2000,58 2012,73" />
                  </g>
                  <g fill="rgba(255,220,170,0.45)">
                    <polygon points="590,73 600,58 595,66" />
                    <polygon points="790,63 800,48 795,55" />
                    <polygon points="1190,69 1200,53 1195,61" />
                    <polygon points="1990,73 2000,58 1995,65" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Mountains mid */}
            <div className="px-wrap" data-parallax="0.12">
              <div className="mountains mountains-mid">
                <svg viewBox="0 0 2560 220" preserveAspectRatio="none">
                  <path d="M0 220 L0 165 L80 130 L160 160 L240 110 L340 150 L420 100 L520 150 L620 90 L720 140 L820 95 L920 135 L1020 100 L1120 145 L1220 105 L1320 145 L1420 100 L1520 140 L1620 95 L1720 140 L1820 105 L1920 145 L2020 95 L2120 135 L2220 110 L2320 145 L2420 100 L2520 130 L2560 120 L2560 220 Z" fill="#7d8a8e" />
                </svg>
              </div>
            </div>

            {/* Mountains near */}
            <div className="px-wrap" data-parallax="0.22">
              <div className="mountains mountains-near">
                <svg viewBox="0 0 2560 180" preserveAspectRatio="none">
                  <path d="M0 180 L0 110 L60 90 L140 120 L220 80 L300 110 L380 75 L460 115 L540 80 L620 110 L700 75 L780 115 L860 80 L940 110 L1020 75 L1100 115 L1180 85 L1260 110 L1340 80 L1420 115 L1500 80 L1580 110 L1660 85 L1740 115 L1820 80 L1900 110 L1980 75 L2060 115 L2140 80 L2220 110 L2300 80 L2380 115 L2460 85 L2540 110 L2560 100 L2560 180 Z" fill="#4a6f3e" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div className="hero-content">
            <h1 className="name">
              <span className="word">Roger</span>
              <span className="word last">Flores</span>
            </h1>
            <p className="hero-lede">Full-stack AI engineer &amp; pun enthusiast.</p>
            <div className="hero-facts">
              <span className="chip"><span className="k">Stack</span><b>TS · Python · AWS</b></span>
              <span className="chip"><span className="k">Lately</span><b>RAG · agents · IaC</b></span>
              <span className="chip"><span className="k">Allergic to</span><b>shipping nothing</b></span>
            </div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section className="about" id="about">
          <div className="about-grid">
            <div className="prose">
              <span className="seclabel">A bit about me</span>
              <p className="hi">Hi, I&apos;m Roger.</p>
              <p>
                I&apos;m an AI engineer in the SF Bay Area. Northeastern CS, then
                production work for Fortune 500s and county governments. These
                days I&apos;m building projects that solve problems for friends
                and family.
              </p>
              <p>
                I do the whole stack. I love helping other people, and I&apos;m
                proud of what I do, but I try not to take myself too seriously
                while doing so. Off the clock I&apos;m{' '}
                <span className="soft">learning to fly small planes</span>,{' '}
                <ComingSoonLink label="climbing log">climbing rocks indoors</ComingSoonLink>, walking{' '}
                <ComingSoonLink label="trails list">Bay Area trails</ComingSoonLink>, crushing people in{' '}
                <ComingSoonLink label="games list">board games</ComingSoonLink>, and reading{' '}
                <a href="/reading">a stack of books that keeps on growing D:</a>.
                Also red pandas... obviously.
              </p>
              <p>
                I&apos;m always happy to chat about anything! You can reach me at{' '}
                <a href="mailto:rflores3113@gmail.com">rflores3113@gmail.com</a>,
                or <a href="#chat" className="anchor">book a 15-minute call</a> on
                my calendar below.
              </p>
            </div>

            <aside className="about-rail">
              <JokeCard />
            </aside>
          </div>
        </section>

        {/* ═══════════ PROJECTS ═══════════ */}
        <section className="projects" id="projects">
          <div className="projects-head">
            <div>
              <span className="seclabel">Projects</span>
              <h2 className="proj-section-title">Things I&apos;m building.</h2>
            </div>
            <div className="projects-pager" hidden aria-hidden="true">
              <button className="page-btn" data-dir="prev" aria-label="Previous page">
                <svg viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>
              </button>
              <span className="page-counter"><b>1</b> / 1</span>
              <button className="page-btn" data-dir="next" aria-label="Next page">
                <svg viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>
              </button>
            </div>
          </div>

          {/* Podium hero showcase */}
          <article className="podium-hero" aria-label="Featured: Podium">
            <div className="ph-left">
              <h3 className="ph-title">
                Podium
                <span className="ph-status"><span className="pulse" />Beta · Live</span>
              </h3>
              <a className="ph-url" href="https://podium.rogerflores.dev" target="_blank" rel="noopener">
                podium.rogerflores.dev
                <span className="arrow">↗</span>
              </a>
              <p className="ph-body">
                A RAG assistant with <em>bring-your-own-key</em> architecture.
                Agentic tools, multiple LLM backends, Terraform-managed
                infrastructure on AWS. Built for teams that want their own
                data, their own keys, their own control.
              </p>
              <div className="ph-cells">
                <div className="cell"><div className="k">Stack</div><div className="v">Next.js <small>app router</small></div></div>
                <div className="cell"><div className="k">Infra</div><div className="v">AWS <small>terraform iac</small></div></div>
                <div className="cell"><div className="k">Pattern</div><div className="v">RAG <small>+ agents</small></div></div>
                <div className="cell"><div className="k">Status</div><div className="v">Beta <small>open access</small></div></div>
              </div>
            </div>

            <div className="ph-right" aria-hidden="true">
              <div className="pwindow big">
                <div className="pbar">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">podium.rogerflores.dev</span>
                </div>
                <div className="pthumb">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="podBg" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#241a14" />
                        <stop offset="1" stopColor="#0e0a08" />
                      </linearGradient>
                    </defs>
                    <rect width="320" height="200" fill="url(#podBg)" />
                    <rect x="0" y="0" width="60" height="200" fill="#1a120c" />
                    <rect x="10" y="14" width="40" height="6" rx="2" fill="#c25a30" />
                    <rect x="10" y="36" width="34" height="4" rx="1" fill="#f4ead0" opacity="0.5" />
                    <rect x="10" y="46" width="38" height="4" rx="1" fill="#f4ead0" opacity="0.4" />
                    <rect x="10" y="56" width="30" height="4" rx="1" fill="#f4ead0" opacity="0.3" />
                    <rect x="80" y="20" width="180" height="8" rx="2" fill="#f4ead0" opacity="0.6" />
                    <rect x="80" y="34" width="120" height="6" rx="2" fill="#f4ead0" opacity="0.4" />
                    <rect x="80" y="60" width="220" height="32" rx="6" fill="#2c2218" stroke="#3a2a1c" />
                    <rect x="92" y="72" width="180" height="4" rx="2" fill="#f4ead0" opacity="0.5" />
                    <rect x="92" y="80" width="140" height="4" rx="2" fill="#f4ead0" opacity="0.4" />
                    <rect x="80" y="106" width="200" height="42" rx="6" fill="#3d2418" stroke="#5a3525" />
                    <rect x="92" y="118" width="160" height="4" rx="2" fill="#f4ead0" opacity="0.7" />
                    <rect x="92" y="126" width="120" height="4" rx="2" fill="#f4ead0" opacity="0.55" />
                    <rect x="92" y="134" width="170" height="4" rx="2" fill="#c25a30" opacity="0.7" />
                    <rect x="80" y="166" width="220" height="20" rx="10" fill="#1a120c" stroke="#3a2a1c" />
                    <rect x="92" y="173" width="100" height="6" rx="2" fill="#f4ead0" opacity="0.4" />
                    <circle cx="288" cy="176" r="6" fill="#c25a30" />
                  </svg>
                </div>
              </div>
            </div>
          </article>

          {/* Bento grid */}
          <div className="bento" data-page="1">

            {/* Longdle */}
            <a className="bcard" href="https://longdle.rogerflores.dev" target="_blank" rel="noopener" data-page="1">
              <div className="pwindow">
                <div className="pbar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="url">longdle.rogerflores.dev</span></div>
                <div className="pthumb">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#1a2818" />
                    <rect x="20" y="18" width="86" height="10" rx="2" fill="#f4ead0" opacity="0.85" />
                    <g><rect x="60" y="48" width="32" height="32" fill="#5e8a48" /><rect x="96" y="48" width="32" height="32" fill="#5e8a48" /><rect x="132" y="48" width="32" height="32" fill="#c39c3a" /><rect x="168" y="48" width="32" height="32" fill="#3a3a3a" /><rect x="204" y="48" width="32" height="32" fill="#5e8a48" /><rect x="60" y="84" width="32" height="32" fill="#5e8a48" /><rect x="96" y="84" width="32" height="32" fill="#5e8a48" /><rect x="132" y="84" width="32" height="32" fill="#5e8a48" /><rect x="168" y="84" width="32" height="32" fill="#5e8a48" /><rect x="204" y="84" width="32" height="32" fill="#5e8a48" /></g>
                    <g fill="#f4ead0" fontFamily="JetBrains Mono,monospace" fontSize="16" textAnchor="middle" fontWeight="500"><text x="76" y="70">L</text><text x="112" y="70">O</text><text x="148" y="70">N</text><text x="184" y="70">G</text><text x="220" y="70">R</text><text x="76" y="106">L</text><text x="112" y="106">O</text><text x="148" y="106">N</text><text x="184" y="106">G</text><text x="220" y="106">D</text></g>
                    <g fill="#3a4a32"><rect x="40" y="150" width="22" height="16" rx="2" /><rect x="64" y="150" width="22" height="16" rx="2" /><rect x="88" y="150" width="22" height="16" rx="2" /><rect x="112" y="150" width="22" height="16" rx="2" /><rect x="136" y="150" width="22" height="16" rx="2" /><rect x="160" y="150" width="22" height="16" rx="2" /><rect x="184" y="150" width="22" height="16" rx="2" /><rect x="208" y="150" width="22" height="16" rx="2" /><rect x="232" y="150" width="22" height="16" rx="2" /><rect x="256" y="150" width="22" height="16" rx="2" /></g>
                  </svg>
                </div>
                <div className="pmeta">
                  <div className="ptitle">Longdle <span className="badge live">Live</span></div>
                  <p className="pblurb">Daily word game. Longer words, fewer guesses, for the patient.</p>
                  <div className="ptags"><span className="ptag">Next.js</span><span className="ptag">Edge</span><span className="ptag">Daily</span></div>
                  <div className="popen"><span>Open</span><span className="arrow">↗</span></div>
                </div>
              </div>
            </a>

            {/* Short */}
            <a className="bcard" href="https://short.rogerflores.dev" target="_blank" rel="noopener" data-page="1">
              <div className="pwindow">
                <div className="pbar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="url">short.rogerflores.dev</span></div>
                <div className="pthumb">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#0e1410" />
                    <rect x="40" y="40" width="240" height="44" rx="6" fill="#1a2418" stroke="#3d5a3a" />
                    <text x="56" y="68" fill="#c25a30" fontFamily="JetBrains Mono,monospace" fontSize="18" fontWeight="500">rf.gg/</text>
                    <text x="116" y="68" fill="#f4ead0" fontFamily="JetBrains Mono,monospace" fontSize="18" fontWeight="500">podium</text>
                    <g stroke="#5e8a48" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M250 56 l8 0 a6 6 0 0 1 0 12 l-4 0" /><path d="M270 68 l-8 0 a6 6 0 0 1 0 -12 l4 0" /></g>
                    <rect x="40" y="106" width="60" height="6" rx="2" fill="#f4ead0" opacity="0.5" />
                    <rect x="40" y="120" width="240" height="3" rx="1" fill="#f4ead0" opacity="0.15" />
                    <rect x="40" y="134" width="40" height="6" rx="2" fill="#f4ead0" opacity="0.4" />
                    <rect x="120" y="134" width="60" height="6" rx="2" fill="#c25a30" opacity="0.7" />
                    <rect x="40" y="150" width="240" height="3" rx="1" fill="#f4ead0" opacity="0.15" />
                    <rect x="40" y="164" width="80" height="6" rx="2" fill="#f4ead0" opacity="0.4" />
                    <rect x="180" y="164" width="40" height="6" rx="2" fill="#5e8a48" opacity="0.7" />
                    <g fill="#3d5a3a"><rect x="220" y="98" width="6" height="14" /><rect x="230" y="92" width="6" height="20" /><rect x="240" y="86" width="6" height="26" /><rect x="250" y="80" width="6" height="32" /><rect x="260" y="74" width="6" height="38" /><rect x="270" y="68" width="6" height="44" /></g>
                  </svg>
                </div>
                <div className="pmeta">
                  <div className="ptitle">Short <span className="badge live">Live</span></div>
                  <p className="pblurb">URL shortener. Vanity slugs, analytics, expiring links.</p>
                  <div className="ptags"><span className="ptag">Workers</span><span className="ptag">KV</span><span className="ptag">Hono</span></div>
                  <div className="popen"><span>Open</span><span className="arrow">↗</span></div>
                </div>
              </div>
            </a>

            {/* Experiments */}
            <a className="bcard" href="https://experiments.rogerflores.dev" target="_blank" rel="noopener" data-page="1">
              <div className="pwindow">
                <div className="pbar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="url">experiments.rogerflores.dev</span></div>
                <div className="pthumb">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#181f15" />
                    <rect x="22" y="18" width="120" height="10" rx="2" fill="#f4ead0" opacity="0.8" />
                    <rect x="22" y="32" width="80" height="6" rx="2" fill="#c25a30" opacity="0.7" />
                    <g>
                      <rect x="22" y="60" width="84" height="56" rx="4" fill="#243824" stroke="#3d5a3a" />
                      <rect x="118" y="60" width="84" height="56" rx="4" fill="#243824" stroke="#3d5a3a" />
                      <rect x="214" y="60" width="84" height="56" rx="4" fill="#243824" stroke="#3d5a3a" strokeDasharray="3 3" />
                      <rect x="22" y="124" width="84" height="56" rx="4" fill="#243824" stroke="#3d5a3a" />
                      <rect x="118" y="124" width="84" height="56" rx="4" fill="#243824" stroke="#3d5a3a" strokeDasharray="3 3" />
                      <rect x="214" y="124" width="84" height="56" rx="4" fill="#1a200f" stroke="#3d5a3a" strokeDasharray="3 3" opacity="0.6" />
                    </g>
                    <g stroke="#c25a30" strokeWidth="1.5" fill="none">
                      <path d="M30 96 Q44 78 58 92 T 98 88" />
                      <path d="M126 96 Q140 80 154 96" />
                      <path d="M30 160 Q50 140 70 156 T 98 152" />
                    </g>
                    <g fill="#f4ead0" opacity="0.65">
                      <rect x="30" y="72" width="32" height="3" rx="1" />
                      <rect x="126" y="72" width="42" height="3" rx="1" />
                      <rect x="222" y="72" width="28" height="3" rx="1" opacity="0.5" />
                      <rect x="30" y="136" width="36" height="3" rx="1" />
                      <rect x="126" y="136" width="24" height="3" rx="1" opacity="0.5" />
                    </g>
                  </svg>
                </div>
                <div className="pmeta">
                  <div className="ptitle">Experiments <span className="badge wip">WIP</span></div>
                  <p className="pblurb">A graveyard and a playground for half-built ideas.</p>
                  <div className="ptags"><span className="ptag">Various</span></div>
                  <div className="popen"><span>Open</span><span className="arrow">↗</span></div>
                </div>
              </div>
            </a>

            {/* Property */}
            <a className="bcard" href="https://property.rogerflores.dev" target="_blank" rel="noopener" data-page="1">
              <div className="pwindow">
                <div className="pbar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="url">property.rogerflores.dev</span></div>
                <div className="pthumb">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#15201c" />
                    <g stroke="#3d5a3a" strokeWidth="1" fill="none" opacity="0.5">
                      <path d="M0 60 L320 50" /><path d="M0 110 L320 130" /><path d="M60 0 L70 200" /><path d="M180 0 L195 200" /><path d="M260 0 L255 200" />
                    </g>
                    <g>
                      <rect x="80" y="70" width="80" height="50" fill="#243824" stroke="#5e7d56" />
                      <rect x="170" y="60" width="60" height="40" fill="#243824" stroke="#5e7d56" />
                      <rect x="170" y="110" width="80" height="50" fill="#3d2418" stroke="#c25a30" />
                      <rect x="80" y="130" width="50" height="40" fill="#243824" stroke="#5e7d56" />
                    </g>
                    <g transform="translate(208 122)">
                      <circle cx="0" cy="0" r="10" fill="#c25a30" />
                      <circle cx="0" cy="0" r="3" fill="#f4ead0" />
                    </g>
                    <rect x="0" y="0" width="60" height="200" fill="#1a2418" opacity="0.95" />
                    <rect x="10" y="20" width="40" height="6" rx="2" fill="#c25a30" opacity="0.8" />
                    <rect x="10" y="36" width="36" height="3" rx="1" fill="#f4ead0" opacity="0.4" />
                    <rect x="10" y="44" width="30" height="3" rx="1" fill="#f4ead0" opacity="0.3" />
                    <rect x="10" y="64" width="40" height="3" rx="1" fill="#f4ead0" opacity="0.4" />
                    <rect x="10" y="72" width="28" height="3" rx="1" fill="#f4ead0" opacity="0.3" />
                    <rect x="10" y="92" width="40" height="3" rx="1" fill="#f4ead0" opacity="0.4" />
                    <rect x="10" y="100" width="32" height="3" rx="1" fill="#f4ead0" opacity="0.3" />
                  </svg>
                </div>
                <div className="pmeta">
                  <div className="ptitle">Property <span className="badge wip">WIP</span></div>
                  <p className="pblurb">Tools and notes around residential property data.</p>
                  <div className="ptags"><span className="ptag">Data</span></div>
                  <div className="popen"><span>Open</span><span className="arrow">↗</span></div>
                </div>
              </div>
            </a>

            {/* More to come */}
            <div className="bcard coming" data-page="1" aria-hidden="true">
              <div className="pwindow">
                <div className="pbar"><span className="dot d" /><span className="dot d" /><span className="dot d" /><span className="url">more.coming.soon</span></div>
                <div className="pthumb">
                  <div className="dots-three" aria-hidden="true"><span /><span /><span /></div>
                </div>
                <div className="pmeta">
                  <div className="ptitle">More to come</div>
                  <p className="pblurb">A few things still in the workshop. Ask me if you&apos;re curious.</p>
                  <div className="ptags"><span className="ptag muted">·</span><span className="ptag muted">·</span><span className="ptag muted">·</span></div>
                  <div className="popen muted"><span>Soon</span></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════ CHAT (calendar) ═══════════ */}
        <section className="calendar" id="chat">
          <div className="calendar-grid">
            <div>
              <span className="seclabel">Book 15 minutes</span>
              <h2>Want to <em>chat</em>? Pick a green day.</h2>
              <p>
                I&apos;m always happy to chat about anything! You can reach me at{' '}
                <a href="mailto:rflores3113@gmail.com" style={{ color: 'var(--rust)', borderBottom: '1px solid var(--rust)', paddingBottom: '1px' }}>rflores3113@gmail.com</a>,
                or book a 15-minute call on my calendar below.
              </p>
              <div className="cta-row">
                <a className="book-cta primary" href="https://cal.com/rogerflores/15min" target="_blank" rel="noopener">
                  Open booking page
                  <span className="arrow">↗</span>
                </a>
                <a className="book-cta secondary" href="mailto:rflores3113@gmail.com">
                  Email me
                  <span className="arrow">→</span>
                </a>
              </div>
              <div className="book-note" />
            </div>

            <CalendarWidget />
          </div>
        </section>

        {/* ═══════════ CLOSER ═══════════ */}
        <section className="cta closer">
          <div className="seclabel" style={{ color: 'var(--rust)' }}>Open to work</div>
          <div className="cta-grid">
            <div>
              <h4>Open to <em>AI engineering</em> and <em>founding</em> roles.</h4>
              <p>
                Senior IC, founding engineer, or AI-focused. Bay Area or
                remote. Happy to chat even if the timing isn&apos;t right.
              </p>
              <a className="mail-btn" href="mailto:rflores3113@gmail.com">
                rflores3113@gmail.com
                <span className="arrow">→</span>
                <span className="kbd">⌘ K</span>
              </a>
              <div className="cta-also">
                or grab the <a href="https://rogerflores.dev/rflores_resume.pdf">resume (pdf)</a> ·{' '}
                <a href="https://www.linkedin.com/in/roger-flores-3113-nu/">LinkedIn</a>
              </div>
            </div>

            <div className="cta-grid-cells">
              <div className="cell"><div className="k">Status</div><div className="v">Open · May 2026</div></div>
              <div className="cell"><div className="k">Location</div><div className="v">SF Bay Area</div></div>
              <div className="cell"><div className="k">Looking for</div><div className="v">AI eng · founding · senior</div></div>
              <div className="cell"><div className="k">Reply within</div><div className="v">~24h</div></div>
            </div>
          </div>
        </section>

      </div>

      {/* ─── FOOTER ─── */}
      <footer>
        <div>© 2026 Roger Flores · rogerflores.dev/boring</div>
        <div className="socials">
          <a href="https://github.com/RogerFlores3113" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/roger-flores-3113-nu/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a href="mailto:rflores3113@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
              <rect x="3" y="5" width="18" height="14" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>
        </div>
      </footer>

      <BoringClient />
    </div>
  )
}
