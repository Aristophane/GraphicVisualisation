import { MelodyNote } from './melodyNote';

export class Melody{
    notes: Array<MelodyNote>;

    constructor()
    {
        this.notes = new Array<MelodyNote>();
    }

    revertMelodyNotes()
    {
        var newMelody = new Melody();
        this.notes.forEach((note) => {
            var invertedNote = new MelodyNote(note);
            invertedNote.positionInScale = (-1) * invertedNote.positionInScale;
            newMelody.notes.push(invertedNote);
        });
        return newMelody;
    }
}