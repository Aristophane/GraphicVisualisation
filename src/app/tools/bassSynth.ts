import * as Tone from 'tone';
import { ISynth } from './ISynth';

export class BassSynth implements ISynth{

    lfo;
    synth;
    synthType;
    pitchValue = "4";

    on(){
      this.synth = new Tone.Synth({
        "oscillator": {
          "type": "sine",
          "harmonicity": 0.8,
          "modulationType": "sine"
        },
        "envelope": {
          "attackCurve": 'exponential',
          "attack": 0.2,
          "decay": 0.2,
          "sustain": 0.1,
          "release": 0.1
        },
        "portamento": 0.1
      });
      var vol = new Tone.Volume(-20);
      var filter = new Tone.Filter("1300", "lowpass");
      this.synth.chain(filter, vol, Tone.Master);
    }

    off(){
      Tone.Transport.stop();
    }

    play(note: string)
    {
      console.log(note);
      // Tone.Transport.scheduleRepeat(function(time){()=>
      //   this.synth.triggerAttack(this.note + this.pitchValue, time);
      // }, "8n");
      Tone.Transport.start();
      this.synth.triggerAttackRelease(note + this.pitchValue);

      // this.synth.triggerAttackRelease(note + this.pitchValue);
      // this.synth.triggerAttackRelease(note + this.pitchValue+1, 2,3);
      // this.synth.triggerAttackRelease(note + this.pitchValue+2,2, 5);
      // this.synth.triggerAttackRelease(note + this.pitchValue+1,15, 7);
    }

    
}




