import * as Tone from 'tone';
import { newLoop } from './loop';

export class Synth{

    filter;
    lfo;

    public filterFrequency: number = 500;
    public lfoFrequency : number = 1;

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
        });
        const filter = new Tone.Filter(100, "lowpass");
        this.lfo = new Tone.LFO(2, 500, 4000);
        // this.frequencySet(this.lfoFrequency);
        this.lfo.connect(filter.frequency);
        this.lfo.frequency.linearRampToValueAtTime(8,30);
        this.lfo.start();
        synth.connect(filter);
        filter.toMaster();
        synth.triggerAttackRelease("C2", 40, 0.2);
    }

     repeater(synth, repeat: number, note: string, division: number, start: number){
       for (var i = 0; i < repeat; i++){
         synth.triggerAttackRelease(note, 0.1, start + i / division);
      }
    }

      frequencySet(freq: number){
        this.lfo.stop();
          this.lfo.frequency.value = freq;
          this.lfo.start();
      }
}




