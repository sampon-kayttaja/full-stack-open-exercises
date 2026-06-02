import weatherService from '../services/weather'
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.capital)
      .then(data => {
        setWeatherData(data)
    })
  }, [country.capital])

  if (!weatherData) {
    return <p>Loading weather data...</p>
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>   
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather icon" />
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  )
}

export default Weather

