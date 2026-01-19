import type { Coords } from "@/entitles/district/model/types";
import { fetchWeather } from "@/entitles/weather/api/fetchWeather";
import type { ForecastData } from "@/entitles/weather/model/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";


export const useGetWeather = (coords: Coords | null) =>{
    return useQuery({
        queryKey:['weather', coords?.lat, coords?.lon],
        queryFn: () => fetchWeather(coords!.lat, coords!.lon),
        enabled: !!coords,
        select: (data) => {
            const today = dayjs().format('YYYY-MM-DD')

            // * 3시간 마다 날씨정보를 보여주는거니깐 8개 가져오기
            const hourly = data.dailyRes.list.slice(0, 8).map((data:ForecastData)=> {
                const date = dayjs(data.dt * 1000)
                const isTmw = date.format('YYYY-MM-DD') !== today

                return{
                    time: dayjs(data.dt * 1000).format('H시'),
                    temp: Math.round(data.main.temp),
                    icon: data.weather[0].icon,
                    isTmw
                }
            })

            const currentHour = {
                time: '현재',
                temp: Math.round(data.currentRes.main.temp),
                icon: data.currentRes.weather[0].icon
            }

            const finalWeatherList = [currentHour, ...hourly]

            // * 오늘날짜만 가져와서 최고, 최저온도 구하기
            const todayFilter = data.dailyRes.list.filter((data: ForecastData) => {
                return dayjs(data.dt * 1000).format('YYYY-MM-DD') === today
            })

            const todayTemps = todayFilter.length > 0 
                ? [data.currentRes.main.temp, ...todayFilter.map((t:ForecastData) => t.main.temp)]
                : [data.currentRes.main.temp]

            return{
                name: coords!.name,
                currentTemp: Math.round(data.currentRes.main.temp),
                maximumTemp : Math.round(Math.max(...todayTemps)),
                minimumTemp: Math.round(Math.min(...todayTemps)),
                description: data.currentRes.weather[0].description,
                icon: data.currentRes.weather[0].icon,
                hourly: finalWeatherList,
                isFallBack: coords?.isFallBack || false,
                originalName: coords?.originalName || coords?.name,
            }
        }
    })
}