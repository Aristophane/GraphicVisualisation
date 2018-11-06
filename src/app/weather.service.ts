import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Weather } from './canvas/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherApiUrl = 'api/weather';

  constructor(private http: HttpClient) { }

  getWeatherJSON(){
    return this.http.get<Weather>(this.weatherApiUrl);
  }

}
