import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const returnObj = axios.get(`${baseUrl}/api/all`)
    return returnObj.then(response => response.data)
}

const getCountryWeather = (lat, lon) => {
    const returnObj = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a7094335e757dbafeeba617fc5491dc&units=metric`)
    console.log(returnObj)
    return returnObj.then(response => response.data)
}

export default {getAll, getCountryWeather}