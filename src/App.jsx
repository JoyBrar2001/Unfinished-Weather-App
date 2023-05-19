import React, { useEffect, useState } from 'react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import Time_Location from './components/Time_Location'
import Temperature_Details from './components/Temperature_Details'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/weatherService'

const App = () => {

  const [query, setQuery] = useState({ q: 'Ludhiana' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then(data => setWeather(data))

    }
    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if(!weather)
      return 'from-cyan-700 to-blue-700'
    
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold)
      return 'from-cyan-700 to-blue-700'
    else
      return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`mx-auto w-full max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
          <Time_Location weather={weather} />
          <Temperature_Details weather={weather} />

          <Forecast title="Hourly Forecase" />
          <Forecast title="Daily Forecase" />
        </div>
      )}

    </div>
  )
}

export default App
