// Tiny synthesized UI sounds + haptics. No audio assets: everything is
// WebAudio oscillators, so it weighs nothing and never 404s.
// Muting persists in localStorage. navigator.vibrate is Android-only;
// iOS Safari has no web vibration API, so haptics are best-effort.

const MUTE_KEY = "minamoto_muted";

export const isMuted = (): boolean =>
    typeof window !== "undefined" && localStorage.getItem(MUTE_KEY) === "1";

export const setMuted = (muted: boolean): void => {
    if (muted) localStorage.setItem(MUTE_KEY, "1");
    else localStorage.removeItem(MUTE_KEY);
};

let ctx: AudioContext | null = null;
const audio = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    try {
        ctx ??= new AudioContext();
        if (ctx.state === "suspended") void ctx.resume();
        return ctx;
    } catch {
        return null;
    }
};

function tone(freq: number, ms: number, type: OscillatorType, gain: number, delayMs = 0) {
    const ac = audio();
    if (!ac) return;
    const t0 = ac.currentTime + delayMs / 1000;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);
    osc.connect(g).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + ms / 1000);
}

export const haptic = (ms = 10): void => {
    if (isMuted()) return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms);
};

export const sfx = {
    /** カチッ — a slice landing. */
    snap(): void {
        if (isMuted()) return;
        tone(1300, 45, "square", 0.045);
        tone(2600, 30, "sine", 0.03);
        haptic(10);
    },
    /** ポン — success (correct answer, real word). */
    success(): void {
        if (isMuted()) return;
        tone(660, 90, "sine", 0.06);
        tone(990, 140, "sine", 0.05, 60);
        haptic(15);
    },
    /** ゴールド — plausible coinage (判定②). */
    coinage(): void {
        if (isMuted()) return;
        tone(587, 90, "sine", 0.05);
        tone(880, 160, "sine", 0.045, 70);
        haptic(15);
    },
    /** ブッ — a miss. Soft, not punishing. */
    wrong(): void {
        if (isMuted()) return;
        tone(180, 110, "triangle", 0.06);
        haptic(25);
    },
};
