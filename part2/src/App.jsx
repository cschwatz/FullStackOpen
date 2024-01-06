import { useState, useEffect } from 'react'
import countryService from './services/countries'

const FilterCountry = ({handleFilter}) => {
  return (
    <div>
      find countries<input
        onChange={handleFilter}
      />
    </div>
  )
}

const ListCountries = ({countryList, filter}) => {
  const filteredCountries = countryList.filter(country => country.name.common.includes(filter))
  console.log(filteredCountries)
  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>
          Too many matches, specify another filter
        </p>
      </div>
    )
  } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map(country => (
          <p key={country.id}>
            {country.name.common}
          </p>
        ))}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <h3>{filteredCountries[0].name.common} {filteredCountries[0].flag}</h3>
        <p>Capital: {filteredCountries[0].capital}</p>
        <p>Area: {filteredCountries[0].area} km^2</p>
        <p>Languages:</p>
        <ul>
          {Object.values(filteredCountries[0].languages).map(language => (
            <li>
              {language}
            </li>
          ))}
        </ul>
        <p>Flag:</p>
        <img src={filteredCountries[0].flags.png}/>
      </div>
    )
  }
  
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('fetching all data from api, this may take a few seconds')
    countryService
    .getAll()
    .then(returnedObj => {
      setCountries(returnedObj)
      // alert('Countries data has been loaded!')
    })
  }, [])

  return(
    <div>
      <FilterCountry
        handleFilter={handleFilterChange}
      />
      <ListCountries countryList={countries} filter={newFilter}/>
    </div>
  )
}

export default App