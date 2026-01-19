import type { District } from "@/entitles/district/model/types";
import { axiosInstance } from "@/shared/api/axiosInstance";
import axios from "axios";
import { REGION_COORDS } from "@/shared/constants/regionCoords";


export const fetchDistricts = async(): Promise<District[]> => {

    const res = await axios.get<string[]>('/korea_districts.json')
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

export const getCoordsByCity = async(cityName: string, fallback?: string) => {
    if(REGION_COORDS[cityName]){
        return{
            lat:REGION_COORDS[cityName].lat,
            lon:REGION_COORDS[cityName].lon,
            name:REGION_COORDS[cityName].name,
            isFallBack: false,
        }
    }
    
    const res = await axiosInstance.get('https://api.openweathermap.org/geo/1.0/direct',{
        baseURL: '',
        params: {
            q: `${cityName},KR`,
            limit: 1
        }
    })

    if(res.data?.[0]){
        const data = res.data[0]
        return{
            lat: data.lat,
            lon: data.lon,
            name: data.local_names.ko || data.name,
            isFallBack: false
        }
    }

    if(fallback && REGION_COORDS[fallback]){
        return {
            lat: REGION_COORDS[fallback].lat,
            lon: REGION_COORDS[fallback].lon,
            name: REGION_COORDS[fallback].name,
            isFallBack: true,
            originalName: cityName
        }
    }

    return null

}