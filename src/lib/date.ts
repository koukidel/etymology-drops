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
