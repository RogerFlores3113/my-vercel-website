import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roger Flores · Board games',
}

export default function Games() {
  return (
    <div className="hobby-page">
      <header>
        <a className="back" href="/boring">
          <span className="arrow">←</span>
          <span>back to home</span>
        </a>
        <span className="crumb">rogerflores.dev / boring / games</span>
      </header>

      <main>
        <span className="tag">Board games</span>
        <h1>I lose. A lot. <em>Happily.</em></h1>
        <p>I tend toward heavy euros, asymmetric games, and anything with a deduction layer. Long sessions, good snacks, friends willing to forgive a bad opening.</p>
        <div className="placeholder">
          <b>Shelf coming.</b>
          <p>A list of what I play and what I want to. Pre-orders and all.</p>
        </div>
      </main>
    </div>
  )
}
