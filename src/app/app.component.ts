import { Component } from '@angular/core';
import { weatherData, widgetListInterface, widgetWeatherData } from './interfaces';

import { WeatherClientService } from './weather-client.service';
import { AppComponentService } from './app-component.service';


interface cityOption {
  nameCity: string;
  valueCity: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private weatherClient: WeatherClientService, private appService: AppComponentService) { };

  weatherData: widgetWeatherData[];
  displayedColumns: string[] = [
    "time",
    "icon",
    "temp",
    "pressure",
    "himidity",
    "wind_speed",
    "pop",
    "description"
  ];

  selected: cityOption;
  showForecast: boolean = false;

  optionsCity: cityOption[] = [
    { nameCity: 'Чернигов', valueCity: '710735' },
    { nameCity: 'Киев', valueCity: '703448' },
    { nameCity: 'Бровары', valueCity: '711390' }
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


