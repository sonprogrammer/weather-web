import { axiosInstance } from "@/shared/api/axiosInstance"

export const fetchWeather = async(lat:number, lon:number) => {
    console.log('fetchWeather lat, lon', lat, lon)
    const [currentRes, dailyRes] = await Promise.all([
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
        })
    ])

    console.log('curren', currentRes.data)
 
    return{
        currentRes: currentRes.data,
        dailyRes: dailyRes.data,
    }
}