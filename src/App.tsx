import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TemperatureList from './components/TemperatureList';
import DateTime from './components/DateTime';
import Area from './components/Area';
import Form from './components/Form';
import './assets/weather.css';
import { unixToDay } from './utils/Functions';
import image from './assets/image.jpg';

const DEFAULT_CITY = 'lagos';
const PATH_BASE = 'https://api.openweathermap.org/data/2.5/forecast';
const PATH_SEARCH = '/daily?';
const PATH_CITY = 'q=';
const PATH_COUNT = 'cnt=';
const PATH_UNIT = 'units=metric';
const PATH_APPID = 'appid=';
const API_KEY = 'c0c4a4b4047b97ebc5948ac9c48c0559';

interface WeatherData {
  [city: string]: {
    city: string;
    country: string;
    timezone: number;
    temperatureList: TemperatureData[];
  };
}

interface TemperatureData {
  day: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchCity, setSearchCity] = useState<string>(DEFAULT_CITY);
  const [currentCity, setCurrentCity] = useState<string>("");
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const needsToFetchWeather = (city: string) => {
    return !weather || !weather[city];
  }

  const setSearchWeather = (res: any, city: string) => {
    const { city: cityData, list } = res;
    const { name, country, timezone } = cityData;
    const weatherList = { ...weather! };
    const temperatureList: TemperatureData[] = [];

    list.forEach((item: any) => {
      const { dt, temp, weather } = item;

      temperatureList.push({
        day: unixToDay(dt),
        temperature: temp.day,
        weatherDescription: weather[0].description,
        weatherIcon: weather[0].icon
      });
    });

    const currentCityData = {
      city: name,
      country,
      timezone,
      temperatureList
    };

    const newWeather = {
      [city]: currentCityData,
      ...weatherList
    };

    setIsFetched(true);
    setSearchCity(city);
    setCurrentCity(currentCityData);
    setWeather(newWeather);

    console.log('api call:', currentCityData);
  }

  const fetchPreviousWeather = (city: string) => {
    if (weather && weather[city]) {
      setCurrentCity(weather[city]);
    }

    console.log('cache log:', currentCity);
  }

  const fetchWeather = async (city: string, count = 6) => {
    const api = `${PATH_BASE}${PATH_SEARCH}${PATH_CITY}${city}&${PATH_COUNT}${count}&${PATH_UNIT}&${PATH_APPID}${API_KEY}`;

    try {
      setIsFetched(false);
      const res = await axios(api);
      setSearchWeather(res.data, city);
      setIsFetched(true);
    } catch (error) {
      setIsFetched(true);
      alert('No weather data found for this city');
    }
  };

  useEffect(() => {
    fetchWeather(searchCity, 6)
  }, [])

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchCity(value);
  }

  const onSearchSubmit = (event: React.FormEvent) => {
    needsToFetchWeather(searchCity)
      ? fetchWeather(searchCity)
      : fetchPreviousWeather(searchCity);
    event.preventDefault();
  }

  const { city, country, timezone, temperatureList } =
    (isFetched && currentCity) || {};

  return (
    <div className="bg-cover bg-no-repeat bg-center bg-fixed h-screen flex flex-col justify-between items-center" style={{ backgroundImage: `url(${image})` }}>
      {isFetched ? (
        <>
          <div className="flex flex-wrap justify-around pt-20 pb-6 px-6 flex-[75%] text-white text-shadow-md w-full">
            <DateTime timezone={timezone} />
            <Form
              value={searchCity}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
            />
            <Area country={country} city={city} />
          </div>
          <div className="flex flex-wrap flex-[25%] bg-opacity-80 bg-gray-700 text-white justify-around items-center p-5 w-full">
            <TemperatureList temperatureList={temperatureList} />
          </div>
        </>
      ) : (
        <div className="loading flex items-center justify-center h-screen bg-black/70 w-full">
          <div className="animate-spin rounded-full h-24 w-24 border-8 border-b-0 border-gray-200" />
        </div>
      )}
    </div>
  );
};

export default Weather;
