import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { weatherData } from './interfaces';
import { API_KEY } from '../config';

@Injectable({
  providedIn: 'root'
})
export class WeatherClientService {

  constructor(private http: HttpClient) { }

  private serverUrl = `
  https://api.openweathermap.org/data/2.5/forecast`;


  requestWeatherData(id: string): Observable<weatherData> {
    return this.http.get<weatherData>(
      `${this.serverUrl}?id=${id}&appid=${API_KEY}&units=metric&lang=ru`
      );
  };

}
