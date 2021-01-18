import { Injectable } from '@angular/core';
import { ListWeatherPoints, WeatherData, WidgetListWeatherPoints, WidgetWeatherData } from './interfaces';

const PRESSURE_PASCAL_TO_MERCURY_BAROMETER = 1/1.333;

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {

  // This method changes the input data to the format required by the weather display component
  // It distributes the disordered information to the days of the period (period 5 days)
  weatherDataTransformation(inputData: WeatherData): WidgetWeatherData[] {
    let outputData: WidgetWeatherData[] = new Array();

    const limitDays = 5; //limit of days to show
    let firstDay: Date = new Date(inputData.list[0].dt_txt);

    function timeDiff (firstDate: Date, secondDate: Date): number {
      firstDate.setHours(0,0,0,0);
      secondDate.setHours(0,0,0,0);
      return (+secondDate - +firstDate)/(1000*3600*24);
    };

    // Filtering out unnecessary timestamps
    let listWeatherPoints: ListWeatherPoints[] = inputData.list.filter((element) => {
      return timeDiff(firstDay,(new Date(element.dt_txt))) < limitDays;
    });

    // Sorting information (period: 5 days)
    listWeatherPoints.forEach( (element) => {
      let currentDate = new Date(element.dt_txt);
      let currentPeriod = timeDiff(firstDay, (new Date(element.dt_txt)));

      if (outputData.length < (currentPeriod + 1)) {
        outputData.push({
          day: this.matchingDay(currentDate.getDay()),
          number: currentDate.getDate(),
          month: this.matchingMonth(currentDate.getMonth()),
          temp_max: 0,
          temp_min: 0,
          list: []
        });
      };

      outputData[currentPeriod].list.push(this.objectTransformation(element));

      // Temperature averaging over the past day
      if (currentDate.getHours() ===  21) {
        this.averagingTemperature(outputData[currentPeriod]);
      }
    });

    return outputData;
  };

  // This method averages the temperature over the past day
  averagingTemperature(inputObject: WidgetWeatherData) {
    let minTemperature: number = 0;
    let maxTemperature: number = 0;
    inputObject.list.forEach(element => {
      if (element.temp > maxTemperature) maxTemperature = element.temp;
      if (element.temp < minTemperature) minTemperature = element.temp;
    });
    inputObject.temp_min = Math.floor(minTemperature);
    inputObject.temp_max = Math.floor(maxTemperature);
  };

  matchingDay(inputData: number): string {
    let outputData: string;

    switch (inputData) {
      case 0:
        outputData = "Воскресенье";
        break;

      case 1:
        outputData = "Понедельник";
        break;

      case 2:
        outputData = "Вторник";
        break;

      case 3:
        outputData = "Среда";
        break;

      case 4:
        outputData = "Четверг";
        break;

      case 5:
        outputData = "Пятница";
        break;

      case 6:
        outputData = "Суббота";
        break;

      default:
        outputData = "Неизвестно";
        break;
    };
    return outputData;
  };

  matchingMonth(inputData: number): string {
    let outputData: string;

    switch (inputData) {
      case 0:
        outputData = "Января";
        break;

      case 1:
        outputData = "Февраля";
        break;

      case 2:
        outputData = "Марта";
        break;

      case 3:
        outputData = "Апреля";
        break;

      case 4:
        outputData = "Мая";
        break;

      case 5:
        outputData = "Июня";
        break;

      case 6:
        outputData = "Июля";
        break;

      case 7:
        outputData = "Августа";
        break;

      case 8:
        outputData = "Сентября";
        break;

      case 9:
        outputData = "Октября";
        break;

      case 10:
        outputData = "Ноября";
        break;

      case 11:
        outputData = "Декабря";
        break;

      default:
        outputData = "Неизвестно";
        break;
    };
    return outputData;
  }

  objectTransformation(inputObject): WidgetListWeatherPoints {
    return {
      time: new Date(inputObject.dt_txt),
      temp: Math.floor(inputObject.main.temp),
      temp_perception: Math.floor(inputObject.main.feels_like),
      pressure: this.pressureTransformation(inputObject.main.pressure),
      himidity: inputObject.main.humidity,
      wind_speed: Number((inputObject.wind.speed).toFixed(1)),
      percent_precipitation: Math.floor(inputObject.pop*100),
      // Here we multiply by 100 in order to turn the fractional representation into an integer one
      description: inputObject.weather[0].description,
      icon: "http://openweathermap.org/img/wn/"+inputObject.weather[0].icon+".png"

    };
  };

  pressureTransformation(inputPressure: number): number {
    return Math.floor(inputPressure * PRESSURE_PASCAL_TO_MERCURY_BAROMETER);
  };

};
