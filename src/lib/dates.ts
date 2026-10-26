export type RangeKey = "7d" | "30d" | "90d" | "all";

export function localToday(offsetMin: number): string {
  return localDate(new Date().toISOString(), offsetMin);
}

export function localDate(iso: string, offsetMin: number): string {
  const shifted = new Date(new Date(iso).getTime() - offsetMin * 60_000);
  return shifted.toISOString().slice(0, 10);
}

export function addIsoDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function startOfWeek(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
  const weekday = date.getUTCDay();
  const delta = weekday === 0 ? -6 : 1 - weekday;
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

export function streakFromDates(dates: string[], today: string): number {
  const set = new Set(dates);
  let cursor = today;
  if (!set.has(cursor)) {
    cursor = addIsoDays(today, -1);
    if (!set.has(cursor)) return 0;
  }
  let count = 0;
  while (set.has(cursor)) {
    count += 1;
    cursor = addIsoDays(cursor, -1);
  }
  return count;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function weekday(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
  return WEEKDAYS[date.getUTCDay()] ?? "";
}

export type Bucket = { label: string; workouts: number; minutes: number; calories: number };

export function buildBuckets(
  range: RangeKey,
  rows: { at: string; durationSec: number; calories: number }[],
  offsetMin: number,
): Bucket[] {
  const today = localToday(offsetMin);
  const mapped = rows.map((row) => ({
    day: localDate(row.at, offsetMin),
    minutes: Math.round(row.durationSec / 60),
    calories: row.calories,
  }));

  if (range === "7d" || range === "30d") {
    const span = range === "7d" ? 7 : 30;
    const buckets: Bucket[] = [];
    for (let i = span - 1; i >= 0; i -= 1) {
      const day = addIsoDays(today, -i);
      const hits = mapped.filter((row) => row.day === day);
      buckets.push({
        label: range === "7d" ? weekday(day) : day.slice(5),
        workouts: hits.length,
        minutes: hits.reduce((sum, row) => sum + row.minutes, 0),
        calories: hits.reduce((sum, row) => sum + row.calories, 0),
      });
    }
    return buckets;
  }

  if (range === "90d") {
    const buckets: Bucket[] = [];
    for (let i = 12; i >= 0; i -= 1) {
      const end = addIsoDays(today, -i * 7);
      const start = addIsoDays(end, -6);
      const hits = mapped.filter((row) => row.day >= start && row.day <= end);
      buckets.push({
        label: start.slice(5),
        workouts: hits.length,
        minutes: hits.reduce((sum, row) => sum + row.minutes, 0),
        calories: hits.reduce((sum, row) => sum + row.calories, 0),
      });
    }
    return buckets;
  }

  const byMonth = new Map<string, Bucket>();
  for (const row of mapped) {
    const key = row.day.slice(0, 7);
    const bucket = byMonth.get(key) ?? { label: key, workouts: 0, minutes: 0, calories: 0 };
    bucket.workouts += 1;
    bucket.minutes += row.minutes;
    bucket.calories += row.calories;
    byMonth.set(key, bucket);
  }
  return [...byMonth.values()].slice(-12);
}
