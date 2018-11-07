import { IWeather } from './../model/weather';
import { Component, OnInit } from '@angular/core';
import { CircleDrawer } from '../tools/circleDrawer';
import { WeatherService } from '../weather.service';
import { GammesUtilities } from '../tools/gammesUtilities';
import { Gammes } from '../model/gammes';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private weatherService: WeatherService) {}

  public weatherInfos : IWeather;
  private drawer : CircleDrawer;
  public relatedNote : string;
  gammes = new Gammes();
  public note: string;

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvasId');
    this.getWeather();
    this.drawer = new CircleDrawer(canvas);
  }

  getWeather(){
    this.weatherService.getWeatherJSON().subscribe(data => this.weatherInfos = data,()=> this.onError(),()=> this.onComplete());
  }

  onComplete(){
    this.drawer.draw(this.weatherInfos.wind.deg);
    this.note = GammesUtilities.findNoteFromAngle(this.gammes, this.weatherInfos.wind.deg);
  }

  onError()
  {

  }

}
