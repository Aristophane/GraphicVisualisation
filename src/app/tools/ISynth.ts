import { Melody } from './../model/melody';
import { Note } from '../model/note';

export interface ISynth{
    on();
    off();
    synth: any;
    play(note: string);
    playMelody(startingNotePosition: number, melody: Melody, gamme: Note[]);
}