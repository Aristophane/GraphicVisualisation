import { Note } from './note';
import { MelodyNote } from './melodyNote';

export class Melody{
    notes: Array<MelodyNote>;

    constructor()
    {
        this.notes = new Array<MelodyNote>();
    }

    multiplyMelodyNotes(factor: number, scale: Note[])
    {
        var newMelody = new Melody();
        this.notes.forEach((note) => {
            var invertedNote = new MelodyNote(note);
            invertedNote.positionInScale = factor * invertedNote.positionInScale % scale.length;
            newMelody.notes.push(invertedNote);
        });
        return newMelody;
    }

    powerMelodyNotes(factor: number, scale: Note[]) {
        var newMelody = new Melody();
        this.notes.forEach((note) => {
            var invertedNote = new MelodyNote(note);
            invertedNote.positionInScale = Math.pow(invertedNote.positionInScale, factor) % scale.length;
            newMelody.notes.push(invertedNote);
        });
        return newMelody;
    }

    invertMelodyOrder()
    {
        var newMelody = new Melody();
        for(var i = 0; i < this.notes.length ; i++)
        {
            var newNote = new MelodyNote(this.notes[i]);
            newNote.positionInScale = this.notes[this.notes.length - 1 - i].positionInScale;
            newMelody.notes.push(newNote);
        }
        return newMelody;
    }
}