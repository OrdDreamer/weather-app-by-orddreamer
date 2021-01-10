export interface listInterface {
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

export interface weatherData {
    "cod": string,
    "message": number,
    "cnt": number,
    "list": listInterface[],
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

export interface widgetListInterface {
  time: Date,
  temp: number,
  temp_perception: number,
  pressure: number,
  himidity: number,
  wind_speed: number,
  pop: number,
  description: string,
  icon: string
};

export interface widgetWeatherData {
  day: string,
  number: number,
  month: string,
  temp_max: number,
  temp_min: number,
  list: widgetListInterface[]
};


