'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

/* ── Game version link — clears boring preference before navigating ── */
export function GameVersionLink() {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    try { localStorage.setItem('rflor-site-mode', 'game') } catch {}
    window.location.href = '/'
  }
  return (
    <a className="gameback" href="/" onClick={handleClick} title="Go to the game version">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
      <span>game version</span>
    </a>
  )
}

/* ── "Still collecting" modal for coming-soon hobby pages ── */
export function ComingSoonLink({ children, label }: { children: React.ReactNode; label: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (open) dlg.showModal()
    else dlg.close()
  }, [open])

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    const onClose = () => setOpen(false)
    dlg.addEventListener('close', onClose)
    return () => dlg.removeEventListener('close', onClose)
  }, [mounted])

  const dialog = (
    <dialog ref={dialogRef} className="coming-dialog" onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="coming-dialog-inner">
        <h3 className="coming-dialog-title">Still working on it!</h3>
        <p className="coming-dialog-body">Check back soon!</p>
        <button type="button" className="coming-dialog-close" onClick={() => setOpen(false)}>
          Got it
        </button>
      </div>
    </dialog>
  )

  return (
    <>
      <button
        type="button"
        className="prose-coming-link"
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      {mounted ? createPortal(dialog, document.body) : null}
    </>
  )
}

const JOKES: [string, string][] = [
  ['I tried to make a joke about Terraform.', "I just can't figure out when it'd apply."],
  ['Why are climbers terrible at presentations?', 'They keep changing their pitch.'],
  ['How do you debug a customer call?', 'Add print statements. Politely.'],
  ['Why do AI engineers love mountains?', 'Steep gradients.'],
  ['I asked a pilot for life advice.', 'They told me to wing it D:'],
  ["What's great about orcas?", 'They have a killer whale impression.'],
  ['A man was sentenced for bag theft in just 3 minutes.', 'The judge called it a brief case.'],
  ['What do you call a bird with a bad cough?', 'A phlegmingo.'],
  ["What do you call a boomerang that doesn't come back?", 'A stick.'],
  ['I got kidnapped by a group of mimes.', 'They did unspeakable things.'],
  ['What do you call a magician who loses his magic?', 'ian.'],
]

/* ── Sticky rail + parallax + Cmd+K + smooth-scroll ── */
export function BoringClient() {
  useEffect(() => {
    const rail = document.querySelector('.rail') as HTMLElement | null
    const hero = document.querySelector('.hero') as HTMLElement | null
    if (rail && hero) {
      const onScroll = () =>
        rail.classList.toggle('scrolled', hero.getBoundingClientRect().bottom < 80)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hero = document.querySelector('.hero') as HTMLElement | null
    const layers = document.querySelectorAll<HTMLElement>('.atmos [data-parallax]')
    if (!layers.length || !hero) return

    let scheduled = false
    function update() {
      scheduled = false
      const sy = window.scrollY
      const heroH = hero!.offsetHeight || window.innerHeight
      const y = Math.min(sy, heroH * 1.2)
      for (let i = 0; i < layers.length; i++) {
        const rate = parseFloat(layers[i].dataset.parallax || '0') || 0
        layers[i].style.transform = `translate3d(0, ${(y * rate).toFixed(2)}px, 0)`
      }
    }
    function onScroll() {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      const railEl = document.querySelector('.rail') as HTMLElement | null
      const railH = railEl?.offsetHeight || 0
      const y = target.getBoundingClientRect().top + window.scrollY - railH - 12
      window.scrollTo({ top: y, behavior: 'smooth' })
      history.replaceState(null, '', '#' + id)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}

/* ── Dad-joke card ── */
export function JokeCard() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setIdx(Math.floor(Math.random() * JOKES.length))
  }, [])

  const rotate = useCallback(() => {
    setFading(true)
    setTimeout(() => {
      setIdx(i => (i + 1) % JOKES.length)
      setFading(false)
    }, 220)
  }, [])

  const [setup, punchline] = JOKES[idx]

  return (
    <div
      className={`joke${fading ? ' is-fading' : ''}`}
      role="button"
      tabIndex={0}
      title="Click for another"
      onClick={rotate}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rotate() } }}
    >
      <span className="quote-mark" aria-hidden="true">&ldquo;</span>
      <span className="setup">{setup}</span>
      <span className="punchline">{punchline}</span>
      <span className="joke-meta">tap for another</span>
    </div>
  )
}

/* ── Mini booking calendar ── */
const DOWS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const FULL_DOWS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const BOOKING_URL = 'https://cal.com/rogerflores/15min?date={date}'

type LoadState = 'idle' | 'loading' | 'done' | 'error'

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function dayState(
  viewDate: Date,
  d: number,
  daySlots: Record<string, string[]>,
  loadState: LoadState,
): string | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dt = new Date(viewDate.getFullYear(), viewDate.getMonth(), d)
  if (dt < today) return 'past'
  if (dt.getTime() === today.getTime()) return 'today'
  const dow = dt.getDay()
  if (dow === 0 || dow === 6) return null
  if (loadState !== 'done') return 'loading'
  const key = isoDate(viewDate.getFullYear(), viewDate.getMonth(), d)
  return key in daySlots ? 'avail' : 'full'
}

function formatSlot(slot: string): string {
  const [h, m] = slot.split(':')
  return `${parseInt(h)}:${m}`
}

function formatSlotDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric',
  })
}

export function CalendarWidget() {
  const [mounted, setMounted] = useState(false)
  const [viewDate, setViewDate] = useState<Date>(() => {
    const d = new Date(); d.setDate(1); return d
  })
  const [tz, setTz] = useState('your local tz')
  const [daySlots, setDaySlots] = useState<Record<string, string[]>>({})
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    setMounted(true)
    try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone) } catch {}
  }, [])

  useEffect(() => {
    if (!mounted) return
    const y = viewDate.getFullYear()
    const m = viewDate.getMonth()
    setLoadState('loading')
    fetch(`/api/availability?year=${y}&month=${m}`)
      .then(r => r.json())
      .then(data => { setDaySlots(data.days ?? {}); setLoadState('done') })
      .catch(() => setLoadState('error'))
  }, [mounted, viewDate])

  const showPanel = useCallback((dateKey: string) => {
    clearTimeout(hideTimer.current)
    setHoveredDate(dateKey)
    setPanelOpen(true)
  }, [])

  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => { setPanelOpen(false); setHoveredDate(null) }, 140)
  }, [])

  const cancelHide = useCallback(() => clearTimeout(hideTimer.current), [])

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const goMonth = useCallback((delta: number) => {
    setViewDate(prev => {
      const next = new Date(prev); next.setMonth(next.getMonth() + delta); return next
    })
  }, [])

  const openBooking = useCallback((dateKey: string) => {
    window.open(BOOKING_URL.replace('{date}', dateKey), '_blank', 'noopener')
  }, [])

  const y = viewDate.getFullYear()
  const m = viewDate.getMonth()
  const monthName = new Date(y, m, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const firstDow = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()

  const cells: React.ReactNode[] = []
  DOWS.forEach((dow, i) => cells.push(<div key={`dow-${i}`} className="dow">{dow}</div>))
  for (let i = 0; i < firstDow; i++) cells.push(<div key={`e-${i}`} className="day empty" />)
  for (let d = 1; d <= daysInMonth; d++) {
    const state = mounted ? dayState(viewDate, d, daySlots, loadState) : null
    const cls = state ? `day ${state}` : 'day'
    const dt = new Date(y, m, d)
    const aria = `${FULL_DOWS[dt.getDay()]} ${monthName.split(' ')[0]} ${d}`
    const dateKey = isoDate(y, m, d)
    if (state === 'avail') {
      cells.push(
        <button
          type="button"
          key={d}
          className={cls}
          data-day={d}
          aria-label={`Book ${aria}, 15 min available`}
          onMouseEnter={() => showPanel(dateKey)}
          onClick={() => openBooking(dateKey)}
        >{d}</button>
      )
    } else {
      cells.push(<div key={d} className={cls} aria-label={aria}>{d}</div>)
    }
  }

  const slots = hoveredDate ? (daySlots[hoveredDate] ?? []) : []

  return (
    <div className="cal-outer" onMouseLeave={scheduleHide}>
      {/* Slots panel — slides out from behind the calendar to the left */}
      <div
        className={`cal-slots-panel${panelOpen ? ' is-open' : ''}`}
        onMouseEnter={cancelHide}
        onMouseLeave={scheduleHide}
        aria-hidden={!panelOpen}
      >
        {hoveredDate && (
          <>
            <div className="csp-date">{formatSlotDate(hoveredDate)}</div>
            <div className="csp-grid">
              {slots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  className="csp-slot"
                  onClick={() => openBooking(hoveredDate)}
                  aria-label={`Book ${slot} PST`}
                >
                  {formatSlot(slot)}
                </button>
              ))}
            </div>
            <div className="csp-foot">PST · 15 min</div>
          </>
        )}
      </div>

      <div className="cal-mini" aria-label="Booking calendar">
        <div className="cal-head">
          <span className="month">{mounted ? monthName : '…'}</span>
          <div className="nav">
            <button className="prev" aria-label="Previous month" onClick={() => goMonth(-1)}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M6 1L3 4.5L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>
            <button className="next" aria-label="Next month" onClick={() => goMonth(1)}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M3 1L6 4.5L3 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </div>
        <div className="cal-grid">{cells}</div>
        <div className="cal-foot">
          <div className="legend">
            <span><span className="sw avail" />Open</span>
            <span><span className="sw full" />Full</span>
            <span><span className="sw tz" /><span>{tz}</span></span>
          </div>
          <span>15 min · ☎ or video</span>
        </div>
      </div>
    </div>
  )
}
