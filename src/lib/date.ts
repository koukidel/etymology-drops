// Local-timezone date helpers.
//
// Never use toISOString() for "today": it renders UTC, so for Japanese users
// the date (and with it streaks, daily review, and the daily challenge)
// would roll over at 09:00 JST instead of midnight.

/** YYYY-MM-DD in the user's local timezone. */
export const localDate = (d: Date = new Date()): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
};

/** Yesterday's YYYY-MM-DD in the user's local timezone. */
export const localYesterday = (from: Date = new Date()): string => {
    const d = new Date(from);
    d.setDate(d.getDate() - 1);
    return localDate(d);
};

/** N days ago as YYYY-MM-DD in the user's local timezone. */
export const localDaysAgo = (n: number, from: Date = new Date()): string => {
    const d = new Date(from);
    d.setDate(d.getDate() - n);
    return localDate(d);
};

/** Whole days between two YYYY-MM-DD local dates (b - a). */
export const daysBetween = (a: string, b: string): number => {
    const [ay, am, ad] = a.split("-").map(Number);
    const [by, bm, bd] = b.split("-").map(Number);
    return Math.round((new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime()) / 86_400_000);
};
