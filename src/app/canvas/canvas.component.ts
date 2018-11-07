import { IWeather } from './../model/weather';
import { Component, OnInit } from '@angular/core';
import { CircleDrawer } from './circleDrawer';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private weatherService: WeatherService) {}

  public weatherInfos : IWeather;
  private drawer : CircleDrawer;

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvasId');
    this.getWeather();
    this.drawer = new CircleDrawer(canvas);
  }

  getWeather(){
    this.weatherService.getWeatherJSON().subscribe(data => this.weatherInfos = data,()=> this.onError(),()=> this.drawer.draw(this.weatherInfos.wind.deg));
  }

  onError()
  {

  }

}
