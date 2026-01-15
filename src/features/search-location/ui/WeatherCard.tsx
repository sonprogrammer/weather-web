import type { WeatherState } from "@/entitles/weather/model/types"
import { HourlyForecast } from "@/features/search-location/ui/HourlyForecast"

export const WeatherCard = ({ weather }: { weather: WeatherState }) => {
    return (
        <div className="weather-card mt-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
            {weather.isFallBack && (
                <p className="text-xs text-orange-500 mb-2 bg-orange-50 p-2 rounded-lg">
                    ⚠️ {weather.originalName}의 정확한 좌표가 없어 인근 {weather.name} 날씨를 표시합니다.
                </p>
            )}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">{weather.name}</h2>
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
                <h3 className="text-sm font-bold text-slate-800">시간대별 예보</h3>
                <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                    24시간 정보 제공
                </span>
            </div>
            
            <HourlyForecast hourly={weather.hourly} />
        </div>
    )
}