import * as Tone from 'tone';

let synth: Tone.PolySynth | null = null;
let membrane: Tone.MembraneSynth | null = null;

export const initAudio = async () => {
    if (typeof window === "undefined") return;
    await Tone.start();

    if (!synth) {
        synth = new Tone.PolySynth(Tone.Synth).toDestination();
        synth.volume.value = -10;
    }

    if (!membrane) {
        membrane = new Tone.MembraneSynth().toDestination();
    }
};

export const playSnap = async () => {
    if (!synth) await initAudio();
    // Light click
    synth?.triggerAttackRelease("C6", "32n");
};

export const playSuccess = async () => {
    if (!synth) await initAudio();
    // C5 Major Chord
    synth?.triggerAttackRelease(["C5", "E5", "G5"], "8n");
};

export const playError = async () => {
    if (!membrane) await initAudio();
    // Low thud
    membrane?.triggerAttackRelease("C2", "8n");
};

export const playLevelUp = async () => {
    if (!synth) await initAudio();
    // Ascending arpeggio
    const now = Tone.now();
    synth?.triggerAttackRelease("C4", "8n", now);
    synth?.triggerAttackRelease("E4", "8n", now + 0.1);
    synth?.triggerAttackRelease("G4", "8n", now + 0.2);
    synth?.triggerAttackRelease("C5", "8n", now + 0.3);
};

export const playPop = async () => {
    if (!synth) await initAudio();
    synth?.triggerAttackRelease("G5", "32n");
};
