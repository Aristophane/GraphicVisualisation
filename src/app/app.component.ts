import { Synth } from './tools/synth';
import { Component, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'processingApp';
  isPlaying: boolean = true;

  oAngle1: Observable<number>;
  firstSynth: Synth;
  secondSynth : Synth;

  constructor(){
    console.log("constructed")
    this.firstSynth = new Synth(1);
    this.secondSynth = new Synth(2);
  }

  ngAfterViewInit(){
    setInterval(() => this.updateAngle1(), 400);
    setInterval(() => this.updateAngle2(), 200);
  }

  updateAngle1(){
    this.currentAngle1 = Math.random()*360;
    
  }
  updateAngle2() {
    this.currentAngle2 = this.currentAngle2 + 120;
  }

  currentAngle1 = 0;
  currentAngle2 = 240;

  mute()
  {
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }
}
