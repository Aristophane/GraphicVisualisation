import { Melody } from './model/melody';
import { BassSynth } from './tools/bassSynth';
import { Component, AfterViewInit, Input } from '@angular/core';
import * as Tone from 'tone';
import { GammesUtilities } from './tools/gammesUtilities';
import { Angles } from './model/angles';
import { ISynth } from './tools/ISynth';
import { Gammes } from './model/gammes';
import { Note } from './model/note';
import { Notes } from './model/notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'processingApp';
  isPlaying: boolean = true;
  firstSynth: BassSynth;
  secondSynth: BassSynth;
  currentAngle1 = 1;
  currentAngle2 = 61;
  note = Notes.B;
  gamme = Gammes.gammePentaEgyptienne;
  melody1: Melody;
  synths;

  isBassOn = false;

  constructor(){

    this.melody1 = new Melody();
    this.melody1.notes = [
      { positionInScale: 0, startTime: "0:0:2", duration: 0.2.toString() },
      { positionInScale: 0, startTime: "0:1:0", duration: 0.2.toString() },
      { positionInScale: 5, startTime: "0:1:2", duration: 0.1.toString() },
      { positionInScale: 5, startTime: "0:2:0", duration: 0.2.toString() },
      { positionInScale: 3, startTime: "0:2:2", duration: 0.2.toString() },
      { positionInScale: 2, startTime: "0:3:0", duration: 0.8.toString() },
    ];

    this._loadSynths();



    Tone.Transport.scheduleRepeat((time) => {
      if(!this.isBassOn){
      this.isBassOn = true;
      var notePosition = this.gamme.indexOf(this.note);
      this.synths.bass.triggerAttack(this.note.englishName + "2", time);
      }
      var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(this.currentAngle1, 360), this.gamme);

      if (this.note.englishName != newNote.englishName) {
        this.synths.bass.triggerRelease(time);
        var notePosition = this.gamme.indexOf(newNote);
        this.note = newNote;
        this.isBassOn = false;
      }

      console.log(this.note);

      console.log(time);

    }, '16n');
  }

  channel;
  fx;


  ngAfterViewInit(){
     setInterval(() => this.updateAngle1(), 20);
     Tone.Transport.start();
  }

  updateAngle1() {
    this.currentAngle1 = this.currentAngle1 + 1;
  }

  // playAngle(angle: number, synth: ISynth, gamme: Note[], melody: Melody){
  //   var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(angle,360), this.gamme);
  //   if (this.note != newNote.englishName)
  //   {  
  //     var notePosition = gamme.indexOf(newNote);
  //     synth.playMelody(notePosition, melody, gamme);
  //     this.note = newNote.englishName;
  //   }
  // }

  mute(){
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }

  _loadSynths() {
    this.channel = {
      master: new Tone.Gain(0.7),
      treb: new Tone.Gain(0.7),
      bass: new Tone.Gain(0.8),
    };
    this.fx = {
      distortion: new Tone.Distortion(0.8),
      reverb: new Tone.Freeverb(0.1, 3000),
      delay: new Tone.PingPongDelay('16n', 0.1),
    };
    this.synths = {
      treb: new Tone.PolySynth(1, Tone.SimpleAM),
      bass: new Tone.DuoSynth()
    };

    this.synths.bass.vibratoAmount.value = 0.1;
    this.synths.bass.harmonicity.value = 1.5;
    this.synths.bass.voice0.oscillator.type = 'triangle';
    this.synths.bass.voice0.envelope.attack = 0.05;
    this.synths.bass.voice1.oscillator.type = 'triangle';
    this.synths.bass.voice1.envelope.attack = 0.05;

    // fx mixes
    this.fx.distortion.wet.value = 0.2;
    this.fx.reverb.wet.value = 0.2;
    this.fx.delay.wet.value = 0.3;
    // gain levels
    this.channel.master.toMaster();
    this.channel.treb.connect(this.channel.master);
    this.channel.bass.connect(this.channel.master);
    // fx chains
    this.synths.treb.chain(this.fx.delay, this.fx.reverb, this.channel.treb);
    this.synths.bass.chain(this.fx.distortion, this.channel.bass);
  };

}
