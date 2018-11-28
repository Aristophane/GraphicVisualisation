import * as Tone from 'tone';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

export class Synth{

    filter;

    public filterFrequency: number = 500;

    constructor (){
    }

    playNote(note: string)
    {
        Tone.Transport.start();
        var synth = new Tone.Synth({
            "oscillator": {
              "type": "amtriangle",
              "harmonicity": 0.5,
              "modulationType": "sine"
            },
            "envelope": {
              "attackCurve": 'exponential',
              "attack": 0.05,
              "decay": 0.2,
              "sustain": 0.2,
              "release": 1.5,
            },
            "portamento": 0.05
          });
          this.arpegiator(synth, 80, note);
          

    }

     arpegiator(synth, rise: number, note: string){
      for(var i = 0; i < rise + 2; i++){
          
        this.filter = new Tone.Filter(this.filterFrequency + 200*i, "lowpass");
        synth.connect(this.filter);
        this.filter.toMaster();
        synth.triggerAttackRelease(note + "2", 0.5, i/4);
      }
    }
}


