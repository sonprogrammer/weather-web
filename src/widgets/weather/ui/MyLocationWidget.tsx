import { useGetLocation } from "@/entitles/location/model/useGetLocation"
import { useGetWeather } from "@/entitles/weather/model/useGetWeather"
import { WeatherCard } from "@/features/search-location/ui/WeatherCard"

export const MyLocationWidget = () => {

    const { data: myLocation, isPending:isLocationLoading, isError} = useGetLocation()
    console.log('myLocaion', myLocation)

    const {data:weather, isPending: isWeatherLoading} = useGetWeather(
        myLocation ? { lat: myLocation.lat!, lon: myLocation.lon!, name: '현재위치' } : null
    )
    console.log('weather from widget', weather)

    const isLoading = isLocationLoading || isWeatherLoading
    
    return (
        <section className="w-full">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl backdrop-blur-sm">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-slate-500 font-medium">현재 위치의 날씨를 확인 중입니다...</p>
                </div>
            ) : isLocationLoading ? (
                <div className="p-8 text-center bg-orange-50 rounded-3xl border border-orange-100">
                    <p className="text-orange-600 font-medium mb-2">위치 정보를 가져올 수 없어요</p>
                    <p className="text-orange-400 text-sm">
                        {isError && "권한을 거부하셨거나 일시적인 오류입니다." }
                    </p>
                </div>
            ) : weather ? (
                <div className="animate-in fade-in zoom-in-95 duration-700">

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        현재 위치 : {weather.cityKName}
                    </div>
                    <WeatherCard weather={weather} />
                </div>
            ) : (
                <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-3xl">
                    날씨 정보를 불러올 수 없습니다.
                </div>
            )}
        </section>
    )
}