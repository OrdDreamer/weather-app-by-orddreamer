import { Injectable } from '@angular/core';
import { weatherData, widgetListInterface, widgetWeatherData } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {

  constructor() { }

  weatherDataTransformation(inputData: weatherData): widgetWeatherData[] {

    let limitDays = 5; //НАСТРОЙКА КОЛЛИЧЕСТВА ДНЕЙ ДЛЯ ПОКАЗА
    let dayCounter: number = -1; //СЧЕТЧИК ДНЕЙ ДЛЯ ПОКАЗА
    let currentDate = new Date(0); //ТЕКУЩАЯ ДАТА ДЛЯ РАЗДЕЛЕНИЯ ПО ДНЯМ

    let outputData: widgetWeatherData[] = new Array();



    for (let i = 0; i < inputData.list.length; i++) { //ПЕРЕБОР ВСЕХ ВРЕМЕННЫХ МЕТОК

      if ((new Date(inputData.list[i].dt_txt)).getDate() != currentDate.getDate()) {

        if (dayCounter != -1) {
          this.averagingTemperature(outputData[dayCounter]);
        }; //УСРЕДНЕНИЕ ТЕМПЕРАТУРЫ ЗА ДЕНЬ, ПЕРЕД ПЕРЕХОДОМ К СЛЕДУЮЩЕМУ

        dayCounter++;

        if (dayCounter === limitDays) break; //ПРОВЕРКА ЛИМИТА ПОКАЗЫВАЕМЫХ ДНЕЙ

        outputData.push({
          day: "",
          number: 0,
          month: "",
          temp_max: 0,
          temp_min: 0,
          list: []
        });


        currentDate = new Date(inputData.list[i].dt_txt);

        outputData[dayCounter].day = this.matchingDay((new Date(inputData.list[i].dt_txt)).getDay());
        outputData[dayCounter].number = (new Date(inputData.list[i].dt_txt)).getDate();
        outputData[dayCounter].month = this.matchingMonth((new Date(inputData.list[i].dt_txt)).getMonth());;

      }; //СМЕНА ДНЯ НА СЛЕДУЮЩИЙ



      outputData[dayCounter].list.push(this.objectTransformation(inputData.list[i]));
      //КЛАДЕМ В ТЕКУЩИЙ ДЕНЬ ИЗМЕНЕННУЮ ВРЕМЕННУЮ МЕТКУ
    };

    return outputData;
  };

  averagingTemperature(inputObject: widgetWeatherData) {
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

  objectTransformation(inputObject): widgetListInterface {
    let outputObject = {
      time: new Date(inputObject.dt_txt),
      temp: Math.floor(inputObject.main.temp),
      temp_perception: Math.floor(inputObject.main.feels_like),
      pressure: this.pressureTransformation(inputObject.main.pressure),
      himidity: inputObject.main.humidity,
      wind_speed: Number((inputObject.wind.speed).toFixed(1)),
      pop: Math.floor(inputObject.pop*100),
      description: inputObject.weather[0].description,
      icon: "http://openweathermap.org/img/wn/"+inputObject.weather[0].icon+".png"

    };
    return outputObject;
  };

  pressureTransformation(inputPressure: number): number {
    return Math.floor(inputPressure / 1.333);
  };

}
