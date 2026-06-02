import { useState } from 'react'
import Filter from './components/Filter'
import countryService from './services/serverComs'
import Countries from './components/Countries'
import Notif from './components/Notif'
import SingleCountry from './components/SingleCountry'
import Button from './components/Button'
import Weather from './components/Weather'

const App = () => {
  const [countryFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState(null)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowCountry(null)
    countryService
      .getCountries(event.target.value)
      .then(response => {
        setCountries(response.data)
      })
  }

  const handleShowCountry = (country) => {
    setShowCountry(country)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  if (showCountry) {
    return (
      <div>
        <Filter 
          filter={countryFilter} 
          handleFilterChange={handleFilterChange}
        />
      <SingleCountry country={showCountry} />
      <Weather country={showCountry} />
      <Button text="Back" onClick={() => setShowCountry(null)}/>
      </div>
    )
  }
  
  else { 
    return (
      <div>
        <Filter 
          filter={countryFilter} 
          handleFilterChange={handleFilterChange}
          />
        <Countries 
          filteredCountries={filteredCountries} 
          handleShowCountry={handleShowCountry}
          />
      </div>
    )}
  }
  


export default App
