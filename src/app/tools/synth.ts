import * as Tone from 'tone';

export class Synth{

    lfo;
    synth;
    synthType;
    pitchValue = "4";

    constructor(synthType: number){
      this.synthType = synthType;
      console.log(this.synthType);
      if (this.synthType == 1) {
        this.initializeSynth1();
      }
      else {
        this.initializeSynth2();
      }
    }

    on(){

      Tone.Transport.start();
    }

    initializeSynth1()
    {
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
      var vol = new Tone.Volume(-15);
      var filter = new Tone.Filter("1300", "lowpass");
      this.synth.chain(filter, vol, Tone.Master);
    }

  initializeSynth2() {
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
    var filter = new Tone.Filter("500", "lowpass");
    this.synth.chain(filter, vol, Tone.Master);
    this.pitchValue = "2";
  }

    mute(value: boolean){
        Tone.Master.mute = value;
    }

    playNote(note: string)
    {
      this.synth.triggerAttackRelease(note + this.pitchValue, 5);
    }
}




