import * as Tone from 'tone';

export class Synth{

    filter;
    lfo;
    synth;

    on(){
      this.synth = new Tone.Synth({
        "oscillator": {
          "type": "square",
          "harmonicity": 0.1,
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
      var vol = new Tone.Volume(-35);
      this.filter = new Tone.Filter("3000", "lowpass");
      // this.synth.connect(this.filter).toMaster();
      this.synth.chain(this.filter ,vol, Tone.Master);

      Tone.Transport.start();
    }

    mute(value: boolean){
        Tone.Master.mute = value;
    }

    playNote(note: string)
    {
        this.synth.triggerAttackRelease(note + "4", 5);
    }
}




