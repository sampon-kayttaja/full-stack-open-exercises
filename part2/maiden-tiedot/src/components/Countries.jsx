import Button from './Button'
import SingleCountry from './SingleCountry'


const Countries = ({ filteredCountries, handleShowCountry }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } 
  else if (filteredCountries.length === 0) {
    return <p>No countries found</p>
  } 
  else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <SingleCountry country={country} />
    )
  } 
  else {
    return (
      <div>
        {filteredCountries.map(country => (
          <p key={country.name.common}>{country.name.common}
            <Button text="Show" onClick={() => handleShowCountry(country)}/>
          </p>
        ))}
      </div>
    )
  }
}

export default Countries