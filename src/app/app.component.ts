import { BassSynth } from './tools/bassSynth';
import { Component, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';
import { GammesUtilities } from './tools/gammesUtilities';
import { Angles } from './model/angles';
import { ISynth } from './tools/ISynth';
import { Gammes } from './model/gammes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'processingApp';
  isPlaying: boolean = true;

  firstSynth: BassSynth;
  firstSynth2: BassSynth;
  // secondSynth : Synth;
  currentAngle1 = 0;
  currentAngle12 = 90;
  note: string = "B";

  constructor(){
    this.firstSynth = new BassSynth();
    this.firstSynth2 = new BassSynth();
    this.firstSynth.on();
    this.firstSynth2.on();
  }

  ngAfterViewInit(){
    setInterval(() => this.updateAngle1(), 2000);
  }

  

  updateAngle1(){
    this.currentAngle1 = this.currentAngle1 + 10;
    // this.currentAngle12 = this.currentAngle12 + 10;
    this.playAngle(this.currentAngle1, this.firstSynth);
    // this.playAngle(this.currentAngle12, this.firstSynth2);
  }

  playAngle(angle: number, synth: ISynth){
    var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(angle,360));

    if (this.note != newNote)
    {  
      Tone.Transport.bpm.value = 120;
      Tone.Transport.stop();
      Tone.Transport.start();
      console.log(newNote);
      var notePosition = GammesUtilities.findNotePositionFromEnglishName(newNote, Gammes.gammeMajeure);
      Tone.Transport.schedule((time) => {synth.play(Gammes.gammeMajeure[notePosition].englishName)}, "0:0:2");
      Tone.Transport.schedule((time) => {synth.play(Gammes.gammeMajeure[notePosition + 2].englishName)}, "0:2:0");
      this.note  = newNote;
    }
  }

  mute()
  {
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }
}
