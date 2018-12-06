import * as Tone from 'tone';
import { ISynth } from './ISynth';

export class MellowSynth implements ISynth{

    lfo;
    synth;
    synthType;
    pitchValue = "4";

    on(){
    this.synth = new Tone.Synth({
      "oscillator": {
        "type": "square",
        "harmonicity": 0.1,
        "modulationType": "sine"
      },
      "envelope": {
        "attackCurve": 'exponential',
        "attack": 0.1,
        "decay": 1,
        "sustain": 0.1,
        "release": 0.1
      },
      "portamento": 0
    });
    var vol = new Tone.Volume(-30);
    var filter = new Tone.Filter("5000", "lowpass");
    this.synth.chain(filter, vol, Tone.Master);
    this.pitchValue = "2";
    this.synth.on();
    }

    off(){
      Tone.Transport.stop();
    }

    play(note: string)
    {
      console.log(note);
      this.synth.triggerAttackRelease(note + this.pitchValue, 50);
    }

    
}




