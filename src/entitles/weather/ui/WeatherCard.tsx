import type { WeatherState } from "../model/types"
import { HourlyForecast } from "@/entitles/weather/ui/HourlyForecast"

interface WeatherCardProps {
    weather: WeatherState
    actionSlot?: React.ReactNode 
}

export const WeatherCard = ({ weather, actionSlot }: WeatherCardProps) => {
    return (
        <div className="weather-card mt-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
            {weather.isFallBack && (
                <p className="text-[12px] text-orange-500 mb-3 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100/50">
                    ⚠️ {weather.originalName}의 정확한 좌표가 없어 인근 {weather.name} 날씨를 표시합니다.
                </p>
            )}

            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-slate-800">{`${weather.nickName ? weather.nickName : weather.name}`}</h2>
                        {actionSlot}
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">
                            {weather.currentTemp}°
                        </span>
                        <span className="text-slate-500 font-medium">{weather.description}</span>
                    </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-1">
                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                        className="w-16 h-16 object-contain" 
                        alt="weather status" 
                    />
                </div>
            </div>

            <div className="flex gap-4 text-xs mt-3 font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                    <span className="text-red-400">최고 : </span> {weather.maximumTemp}°
                </span>
                <span className="flex items-center gap-1">
                    <span className="text-blue-400">최저 : </span> {weather.minimumTemp}°
                </span>
            </div>

            <div className="h-px bg-slate-50 w-full my-6" />

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">3시간대별 예보</h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                    24시간 정보 제공
                </span>
            </div>
            
            <HourlyForecast hourly={weather.hourly} />
        </div>
    )
}