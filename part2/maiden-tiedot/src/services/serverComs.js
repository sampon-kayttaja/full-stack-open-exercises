import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  return axios.get(`${baseUrl}api/all`)
}

const getCountries = (filter) => {
  return axios.get(`${baseUrl}api/all`)
}

const getCountry = (name) => {
  return axios.get(`${baseUrl}api/name/${name}?fullText=true`)
}

export default { getAll, getCountries, getCountry }   