import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const revalidate = 300

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID ?? 'primary'
const TZ = 'America/Los_Angeles'
const SLOT_MIN = 15
const WINDOW_START = 8  // 8am LA
const WINDOW_END = 12   // 12pm LA

// Convert a local LA time on dateStr to a UTC ms timestamp, handling DST.
function laToUTCMs(dateStr: string, laHour: number, laMin: number): number {
  // Estimate using PST (-8h), then verify and correct for DST.
  let utcMs = Date.parse(
    `${dateStr}T${String(laHour + 8).padStart(2, '0')}:${String(laMin).padStart(2, '0')}:00Z`
  )
  const actualLaH = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, hour: 'numeric', hour12: false,
    }).format(new Date(utcMs))
  )
  const diff = laHour - actualLaH
  if (diff !== 0) utcMs += diff * 3_600_000
  return utcMs
}

// Returns HH:MM strings (LA time) for free 15-min slots in the 8am–12pm window.
function getFreeSlots(
  dateStr: string,
  busy: { start: string; end: string }[]
): string[] {
  const slots: string[] = []
  for (let h = WINDOW_START; h < WINDOW_END; h++) {
    for (let m = 0; m < 60; m += SLOT_MIN) {
      const slotStart = laToUTCMs(dateStr, h, m)
      const slotEnd = slotStart + SLOT_MIN * 60_000
      const blocked = busy.some(
        b => new Date(b.start).getTime() < slotEnd && new Date(b.end).getTime() > slotStart
      )
      if (!blocked) {
        slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
      }
    }
  }
  return slots
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const year = parseInt(searchParams.get('year') ?? '')
  const month = parseInt(searchParams.get('month') ?? '') // 0-indexed

  if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
  }

  const now = new Date()
  if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth())) {
    return NextResponse.json({ days: {} })
  }

  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!credentials) {
    return NextResponse.json({ error: 'Calendar not configured' }, { status: 503 })
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    })
    const calendar = google.calendar({ version: 'v3', auth })

    const timeMin = new Date(year, month, 1).toISOString()
    const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString()

    const res = await calendar.freebusy.query({
      requestBody: { timeMin, timeMax, timeZone: TZ, items: [{ id: CALENDAR_ID }] },
    })

    const busy = (res.data.calendars?.[CALENDAR_ID]?.busy ?? []) as {
      start: string; end: string
    }[]

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: Record<string, string[]> = {}

    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d)
      if (dt < today) continue
      if (dt.getDay() === 0 || dt.getDay() === 6) continue
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const slots = getFreeSlots(dateStr, busy)
      if (slots.length > 0) days[dateStr] = slots
    }

    return NextResponse.json({ days })
  } catch (err) {
    console.error('[availability]', err)
    return NextResponse.json({ error: 'Calendar fetch failed' }, { status: 500 })
  }
}
