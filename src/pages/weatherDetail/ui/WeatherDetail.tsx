import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WeatherCard } from "@/entitles/weather/ui/WeatherCard";
import { ToggleSavedButton } from "@/features/saved-location/ui/ToggleSavedBtn";

export const WeatherDetail = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const weatherData = location.state.weatherData

    if (!weatherData) {
        return (
            <div className="p-6 text-center">
                <p>날씨 데이터를 찾을 수 없습니다.</p>
                <Button onClick={() => navigate("/")}>홈으로 가기</Button>
                <span className="sr-only">홈으로 가기 버튼</span>

            </div>
        );
    }
    return(
        <main className="max-w-md mx-auto p-4">
            <header className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-6 w-6" />
                    <span className="sr-only">홈으로 가기 버튼</span>

                </Button>
                <h1 className="text-xl font-bold">상세 날씨 정보</h1>
            </header>


            <WeatherCard 
                weather={weatherData} 
                actionSlot={<ToggleSavedButton 
                    weather={weatherData}
                    locationName={weatherData.name}
                />}
            />
            
        </main>
    )
}