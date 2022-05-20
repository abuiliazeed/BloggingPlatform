

import { useState } from 'react'
import { Form, TextField, Submit } from '@redwoodjs/forms'

const WeatherPage = () => {
  const [weather, setWeather] = useState()

  const onSubmit = (data) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${data.zip},us&appid=f72063edaa945717be8af75412558d92`
    )
      .then((response) => response.json())
      .then((json) => setWeather(json))
  }

  const temp = () => Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32)

  const condition = () => weather.weather[0].main

  const icon = () => {
    return `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ fontSize: '2rem' }}>
        <TextField className='bg-gray-100  rounded-sm '
          name="zip"
          placeholder="Zip code"
          maxLength="5"
          validation={{ required: true, pattern: /^\d{5}$/ }}
        />
        <Submit className='bg-green-400 px-10 m-2 rounded-md text-white'>Go</Submit>
      </Form>
      {weather && (
        <section className='p-12 bg-white shadow rounded-b text-4xl'>
          <h1>{weather.name}</h1>
          <h2>
            <img src={icon()} style={{ maxWidth: '2rem' }} />
            <span>
              {temp()}°F and {condition()}
            </span>
          </h2>
        </section>
      )}
    </>
  )
}

export default WeatherPage


