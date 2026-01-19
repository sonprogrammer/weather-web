import { useGetKCityName } from "@/entitles/location/model/useGetKCityName"
import { useGetLocation } from "@/entitles/location/model/useGetLocation"
import { useGetWeather } from "@/entitles/weather/model/useGetWeather"
import { WeatherCard } from "@/entitles/weather/ui/WeatherCard"
import { RefreshLocBtn } from "@/features/update-location/ui/RefreshLocBtn"
import { ToggleSavedButton } from "@/features/saved-location/ui/ToggleSavedBtn"

export const  MyLocationWidget = () => {

    // * 현재 위치 위도 경도 가져오기
    const { data: myLocation, isPending: isLocationLoading } = useGetLocation()
    //* 현재위치 한글 지명 가져오기
    const { data: KCityName, isPending: isNameLoading } = useGetKCityName(myLocation?.lat, myLocation?.lon)
    // *현재 위치 날씨정보 가져오기
    const { data: weather, isPending: isWeatherLoading } = useGetWeather(
        myLocation ? { lat: myLocation.lat!, lon: myLocation.lon!, name: KCityName } : null
    )

    const isLoading = isLocationLoading || isWeatherLoading || isNameLoading

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-slate-500 font-medium">현재 위치의 날씨를 확인 중입니다...</p>
        </div>
    )

    if (!weather) {
        return (
            <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-3xl">
                날씨 정보를 불러올 수 없습니다.
            </div>
        )
    }
    
    return (
        <section className="w-full">
            <div className="animate-in fade-in zoom-in-95 duration-700">

                <div className="flex items-center justify-between">

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        현재 위치 : {KCityName}
                    </div>
                    <RefreshLocBtn />
                </div>

                <WeatherCard
                    weather={weather}
                    actionSlot={
                        <ToggleSavedButton
                            weather={weather}
                            locationName={KCityName}
                        />
                    }
                />

            </div>

        </section>
    )
}