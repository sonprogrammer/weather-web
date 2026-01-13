import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/3.0'

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: 'metric',
        lang: 'kr'
    }
})


// https://api.openweathermap.org/data/3.0/onecall?appid=ab7fe701b2b3f3423a7076eb0e67cf
// bb&units=metric&lang=kr&lat=36.7899498&lon=127.0026769