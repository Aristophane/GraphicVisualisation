import * as Tone from 'tone';

export interface ISynth{
    on();
    off();
    synth: any;
    play(note: string);
    // setFilterFrequency();
    // setLFORate();
}