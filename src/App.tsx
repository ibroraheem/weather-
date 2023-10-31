import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TemperatureList from './components/TemperatureList'
import DateTime from './components/DateTime'
import Area from './components/Area'
import Form from './components/Form'
import './assets/weather.css'
import { unixToDay } from './utils/Functions'

const DEFAULT_CITY = 'lagos'
const PATH_BASE = 'https://api.openweathermap.org/data/2.5/forecast'
const PATH_SEARCH = '/daily?'
const PATH_CITY = 'q='
const PATH_COUNT = 'cnt='
const PATH_UNIT = 'units=metric'
const PATH_APPID = 'appid='
const API_KEY = 'c0c4a4b4047b97ebc5948ac9c48c0559'

const Weather = () => {
  const [weather, setWeather] = useState(null)
  const [searchCity, setSearchCity] = useState(DEFAULT_CITY)
  const [currentCity, setCurrentCity] = useState(null)
  const [error, setError] = useState(false)
  const [isFetched, setIsFetched] = useState(false)

  const needsToFetchWeather = (searchCity) => {
    return !weather[searchCity]
  }

  const setSearchWeather = (res, searchCity) => {
    const { city, list } = res
    const { name, country, timezone } = city
    const weatherList = { ...weather }
    const temperatureList = []

    list.forEach((item) => {
      const { dt, temp, weather } = item

      temperatureList.push({
        day: unixToDay(dt),
        temperature: temp.day,
        weatherDescription: weather[0].description,
        weatherIcon: weather[0].icon
      })
    })

    const currentCityData = {
      city: name,
      country,
      timezone,
      temperatureList
    }

    const newWeather = {
      [searchCity]: currentCityData,
      ...weatherList
    }

    setIsFetched(true)
    setSearchCity(searchCity)
    setCurrentCity(currentCityData)
    setWeather(newWeather)

    console.log('api call:', currentCityData)
  }

  const fetchPreviousWeather = (searchCity) => {
    if (weather[searchCity]) {
      setCurrentCity(weather[searchCity])
    }

    console.log('cache log:', currentCity)
  }

  const fetchWeather = (searchCity, count = 6) => {
    const api = `${PATH_BASE}${PATH_SEARCH}${PATH_CITY}${searchCity}&${PATH_COUNT}${count}&${PATH_UNIT}&${PATH_APPID}${API_KEY}`

    axios(api)
      .then((res) => {
        setSearchWeather(res.data, searchCity)
      })
      .catch((error) => {
        alert('No weather data found for this city')
        setError(true)
      })
  }

  const onSearchChange = (event) => {
    if (event.target.value.length < 3) return
    setSearchCity(event.target.value)
  }

  const onSearchSubmit = (event) => {
    const { searchCity } = searchCity
    needsToFetchWeather(searchCity)
      ? fetchWeather(searchCity)
      : fetchPreviousWeather(searchCity)
    event.preventDefault()
  }

  useEffect(() => {
    fetchWeather(searchCity)
  }, [searchCity])

  const { city, country, timezone, temperatureList } =
    (isFetched && currentCity) || {}

  return (
    <div className="weather">
      {isFetched ? (
        <>
          <div className="weather-top">
            <DateTime timezone={timezone} />
            <Form
              value={searchCity}
              onChange={() => {}}
              onSubmit={onSearchSubmit}
            />
            <Area country={country} city={city} />
          </div>

          <TemperatureList temperatureList={temperatureList} />
        </>
      ) : null}
    </div>
  )
}

export default Weather
