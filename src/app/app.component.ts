import { BassSynth } from './tools/bassSynth';
import { Component, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';
import { GammesUtilities } from './tools/gammesUtilities';
import { Angles } from './model/angles';
import { ISynth } from './tools/ISynth';

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
  currentAngle2 = 240;
  note: string = "C";

  constructor(){
    this.firstSynth = new BassSynth();
    this.firstSynth2 = new BassSynth();
    this.firstSynth.on();
    this.firstSynth2.on();
  }

  ngAfterViewInit(){
    setInterval(() => this.updateAngle1(), 100);
  }

  

  updateAngle1(){
    this.currentAngle1 = this.currentAngle1 + 10;
    this.currentAngle12 = this.currentAngle12 + 10;
    this.playAngle(this.currentAngle1, this.firstSynth);
    this.playAngle(this.currentAngle12, this.firstSynth2);
  }

  playAngle(angle: number, synth: ISynth){
    var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(angle,360));

    if (this.note != newNote)
    {  
      Tone.Transport.stop();
      Tone.Transport.start();
      console.log("angle " +angle);
      console.log("note " + newNote);

      synth.play(newNote);
      this.note  = newNote;
    }
  }

  mute()
  {
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }
}
