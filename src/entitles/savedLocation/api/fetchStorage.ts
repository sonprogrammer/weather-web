
import type { WeatherState } from "@/entitles/weather/model/types"

export const fetchStorage = {
    get: (): WeatherState[] => {
        const data = localStorage.getItem('saved')
        return data ? JSON.parse(data) : []
    },
    set: (saved: WeatherState[]) =>{
        localStorage.setItem('saved', JSON.stringify(saved))
    } 
}