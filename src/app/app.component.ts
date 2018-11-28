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

  mute()
  {
    Tone.Master.mute = this.isPlaying;
    this.isPlaying = !this.isPlaying;
  }
}
