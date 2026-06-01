import { useState } from 'react'
import Filter from './components/Filter'
import countryService from './services/serverComs'
import Countries from './components/Countries'
import Notif from './components/Notif'

const App = () => {
  const [countryFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    countryService
      .getCountries(event.target.value)
      .then(response => {
        setCountries(response.data)
      })
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <div>
      <Filter 
        filter={countryFilter} 
        handleFilterChange={handleFilterChange}
        />
      <Countries 
        filteredCountries={filteredCountries} 
        />
    </div>
    )
}


export default App
