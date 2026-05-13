import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roger Flores · Trails',
}

export default function Trails() {
  return (
    <div className="hobby-page">
      <header>
        <a className="back" href="/boring">
          <span className="arrow">←</span>
          <span>back to home</span>
        </a>
        <span className="crumb">rogerflores.dev / boring / trails</span>
      </header>

      <main>
        <span className="tag">Bay Area trails</span>
        <h1>Walks worth repeating.</h1>
        <p>A short list of trails I keep coming back to, mostly in the East Bay and on the Peninsula. Some for the view, some for the legs, some because they&apos;re quiet on Wednesdays.</p>
        <div className="placeholder">
          <b>Map embed pending.</b>
          <p>AllTrails list or a hand-rolled map. Whichever I get to first.</p>
        </div>
      </main>
    </div>
  )
}
