import * as Tone from 'tone';

export const newLoop = (synth: any, frequency: any) => new Tone.Loop((time) => {
    const filter = new Tone.Filter(frequency + 200, "lowpass");
    synth.connect(filter);
    filter.toMaster();
    synth.triggerAttackRelease("C2", "8n", time);
}, "4n");