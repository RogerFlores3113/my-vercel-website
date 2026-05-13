import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roger Flores · Climbing',
}

export default function Climbing() {
  return (
    <div className="hobby-page">
      <header>
        <a className="back" href="/boring">
          <span className="arrow">←</span>
          <span>back to home</span>
        </a>
        <span className="crumb">rogerflores.dev / boring / climbing</span>
      </header>

      <main>
        <span className="tag">Climbing notes</span>
        <h1>Rocks, indoors and out.</h1>
        <p>A logbook in slow assembly. Project boulders, send photos, the one I keep falling off of.</p>
        <p>I climb because the wall doesn&apos;t care about your laptop, your inbox, or your standing desk. You either pull or you don&apos;t.</p>
        <div className="placeholder">
          <b>Photos coming soon.</b>
          <p>I have a folder. I will sort it. Eventually.</p>
        </div>
      </main>
    </div>
  )
}
