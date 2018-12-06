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
  // secondSynth : Synth;
  currentAngle1 = 0;
  currentAngle2 = 240;
  note: string = "C";

  constructor(){
    this.firstSynth = new BassSynth();
    this.firstSynth.on();
  }

  ngAfterViewInit(){
    setInterval(() => this.updateAngle1(), 5000);
    setInterval(() => console.log(()=>Tone.Transport.tick), 50);
  }

  

  updateAngle1(){
    this.currentAngle1 = this.currentAngle1 + 120;
    this.playAngle(this.currentAngle1, this.firstSynth);
  }

  playAngle(angle: number, synth: ISynth){
    var newNote = GammesUtilities.findNoteFromAngle(Angles.normalizeAngle(angle,360));
    if (this.note != newNote)
    {  
      Tone.Transport.stop();
      Tone.Transport.start();
      synth.play(this.note);
      this.note  = newNote;
    }
  }

  mute()
  {
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }
}
