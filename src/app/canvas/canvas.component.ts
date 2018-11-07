import { IWeather } from './../model/weather';
import { Component, OnInit } from '@angular/core';
import { CanvasAnimation } from './canvasAnimation';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private weatherService: WeatherService) {}

  public weatherInfos : IWeather;

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvasId');
    new CanvasAnimation(canvas);
    this.getWeather();
  }

  getWeather(){
    this.weatherService.getWeatherJSON().subscribe(data => this.weatherInfos = data);
  }

}
