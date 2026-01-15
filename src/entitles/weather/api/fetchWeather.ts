import { axiosInstance } from "@/shared/api/axiosInstance"

export const fetchWeather = async(lat:number, lon:number) => {
    console.log('fetchWeather lat, lon', lat, lon)
    const [currentRes, dailyRes, citryName] = await Promise.all([
        axiosInstance.get('/weather', {
            params:{
                lat,
                lon
            }   
        }),
        axiosInstance.get('/forecast', {
            params:{
                lat,
                lon
            }   
        }),
        axiosInstance.get('https://api.openweathermap.org/geo/1.0/reverse',{
            params: {
                lat,
                lon,
                limit: 0,

            }
        })
    ])
 
    const cityName = citryName.data[0]?.local_names?.ko || citryName.data[0]?.name || "알 수 없는 지역";
    return{
        currentRes: currentRes.data,
        dailyRes: dailyRes.data,
        cityName
    }
}