import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  getWeather(zipCode : number): number[]{
    var result: number[] = [90, 45];
    return result;
  }

}
