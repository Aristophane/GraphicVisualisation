import { GammesUtilities } from './gammesUtilities';
import * as Tone from 'tone';
import { ISynth } from './ISynth';
import { Melody } from '../model/melody';
import { Note } from '../model/note';

export class BassSynth implements ISynth{

    lfo;
    synth;
    synthType;

    on(){
      this.synth = new Tone.Synth({
        "oscillator": {
          "type": "sine",
          "harmonicity": 0.8,
          "modulationType": "sine"
        },
        "envelope": {
          "attackCurve": 'exponential',
          "attack": 0.1,
          "decay": 0.2,
          "sustain": 0.3,
          "release": 0.5
        },
        "portamento": 0.01
      });
      var vol = new Tone.Volume(-20);
      var filter = new Tone.Filter("500", "lowpass");
      this.synth.chain(filter, vol, Tone.Master);
    }

    off(){
    }

    play(note: string)
    { 
      console.log(note);
      Tone.Transport.schedule((time) => { this.synth.triggerAttackRelease(note, 0.2); }, "0:0:2");
      Tone.Transport.schedule((time) => { this.synth.triggerAttackRelease(note, 0.2); }, "0:1:0");
      
    }

    playMelody(startingNotePosition: number, melody: Melody, gamme: Note[]){
      melody.notes.forEach((element) => {
        var note = GammesUtilities.getEnglishNoteName(gamme, startingNotePosition + element.positionInScale, 3);
        console.log(note);
        Tone.Transport.schedule((time) => { this.synth.triggerAttackRelease(note, element.duration)}, element.startTime);
      });
    }

    
}




