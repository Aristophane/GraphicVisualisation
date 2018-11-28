import { IWeather } from './../model/weather';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CircleDrawer } from '../tools/circleDrawer';
import { WeatherService } from '../weather.service';
import { GammesUtilities } from '../tools/gammesUtilities';
import { Gammes } from '../model/gammes';
import { Synth } from '../tools/synth';
import * as Tone from 'tone';



@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnInit {

  @Input() public city : string;
  @Input() public frequency: number;

  constructor(private weatherService: WeatherService) {
  }

  public weatherInfos : IWeather;
  private drawer : CircleDrawer;
  public relatedNote : string;
  gammes = new Gammes();
  public note: string;
  private synth;

  ngOnInit(){
    this.synth = new Synth();
    this.frequency = this.synth.filterFrequency;
  }

  ngAfterViewInit() {
    const circle1Canvas = <HTMLCanvasElement>document.getElementById(this.city);
    this.getWeather(this.city);
    this.drawer = new CircleDrawer(circle1Canvas);
  }

  getWeather(city: string){
    this.weatherService.getWeatherJSON(city).subscribe(data => this.weatherInfos = data,()=> this.onError(),()=> this.onComplete());
  }

  onComplete(){
    this.drawer.draw(this.weatherInfos.wind.deg);
    this.note = GammesUtilities.findNoteFromAngle(this.gammes, this.weatherInfos.wind.deg);
    this.synth.playNote(this.note);
  }

  onError()
  {
  }

  }

