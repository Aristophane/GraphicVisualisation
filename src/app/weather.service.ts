import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IWeather } from './model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherApiUrlMock: string = 'assets/weatherInfoMock.json';
  private weatherApiUrlMock1: string = 'assets/weatherInfoMock.1.json';

  constructor(private http: HttpClient) { }

  getWeatherJSON(city: string): Observable<IWeather>{

    if(city == "Cairns")
    {
      return this.http.get<IWeather>(this.weatherApiUrlMock);
    }
    else{
      return this.http.get<IWeather>(this.weatherApiUrlMock1); 
    }
  }
}
