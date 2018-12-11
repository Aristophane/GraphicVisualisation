import { Melody } from './model/melody';
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
  gamme = Gammes.gammePentaEgyptienne;

  constructor(){
    this.firstSynth = new BassSynth();
    this.firstSynth.on();
  }

  ngAfterViewInit(){
    setInterval(() => this.updateAngle1(), 5);
  }

  updateAngle1(){
    this.currentAngle1 = this.currentAngle1 + 1;
    this.playAngle(this.currentAngle1, this.firstSynth, this.gamme);
  }

  playAngle(angle: number, synth: ISynth, gamme: Note[]){

    var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(angle,360), this.gamme);

    if (this.note != newNote.englishName)
    {  
      Tone.Transport.cancel("0:0:1");
      Tone.Transport.bpm.value = 130;
      Tone.Transport.stop();
      Tone.Transport.start();
      var notePosition = gamme.indexOf(newNote);
      var melody = new Melody();
      melody.notes = [
        { positionInScale: 0, startTime: "0:0:2" , duration: 0.2.toString()},
        { positionInScale: 3, startTime: "0:1:0" , duration: 0.2.toString()},
        { positionInScale: 3, startTime: "0:1:2" , duration: 0.1.toString()},
        { positionInScale: 5, startTime: "0:2:0" , duration: 0.2.toString()},
        { positionInScale: 5, startTime: "0:2:2" , duration: 0.2.toString()},
        { positionInScale: 6, startTime: "0:3:0" , duration: 0.8.toString()},
    ];
      synth.playMelody(notePosition, melody, gamme);
      this.note = newNote.englishName;
    }
  }

  mute(){
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }
}
