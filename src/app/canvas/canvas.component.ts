import { Component, OnInit } from '@angular/core';
import { CanvasAnimation } from './canvasAnimation';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  title = "test";
  constructor(private weatherService: WeatherService) {}


  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvasId');

    new CanvasAnimation(canvas, this.weatherService);
  }

}
