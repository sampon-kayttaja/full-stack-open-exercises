const SingleCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  )
}

export default SingleCountry