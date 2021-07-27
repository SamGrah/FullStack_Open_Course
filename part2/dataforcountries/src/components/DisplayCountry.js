import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountry = ({ list }) => {
  const [ weather, setWeather ] = useState({
      temperature: '',
      weather_icons: '',
  })
  const [ country ] = list


  const api_key = process.env.REACT_APP_API_KEY;
  const host = "http://api.weatherstack.com/"
  const requestParams = `current?access_key=${api_key}&query=${country.capital}`
  const apiRequest = `${host}${requestParams}`

  const fetchWeather = () => {
    (async () => {
      const weatherDetails = await axios.get(apiRequest)
      setWeather(weatherDetails.data.current)
    })()
  }
  useEffect(fetchWeather, [])


  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken Languages</h2>
      <ul>
        {country.languages.map(lang=> <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt="country flag" width="180"></img>
      <h2>Weather in {country.capital}</h2>
      <div>
        <strong>temperatue:</strong> {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons} alt='weather icon'></img>
      <div>
        <strong>wind: </strong>{weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  )
}

export default DisplayCountry
