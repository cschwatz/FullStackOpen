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

const ListCountries = ({countryList, filter, handleShowInfo, showInfo, currentCountry, currentWeather}) => {
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
              {showInfo && currentWeather && (currentCountry.name.common === country.name.common) ? (
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
                  <h3>Weather in {country.capital}</h3>
                  <p>Current temperature: {currentWeather.main.feels_like} degrees Celsius</p>
                  <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}/>
                  <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
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
  const [currentWeather, setCurrentWeather] = useState(null)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowInfo = (selectedCountry) => {
    console.log(selectedCountry)
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
  // hook 1 -> fetch all country data and load into an array
  useEffect(() => {
    console.log('fetching all data from api, this may take a few seconds')
    countryService
    .getAll()
    .then(returnedObj => {
      setCountries(returnedObj)
    })
  }, [])

  // hook2 -> fetch weather data from a single country when the 'show' button for that country is selected
  useEffect(() => {
    console.log('retrieving weather information')
    // need this condition since currentCountry === null in first render
    if (currentCountry) {
      const currentCountryLat = currentCountry.latlng[0] 
      const currentCountryLon = currentCountry.latlng[1]
      countryService
      .getCountryWeather(currentCountryLat, currentCountryLon)
      .then(returnedObj => setCurrentWeather(returnedObj))
      console.log(currentWeather)
    }
  }, [currentCountry])

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
      currentWeather={currentWeather}
      />
    </div>
  )
}

export default App