import { Melody } from './model/melody';
import { Component, AfterViewInit, NgZone } from '@angular/core';
import * as Tone from 'tone';
import { GammesUtilities } from './tools/gammesUtilities';
import { Angles } from './model/angles';
import { Gammes } from './model/gammes';
import { Notes } from './model/notes';

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
  gamme = Gammes.gammeMajeure ;
  melody1: Melody;
  melody2: Melody;
  melody3: Melody;
  melody4: Melody;
  synths;

  constructor(private zone: NgZone){
    Tone.Transport.bpm.value = 105;
    this.loadSynths();
  }

  channel;
  fx;

  ngAfterViewInit(){
    this.melody1 = new Melody();
    this.melody1.notes = [
      { positionInScale: 0, startTime: "0:0:0", duration: "0:0:3" },
      { positionInScale: 2, startTime: "0:0:3", duration: "0:0:3" },
      { positionInScale: 3, startTime: "0:1:2", duration: "0:0:3" },
      { positionInScale: 4, startTime: "0:2:1", duration: "0:0:3" },
      { positionInScale: 5, startTime: "0:3:0", duration: "0:0:2" },
      { positionInScale: 6, startTime: "0:3:2", duration: "0:0:2" }
    ];

    this.melody3 = new Melody();
    this.melody3.notes = [
      { positionInScale: 0, startTime: "0:0:0", duration: "0:0:3" },
      { positionInScale: -2, startTime: "0:0:3", duration: "0:0:3" },
      { positionInScale: -3, startTime: "0:1:2", duration: "0:0:3" },
      { positionInScale: -4, startTime: "0:2:1", duration: "0:0:3" },
      { positionInScale: -5, startTime: "0:3:0", duration: "0:0:2" },
      { positionInScale: -6, startTime: "0:3:2", duration: "0:0:2" }
    ];

    this.melody2 = new Melody();
    this.melody2.notes = [
      { positionInScale: 0, startTime: "0:0:0", duration: "0:2:0" },
      { positionInScale: 5, startTime: "0:2:0", duration: "0:0:1" },
      { positionInScale: 5, startTime: "0:2:2", duration: "0:0:1" },
      { positionInScale: 3, startTime: "0:3:0", duration: "0:1:0" }
    ];

    this.melody4 = new Melody();
    this.melody4.notes = [
      { positionInScale: 0, startTime: "0:0:0", duration: "0:2:0" },
      { positionInScale: -5, startTime: "0:2:0", duration: "0:0:1" },
      { positionInScale: -5, startTime: "0:2:2", duration: "0:0:1" },
      { positionInScale: -3, startTime: "0:3:0", duration: "0:1:0" }
    ];

    this.loadTransport();
  }

  updateAngle1() {
    this.currentAngle1 = this.currentAngle1 + 165;
  }

  mute(){
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }

  pairTest: number = 0;

  loadTransport(){
    var totalMelodyTime = Tone.Time(this.melody1.notes[this.melody1.notes.length - 1].startTime).toSeconds() + Tone.Time(this.melody1.notes[this.melody1.notes.length - 1].duration).toSeconds();

    Tone.Transport.scheduleRepeat((time) => {

      var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(this.currentAngle1, 360), this.gamme);
      if (this.note != newNote) {
        this.note = newNote;
      }
      var notePosition = this.gamme.indexOf(this.note);

      if(this.pairTest % 2 == 0)
      {
        this.scheduleMelody(this.melody1, 4, notePosition,this.synths.treb, time);
        this.scheduleMelody(this.melody2, 3, notePosition, this.synths.bass, time);
      }
      else{
        this.scheduleMelody(this.melody2, 3, notePosition, this.synths.bass, time);
        this.scheduleMelody(this.melody1.revertMelodyNotes(), 5, notePosition, this.synths.treb, time);
      }

      this.pairTest += 1;

      //A chaque fin de mélodie on va changer l'angle
      Tone.Transport.schedule(() => {
        this.zone.run(() => {
          this.updateAngle1();});}, time);

    }, totalMelodyTime);

    Tone.Transport.start();
  }

  scheduleMelody(melody: Melody, pitch: number, notePosition: number, synth, startingTime: number){
    melody.notes.forEach((note) => {

      var scheduledAttackTime = startingTime + Tone.Time(note.startTime).toSeconds();
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
    this.channel = {
      master: new Tone.Gain(0.2),
      treb: new Tone.Gain(0.4),
      bass: new Tone.Gain(0.4),
    };
    this.fx = {
      distortion: new Tone.Distortion(0.2),
      reverb: new Tone.Freeverb(0.5, 5000),
      delay: new Tone.PingPongDelay('16n', 0.2),
      filter: new Tone.Filter(1000, "lowpass", -48),
      chorus: new Tone.Chorus(4, 2.5, 0.5)
    }
    this.synths = {
      treb: new Tone.PolySynth(1, Tone.SimpleAM),
      bass: new Tone.DuoSynth()
    };

    this.synths.bass.vibratoAmount.value = 0.2;
    this.synths.bass.harmonicity.value = 1.5;
    this.synths.bass.voice0.oscillator.type = 'triangle';
    this.synths.bass.voice0.envelope.attack = 0.01;
    this.synths.bass.voice1.oscillator.type = 'sine';
    this.synths.bass.voice1.envelope.attack = 0.01;

    // fx mixes
    this.fx.distortion.wet.value = 0.1;
    this.fx.reverb.wet.value = 0.2;
    this.fx.delay.wet.value = 0.3;
    // gain levels
    this.fx.filter.gain.value = 0.5;    
    this.channel.master.toMaster();
    this.channel.treb.connect(this.channel.master);
    this.channel.bass.connect(this.channel.master);
    // fx chains
    this.synths.treb.chain(this.fx.delay, this.channel.treb, this.fx.reverb, this.fx.chorus ,this.fx.distortion);
    this.synths.bass.chain(this.fx.filter, this.fx.distortion, this.channel.bass);
  };

}
