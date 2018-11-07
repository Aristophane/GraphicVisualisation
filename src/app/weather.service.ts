import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IWeather } from './model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherApiUrl: string = 'assets/weatherInfoMock.json';

  constructor(private http: HttpClient) { }

  getWeatherJSON(): Observable<IWeather>{
    return this.http.get<IWeather>(this.weatherApiUrl);
  }
}
