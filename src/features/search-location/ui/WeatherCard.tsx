import type { WeatherState } from "@/entitles/weather/model/types"
import { HourlyForecast } from "@/features/search-location/ui/HourlyForecast"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button" 
import { cn } from "@/lib/utils"
import { useSavedStore } from "@/features/saved-location/model/useSavedStore"

export const WeatherCard = ({ weather,myLocationName }: { weather: WeatherState,myLocationName: string }) => {
    const savedList = useSavedStore(state => state.savedList)
    const toggleSave= useSavedStore(state => state.toggleSave)



    const isSaved = savedList.some(s => s.name === (myLocationName || weather.name))

    
    const handleToggle = () => {
        const weatherSave = {
            ...weather,
            name: myLocationName || weather.name
        }
        toggleSave(weatherSave)
    }
    console.log('weahter', weather)

    
    return (
        <div className="weather-card mt-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
            {weather.isFallBack && (
                <p className="text-xs text-orange-500 mb-2 bg-orange-50 p-2 rounded-lg">
                    ⚠️ {weather.originalName}의 정확한 좌표가 없어 인근 {weather.name} 날씨를 표시합니다.
                </p>
            )}
            <div className="flex justify-between items-center">
                <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{`${myLocationName ? myLocationName : weather.name}`}</h2>

                    <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg border"
                            onClick={() =>handleToggle()}
                        >
                            <Star 
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    isSaved ? "fill-yellow-400 text-yellow-400" : "text-slate-500"
                                )} 
                            />
                            <span className="sr-only">즐겨찾기 추가</span>
                        </Button>
                        </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="text-4xl font-black">{weather.currentTemp}°</span>
                        <span className="text-slate-500">{weather.description}</span>
                    </div>
                </div>
                <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} className="w-20" alt="weather" />
            </div>
            <div className="flex gap-3 text-sm mt-2 font-medium text-slate-400">
                <span>최고: {weather.maximumTemp}°</span>
                <span>최저: {weather.minimumTemp}°</span>
            </div>

            <div className="mt-8 -mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">3시간대별 예보</h3>
                <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                    24시간 정보 제공
                </span>
            </div>
            
            <HourlyForecast hourly={weather.hourly} />
        </div>
    )
}