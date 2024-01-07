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

const ShowButton = ({handleShowInfo, country}) => {
  return (
    <button onClick={() => handleShowInfo(country)}>
      Show
    </button>
  )
}

const ListCountries = ({countryList, filter, handleShowInfo, showInfo, currentCountry}) => {
  const filteredCountries = countryList.filter(country => country.name.common.includes(filter))
  console.log(filteredCountries)
  if (filteredCountries.length > 0) {
    if (filteredCountries.length === 1) {
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
    } else if (filteredCountries.length > 10) {
      return (
        <div>
          <p>
            Too many matches, specify another filter
          </p>
        </div>
      )
    } else {
      return (
        <div>
          {filteredCountries.map(country => (
            <div key={country.id}>
              <p>
                {country.name.common} 
                <ShowButton handleShowInfo={handleShowInfo} country={country}/>
              </p>
              {showInfo && (currentCountry.name.common === country.name.common) ? (
                <div>
                  {/* Render detailed information for the selected country */}
                  <h3>{country.name.common} {country.flag}</h3>
                  <p>Capital: {country.capital}</p>
                  <p>Area: {country.area} km^2</p>
                  <p>Languages:</p>
                  <ul>
                    {Object.values(country.languages).map((language, index) => (
                      <li key={index}>
                        {language}
                      </li>
                    ))}
                  </ul>
                  <p>Flag:</p>
                  <img src={country.flags.png} alt={`${country.name.common} flag`} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )
    }
  } 
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [currentCountry, setCurrentCountry] = useState(null)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowInfo = (selectedCountry) => {
    if (selectedCountry !== currentCountry) {
      if (showInfo) {
        setCurrentCountry(selectedCountry)
      } else {
        setShowInfo(!showInfo)
        setCurrentCountry(selectedCountry)
      }
    } else {
      setShowInfo(!showInfo)
      setCurrentCountry(null)
    }
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
      <ListCountries 
      countryList={countries} 
      filter={newFilter} 
      handleShowInfo={handleShowInfo}
      showInfo={showInfo}
      currentCountry={currentCountry}
      />
    </div>
  )
}

export default App