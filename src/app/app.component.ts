import { Melody } from './model/melody';
import { Component, AfterViewInit, NgZone } from '@angular/core';
import * as Tone from 'tone';
import { GammesUtilities } from './tools/gammesUtilities';
import { Angles } from './model/angles';
import { Gammes } from './model/gammes';
import { Notes } from './model/notes';
import * as MidiConvert from 'midiconvert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  title = 'Rose Musicale';
  isPlaying: boolean = true;
  currentAngle1 = 1;
  note = Notes.B;
  gamme = Gammes.gammeMajeure;
  melody1: Melody;
  melody2: Melody;
  synths;
  pairTest: number = 0;

  ngAfterViewInit() {
    this.loadMelodies();
    this.loadTransport();
  }

  constructor(private zone: NgZone){
    Tone.Transport.bpm.value = 100;
    this.loadSynths();
  }

  loadMelodies(){
    this.melody1 = new Melody();
    this.melody1.notes = [
      { positionInScale: 0, startTime: "0:0:0", duration: "0:0:3" },
      { positionInScale: 2, startTime: "0:0:3", duration: "0:0:1" },
      { positionInScale: 3, startTime: "0:1:0", duration: "0:0:3" },
      { positionInScale: 2, startTime: "0:2:1", duration: "0:0:3" },
      { positionInScale: 5, startTime: "0:3:0", duration: "0:0:1" },
      { positionInScale: 3, startTime: "0:3:2", duration: "0:0:2" }
    ];

    this.melody2 = new Melody();
    this.melody2.notes = [
      { positionInScale: 0, startTime: "0:0:0", duration: "0:2:0" },
      { positionInScale: 5, startTime: "0:2:0", duration: "0:0:1" },
      { positionInScale: 5, startTime: "0:2:2", duration: "0:0:1" },
      { positionInScale: 3, startTime: "0:3:0", duration: "0:1:0" }
    ];
  }


  tempoChange(event: any) { // without type info
    if (event.keyCode == 13)
    {
      Tone.Transport.bpm.rampTo(parseInt(event.target.value), 4);
    }
  }

  filterChange(event: any)
  {
    if (event.keyCode == 13) {
      this.synths.bass.set("vibratoAmount", parseInt(event.target.value));
    }
  }

  updateAngle1() {
    this.currentAngle1 = this.currentAngle1;
  }

  mute(){
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }

  loadTransport(){
    var totalMelodyTime = Tone.Time(this.melody1.notes[this.melody1.notes.length - 1].startTime).toSeconds() + Tone.Time(this.melody1.notes[this.melody1.notes.length - 1].duration).toSeconds();

    Tone.Transport.scheduleRepeat((time) => {
      var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(this.currentAngle1, 360), this.gamme);
      if (this.note != newNote) {
        this.note = newNote;
      }
      var notePosition = this.gamme.indexOf(this.note);

      if (this.pairTest % 5 == 0) {
        this.scheduleMelody(this.melody2, 3, notePosition, this.synths.bass, time);
        this.scheduleMelody(this.melody1.multiplyMelodyNotes(4, this.gamme), 5, notePosition, this.synths.treb, time);
      }
      else if (this.pairTest % 3 == 0) {
        this.scheduleMelody(this.melody2.multiplyMelodyNotes(-1, this.gamme), 3, notePosition, this.synths.bass, time);
        this.scheduleMelody(this.melody1, 5, notePosition, this.synths.treb, time);
      }
      else if(this.pairTest % 2 == 0)
      {
        this.scheduleMelody(this.melody1, 4, notePosition, this.synths.treb, time);
        this.scheduleMelody(this.melody2, 3, notePosition, this.synths.bass, time);
      }
      else{
        this.scheduleMelody(this.melody2, 3, notePosition, this.synths.bass, time);
        this.scheduleMelody(this.melody1.invertMelodyOrder(), 5, notePosition, this.synths.treb, time);
      }

      console.log("aga")

      //A chaque fin de mélodie on va changer l'angle
      Tone.Transport.schedule(() => {
        this.zone.run(() => {
          this.updateAngle1();});}, time);
        this.pairTest += 1;
    }, totalMelodyTime);

    Tone.Transport.start();
  }

  scheduleMelody(melody: Melody, pitch: number, notePosition: number, synth, startingTime: number){
    
    melody.notes.forEach((note) => {

      var scheduledAttackTime = startingTime + Tone.Time(note.startTime).toSeconds() ;
      var scheduledReleaseTime = startingTime + Tone.Time(note.startTime).toSeconds() + Tone.Time(note.duration).toSeconds();

      //SCHEDULE ATTACKS
      Tone.Transport.schedule((attackTime) => {
        var noteComputed = GammesUtilities.getEnglishNoteName(this.gamme, notePosition + note.positionInScale, pitch);
        synth.triggerAttack(noteComputed);
      }, scheduledAttackTime);

      //SCHEDULE RELEASES
      Tone.Transport.schedule((releaseTime) => {
        synth.triggerRelease(releaseTime);
      }, scheduledReleaseTime);
    });
  }

  loadSynths() {
     var channel = {
      master: new Tone.Gain(0.2),
      treb: new Tone.Gain(0.4),
      bass: new Tone.Gain(0.4),
    };
    var fx = {
      distortion: new Tone.Distortion(0.2),
      reverb: new Tone.Freeverb(0.5, 5000),
      delay: new Tone.PingPongDelay('16n', 0.2),
      filter: new Tone.Filter(1000, "lowpass", -48),
      chorus: new Tone.Chorus(4, 2.5, 0.5)
    }
    this.synths = {
      treb: new Tone.AMSynth(),
      bass: new Tone.DuoSynth()
    };

    this.synths.treb.set({
      "envelope": {
        "attack": 0.25,
        "release": 2.2
      }
    })

    this.synths.treb.harmonicity.value = 0.5;
    this.synths.bass.vibratoAmount.value = 0.2;
    this.synths.bass.harmonicity.value = 1.5;
    this.synths.bass.voice0.oscillator.type = 'triangle';
    this.synths.bass.voice0.envelope.attack = 0.01;
    this.synths.bass.voice1.oscillator.type = 'sine';
    this.synths.bass.voice1.envelope.attack = 0.01;

    // fx mixes
    fx.distortion.wet.value = 0.1;
    fx.reverb.wet.value = 0.2;
    fx.delay.wet.value = 0.3;
    // gain levels
    fx.filter.gain.value = 0.5;    
    channel.master.toMaster();
    channel.treb.connect(channel.master);
    channel.bass.connect(channel.master);
    // fx chains
    this.synths.treb.chain(fx.delay, fx.reverb, fx.chorus, fx.distortion, channel.treb);
    this.synths.bass.chain(fx.filter, fx.distortion, channel.bass);
  };

}
