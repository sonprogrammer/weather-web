
import { useSavedStore } from "@/features/saved-location/model/useSavedStore";
import { SavedCard } from "@/entitles/weather/ui/SavedCard";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToggleSavedButton } from "@/features/saved-location/ui/ToggleSavedBtn";

export const SavedList = () => {
    const savedList = useSavedStore(state => state.savedList)
    const updatedName = useSavedStore(state => state.updatedName)

    const navigate = useNavigate()

    if (!savedList || savedList.length === 0) {
        return (
            <section className="mt-10 px-6 py-10 bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center mx-4">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Star className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">자주 확인하는 지역을</p>
                <p className="text-slate-400 text-sm">즐겨찾기에 추가해보세요.</p>
            </section>
        );
    }

    return (
        <section className="mt-12 px-4 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-end justify-between mb-6 px-2">
                <div className="ml-5">
                    <h3 className="text-xl font-bold text-slate-900 leading-none mb-1">즐겨찾는 지역</h3>
                    <p className="text-xs text-slate-400">저장된 도시들의 날씨를 빠르게 확인합니다.</p>
                </div>
                <span className="text-[12px] font-bold bg-blue-50 text-blue-500 px-2 py-1 rounded-full border border-blue-100">
                    {savedList.length} / 6
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 mt-6">
                {savedList.map((weather) => (
                        <SavedCard
                            key={weather.name}
                            weather={weather}
                            updatedName={(newNick) =>updatedName(weather.name, newNick)}
                            actionSlot={<ToggleSavedButton weather={weather} locationName={weather.name} />}
                            onClick={() => navigate(`/detail/${weather.name}`, { state: { weatherData: weather } })}
                        />
                ))}
            </div>
        </section>
    )
}