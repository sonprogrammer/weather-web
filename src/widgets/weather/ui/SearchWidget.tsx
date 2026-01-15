import { getCoordsByCity } from "@/entitles/district/api/fetchDistricts"
import type { Coords, District } from "@/entitles/district/model/types"
import { useDistricts } from "@/entitles/district/model/useGetDistricts"
import { useGetWeather } from "@/entitles/weather/model/useGetWeather"
import { SearchInput } from "@/features/search-location/ui/SearchInput"
import { WeatherCard } from "@/features/search-location/ui/WeatherCard"
import { useState } from "react"

export const SearchWidget = () => {
    const [query, setQuery] = useState('')
    const [selectedCoords, setSelectedCoords] = useState<Coords | null>(null)

        //* json파일 받아오는거
        const { data: districts, isPending, isError } = useDistricts()
        // * 지역의 위도 경도 값을 보내서 그 지역 날씨 가져오기
        const { data: weather, isLoading: isWeatherLoading } = useGetWeather(selectedCoords)

        const filteredResults = (query.trim() && districts)
        ? districts.filter(d => d.fullName.includes(query)).slice(0, 10)
        : []


        const handleCityClick = async (city: District) => {
            const coords = await getCoordsByCity(city.neighborhood || city.district || city.city, city.city);
            if (coords) {
                const newCoords =({
                    lat: coords.lat,
                    lon: coords.lon,
                    name: coords.name,
                    isFallBack: coords.isFallBack,
                    originalName: coords.originalName || city.fullName
                })
                setSelectedCoords(newCoords)
                setQuery('');

                
            }
        }
        
        if (isError) return <div className="p-4 text-red-500">데이터를 불러오지 못했습니다.</div>
        if (isPending) return <div className="p-10 text-center">지역 정보를 준비 중...</div>
    return(
        <div className="flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
            <SearchInput 
                query={query} 
                setQuery={setQuery} 
                results={filteredResults} 
                onCityClick={handleCityClick} 
            />

            <div className="mt-6">
                {isWeatherLoading && (
                    <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}

                {!isWeatherLoading && weather && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <WeatherCard weather={weather} />
                    </div>
                )}
            </div>
        </div>
    )
}