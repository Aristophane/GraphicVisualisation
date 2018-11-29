import { IWeather } from './../model/weather';
import { Component, OnInit, Input, AfterViewInit, HostListener } from '@angular/core';
import { WeatherService } from '../weather.service';
import { GammesUtilities } from '../tools/gammesUtilities';
import { Gammes } from '../model/gammes';
import { Synth } from '../tools/synth';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements AfterViewInit, OnInit {

  @Input() public city : string;
  @Input() public frequency: number;
  transformation: string;
  isPlaying: boolean = true;

  constructor(private weatherService: WeatherService) {
  }

  public weatherInfos : IWeather;
  public relatedNote : string;
  gammes = new Gammes();
  public note: string;
  private synth;

  ngOnInit(){
    this.synth = new Synth();
    this.frequency = this.synth.filterFrequency;
  }

  ngAfterViewInit() {
    this.getWeather(this.city);
  }

  getWeather(city: string){
    this.weatherService.getWeatherJSON(city).subscribe(data => this.weatherInfos = data,()=> this.onError(),()=> this.onComplete());
  }

  onComplete(){
    this.note = GammesUtilities.findNoteFromAngle(this.gammes, this.weatherInfos.wind.deg);
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
<<<<<<< HEAD
}
=======

  mute()
  {
    console.log("muted ? " + this.isPlaying);
    this.synth.mute(this.isPlaying);
    this.isPlaying = !this.isPlaying;
  }

  }
>>>>>>> cdfd9bd5d61de7478c4053981c78f3bc7106b9b5

