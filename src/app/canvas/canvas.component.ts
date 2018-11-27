import { IWeather } from './../model/weather';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CircleDrawer } from '../tools/circleDrawer';
import { WeatherService } from '../weather.service';
import { GammesUtilities } from '../tools/gammesUtilities';
import { Gammes } from '../model/gammes';
import * as Tone from 'tone';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  @Input() public city : string;

  constructor(private weatherService: WeatherService) {}

  public weatherInfos : IWeather;
  private drawer : CircleDrawer;
  public relatedNote : string;
  gammes = new Gammes();
  public note: string;

  ngAfterViewInit() {
    const circle1Canvas = <HTMLCanvasElement>document.getElementById(this.city);
    console.log(this.city);
    this.getWeather(this.city);
    this.drawer = new CircleDrawer(circle1Canvas);
  }

  getWeather(city: string){
    this.weatherService.getWeatherJSON(city).subscribe(data => this.weatherInfos = data,()=> this.onError(),()=> this.onComplete());
  }

  onComplete(){
    this.drawer.draw(this.weatherInfos.wind.deg);
    this.note = GammesUtilities.findNoteFromAngle(this.gammes, this.weatherInfos.wind.deg);
    this.playNote(this.note);
  }

  onError()
  {
  }

  playNote(note: string)
  {
    var synth = new Tone.Synth({
      "oscillator": {
        "type": "amtriangle",
        "harmonicity": 0.5,
        "modulationType": "sine"
      },
      "envelope": {
        "attackCurve": 'exponential',
        "attack": 0.05,
        "decay": 0.2,
        "sustain": 0.2,
        "release": 1.5,
      },
      "portamento": 0.05
    }).toMaster();

<<<<<<< HEAD
    synth.triggerAttack(this.note + "3", "2n");
=======
    synth.triggerAttack(this.note + "3");
>>>>>>> 06066a5bfdc486c083f9132f03ac877d312563f2
  }
  

}
