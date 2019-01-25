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
  private urlApi: string = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a0b9180cde41b3e34dc0ec0197980d21'
  private

  constructor(private http: HttpClient) { }

  getWeatherJSON(city: string): Observable<IWeather>{
      return this.http.get<IWeather>(this.urlApi);
  }
}
