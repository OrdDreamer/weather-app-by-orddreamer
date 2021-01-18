export interface ListWeatherPoints {
        "dt": number,
        "main": {
          "temp": number,
          "feels_like": number,
          "temp_min": number,
          "temp_max": number,
          "pressure": number,
          "sea_level": number,
          "grnd_level": number,
          "humidity": number,
          "temp_kf": number
        },
        "weather": [
          {
            "id": number,
            "main": string
            "description": string,
            "icon": string
          }
        ],
        "clouds": {
          "all": number
        },
        "wind": {
          "speed": number,
          "deg": number
        },
        "visibility": number,
        "pop": number,
        "rain": {
          "3h": number
        },
        "sys": {
          "pod": string
        },
        "dt_txt": string
};

export interface WeatherData {
    "cod": string,
    "message": number,
    "cnt": number,
    "list": ListWeatherPoints[],
    "city": {
        "id": number,
        "name": string,
        "coord": {
          "lat": number,
          "lon": number
        },
        "country": string,
        "timezone": number,
        "sunrise": number,
        "sunset": number
      },
};

export interface WidgetListWeatherPoints {
  time: Date,
  temp: number,
  temp_perception: number,
  pressure: number,
  himidity: number,
  wind_speed: number,
  percent_precipitation: number,
  description: string,
  icon: string
};

export interface WidgetWeatherData {
  day: string,
  number: number,
  month: string,
  temp_max: number,
  temp_min: number,
  list: WidgetListWeatherPoints[]
};


