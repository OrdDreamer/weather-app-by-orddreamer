import { Component } from '@angular/core';
import { WidgetWeatherData } from './interfaces';

import { WeatherClientService } from './weather-client.service';
import { AppComponentService } from './app-component.service';


interface CityOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private weatherClient: WeatherClientService, private appService: AppComponentService) { };

  weatherData: WidgetWeatherData[];
  displayedColumns: string[] = [
    "time",
    "icon",
    "temp",
    "pressure",
    "himidity",
    "wind_speed",
    "percent_precipitation",
    "description"
  ];

  selected: CityOption;
  showForecast: boolean = false;

  readonly optionsCity: CityOption[] = [
    { name: 'Чернигов', value: '710735' },
    { name: 'Киев', value: '703448' },
    { name: 'Бровары', value: '711390' }
  ];


  showWeather() {
    if (this.selected) {
      this.weatherClient.requestWeatherData(String(this.selected))
        .subscribe((response) => {
          this.weatherData = this.appService.weatherDataTransformation(response);
          this.showForecast = true;
        });
    };
  };

};


