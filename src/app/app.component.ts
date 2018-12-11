import { BassSynth } from './tools/bassSynth';
import { Component, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';
import { GammesUtilities } from './tools/gammesUtilities';
import { Angles } from './model/angles';
import { ISynth } from './tools/ISynth';
import { Gammes } from './model/gammes';
import { Note } from './model/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'processingApp';
  isPlaying: boolean = true;
  firstSynth: BassSynth;
  currentAngle1 = 0;
  note = "C";
  gamme = Gammes.gammeMineure;

  constructor(){
    this.firstSynth = new BassSynth();
    this.firstSynth.on();
  }

  ngAfterViewInit(){
    setInterval(() => this.updateAngle1(), 1000);
    
    // Tone.Transport.start();
    // Tone.Transport.scheduleRepeat((time)=> this.updateAngle1(), "1m");
  }

  updateAngle1(){
    this.currentAngle1 = this.currentAngle1 + 110;
    this.playAngle(this.currentAngle1, this.firstSynth, this.gamme);
  }

  playAngle(angle: number, synth: ISynth, gamme: Note[]){
    var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(angle,360), this.gamme);
    if (this.note != newNote.englishName)
    {  
      Tone.Transport.cancel("0:0:1");
      Tone.Transport.bpm.value = 140;
      Tone.Transport.stop();
      Tone.Transport.start();
      var notePosition = gamme.indexOf(newNote);
      var note1 = GammesUtilities.getEnglishNoteName(gamme, notePosition,4);
      var note2 = GammesUtilities.getEnglishNoteName(gamme, notePosition + 1,4);
      var note3 = GammesUtilities.getEnglishNoteName(gamme, notePosition + 2,4);
      var note4 = GammesUtilities.getEnglishNoteName(gamme, notePosition + 3,4);
      Tone.Transport.schedule((time) => {synth.play(note1)}, "0:0:2");
      Tone.Transport.schedule((time) => {synth.play(note2)}, "0:1:0");
      Tone.Transport.schedule((time) => {synth.play(note3)}, "0:1:2");
      Tone.Transport.schedule((time) => {synth.play(note4)}, "0:2:0");
      this.note = newNote.englishName;
    }
  }

  mute(){
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }
}
