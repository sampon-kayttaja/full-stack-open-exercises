const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } 
  else if (filteredCountries.length === 0) {
    return <p>No countries found</p>
  } 
  else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    )
  } 
  else {
    return (
      <div>
        {filteredCountries.map(country => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    )
  }
}
export default Countries