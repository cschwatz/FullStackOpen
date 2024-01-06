import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const returnObj = axios.get(`${baseUrl}/api/all`)
    return returnObj.then(response => response.data)
}

export default {getAll}