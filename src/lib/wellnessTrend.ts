/**
 * Fabricated 12-week wellness-index trend for the Overview page's line
 * chart. There is no historical time-series in the demo's static data (a
 * single point-in-time snapshot per worker), so this generates a plausible
 * lead-up to today's real average — deterministic (seeded, not Math.random)
 * so the chart looks the same across reloads and screenshots.
 */
export interface WellnessTrendPoint {
  label: string
  index: number
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** `currentIndex` is the real, current average wellness index (0-100) — the trend is built backwards from it so the last point always matches today's actual data. */
export function buildWellnessTrend(currentIndex: number, weeks = 12): WellnessTrendPoint[] {
  const rand = mulberry32(2026_08_25)
  // Walk backwards from today, each earlier week offset by a small random
  // step, then normalize so the trend still ends exactly on currentIndex.
  const raw: number[] = [currentIndex]
  for (let i = 1; i < weeks; i++) {
    const step = (rand() - 0.45) * 4.5 // slight net-negative drift going backwards = net-positive coming forwards
    raw.push(Math.max(0, Math.min(100, raw[i - 1] + step)))
  }
  raw.reverse()

  return raw.map((value, i) => ({
    label: `W${i + 1}`,
    index: Math.round(value),
  }))
}
