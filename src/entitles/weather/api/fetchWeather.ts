import { axiosInstance } from "@/shared/api/axiosInstance"

export const fetchWeather = async(lat:number, lon:number) => {
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

 
    return{
        currentRes: currentRes.data,
        dailyRes: dailyRes.data,
    }
}