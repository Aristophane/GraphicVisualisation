import * as Tone from 'tone';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { newLoop } from './loop';

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
              "attack": 0.01,
              "decay": 0.2,
              "sustain": 0.1,
              "release": 0.1,
            },
            "portamento": 0.01
        });

        var loop = newLoop(synth, this.filterFrequency);
    }

     repeater(synth, repeat: number, note: string, division: number, start: number){
       for (var i = 0; i < repeat; i++){
         synth.triggerAttackRelease(note, 0.1, start + i / division);
      }
    }
}




