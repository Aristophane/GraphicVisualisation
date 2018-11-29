import { IWeather } from './../model/weather';
import { Component, OnInit, Input, AfterViewInit, HostListener } from '@angular/core';
import { WeatherService } from '../weather.service';
import { GammesUtilities } from '../tools/gammesUtilities';
import { Synth } from '../tools/synth';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements AfterViewInit, OnInit {

  @Input() public city : string;
  transformation: string;
  isPlaying: boolean = true;

  constructor(private weatherService: WeatherService) {
  }

  public weatherInfos : IWeather;
  public note: string;
  private synth: Synth;

  ngOnInit(){
    this.synth = new Synth();
  }

  ngAfterViewInit() {
    this.getWeather(this.city);
  }

  getWeather(city: string){
    this.weatherService.getWeatherJSON(city).subscribe(data => this.weatherInfos = data,()=> this.onError(),()=> this.onComplete());
  }

  onComplete(){
    this.note = GammesUtilities.findNoteFromAngle(this.weatherInfos.wind.deg);
    this.synth.playNote(this.note);
    this.transformation = this.getTransformation(this.weatherInfos.wind.deg.toString());
  }

  onError()
  {
  }

  getTransformation(angle: string)
  {
    return "rotate(" + angle + ", 150, 150)";
  }

  action(){
   this.synth.frequencySet(0.5);
  }
}

