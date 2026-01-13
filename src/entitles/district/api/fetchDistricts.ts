import type { District } from "@/entitles/district/model/types";
import { axiosInstance } from "@/shared/api/base";
import axios from "axios";


export const fetchDistricts = async(): Promise<District[]> => {

    const res = await axios.get<string[]>('/korea_districts.json')
    console.log('res from fetchDistrict', res.data)
    const data = res.data

    return data.map(str => {
        const parts = str.split('-')
        return{
            city: parts[0] || '',
            district: parts[1] || '',
            neighborhood: parts[2] || '',
            id: str,
            fullName: parts.join(' ')
        }
    })
}

export const getCoordsByCity = async(cityName: string) => {
    const res = await axiosInstance.get('https://api.openweathermap.org/geo/1.0/direct',{
        baseURL: '',
        params: {
            q: cityName,
            limit: 1
        }
    })

    const data = res.data[0]
    console.log('weather data from fetchDistricts', data)
    if(!data) return null

    return{
        lat: data.lat,
        lon: data.lon,
        name: data.name
    }
}