import { Component } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'processingApp';
  isPlaying: boolean = true;

  constructor(){
    setInterval(() => this.updateAngle1(), 800)
    setInterval(() => this.updateAngle2(), 400)
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
