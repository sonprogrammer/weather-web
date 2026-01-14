import { useState } from "react";
import { useDistricts } from "@/entitles/district/model/useGetDistricts";
import type { District } from "@/entitles/district/model/types";
import { getCoordsByCity } from "@/entitles/district/api/fetchDistricts";
import { axiosInstance } from "@/shared/api/base";
import dayjs from "dayjs";

export const SearchLocation = () => {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState<any>(null)

    const { data: districts, isPending, isError} = useDistricts()
    // console.log('district', districts)

    const filteredResults = (query.trim() && districts) 
        ? districts.filter(d => d.id.includes(query)).slice(0, 10)
        : []

        if(isPending) return <div>데이터 로딩 중...</div>
        if(isError) return <div>데이터를 불러오지 못했습니다.</div>

        
    const handleCityClick = async(cities: District) => {
        try {
            const searchCity = cities.neighborhood || cities.district || cities.city

            const fallbackCity = cities.city

            const coords = await getCoordsByCity(searchCity, fallbackCity)

            // console.log('coorde', coords)
            if(coords){
                // console.log('좌표', coords.lat, coords.lon)

                const res = await axiosInstance.get('/weather', {
                    params: {
                        lat: coords.lat,
                        lon: coords.lon,
                    }
                })
                const dailyRes = await axiosInstance.get('/forecast',{
                    params: {
                        lat: coords.lat,
                        lon: coords.lon
                    }
                })
                const today = dayjs().format('YYYY-MM-DD')
                console.log('today', today)

                const climateDatas = dailyRes.data.list
                const todayFilter = climateDatas.filter(data => {
                    const sortDay = data.dt_txt.split(' ')[0]
                    return sortDay === today
                })
                
                const targetData = climateDatas.length > 0 ? todayFilter : climateDatas.slice(0, 8)
                
                console.log('todayfilter', targetData)

                const dailyTemps = targetData.map(c => c.main.temp)
                const maximumTemp = Math.max(...dailyTemps)
                const minimumTemp = Math.min(...dailyTemps)
                console.log('temp', maximumTemp, minimumTemp)
                
                console.log('daily', dailyRes)
                setWeather({...res.data,
                             name: coords.name,
                             maximumTemp: Math.max(...dailyTemps),
                             minimumTemp: Math.min(...dailyTemps)
                            })
                setQuery('')
                console.log('current weather', res.data)
            }
        } catch (error) {
            console.log('errorr', error)
        }
    }
        
    console.log('weather', weather)
    return(
        <div>
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="지역을 검색해 주세요."
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {filteredResults.length > 0 && (
                <ul>
                    {filteredResults.map(result => (
                        <li
                            key={result.id}
                            onClick={() => handleCityClick(result)}
                        >
                            {result.fullName}
                        </li>
                    ))}
                </ul>
            )}

            {weather && (
                <div className="mt-10 p-6 bg-blue-500 text-white rounded-2xl shadow-lg animate-in zoom-in duration-300">
                    <h2 className="text-xl font-bold">{weather.name}</h2>
                    <p className="text-4xl font-extrabold my-2">{Math.round(weather.main.temp)}°C</p>
                    <p>{weather.weather[0].description}</p>
                    <div className="flex gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <div className="flex-1 text-center">
                            <p className="text-xs opacity-70 mb-1">최고</p>
                            <p className="font-bold text-red-200">{Math.round(weather.maximumTemp)}°</p>
                        </div>
                        <div className="w-1 bg-white/20" />
                        <div className="flex-1 text-center">
                            <p className="text-xs opacity-70 mb-1">최저</p>
                            <p className="font-bold text-blue-200">{Math.round(weather.minimumTemp)}°</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}