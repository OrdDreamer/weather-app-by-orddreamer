import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { widgetWeatherData } from '../interfaces';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent {

  constructor(private sanitizer: DomSanitizer) { };

  @Input() weatherData: widgetWeatherData;
  @Input() displayedColumns: string[];


  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  };

};
