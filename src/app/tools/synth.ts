import * as Tone from 'tone';
import { newLoop } from './loop';

export class Synth{

    filter;

    public filterFrequency: number = 500;

    constructor (){
    }

    mute(value: boolean){
        Tone.Master.mute = value;
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
<<<<<<< HEAD
        });
        const filter = new Tone.Filter(100, "lowpass");
        var lfo = new Tone.LFO("4n", 400, 4000);
        lfo.connect(filter.frequency);
        synth.connect(filter);
        filter.toMaster();
        synth.triggerAttackRelease("C4", 40, 0.2);
=======
        }).toMaster();
        synth.triggerAttackRelease("C2", 40, 0.2);
>>>>>>> cdfd9bd5d61de7478c4053981c78f3bc7106b9b5
    }

     repeater(synth, repeat: number, note: string, division: number, start: number){
       for (var i = 0; i < repeat; i++){
         synth.triggerAttackRelease(note, 0.1, start + i / division);
      }
    }
}




