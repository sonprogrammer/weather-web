
import type { SavedCardProps } from "@/entitles/weather/model/types";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";



export const SavedCard = ({ weather, actionSlot, onClick, updatedName }: SavedCardProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [areaName, setAreaName] = useState<string>(weather.nickName || weather.name)

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (updatedName) {
            updatedName(areaName)
            setIsEditing(false)
        }
    }

    return (
        <div
            onClick={onClick}
            className="group relative cursor-pointer p-5 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                <input
                                    autoFocus
                                    value={areaName}
                                    onChange={e => setAreaName(e.target.value)}
                                    className="text-sm font-bold border-b-2 border-blue-500 outline-none w-24"
                                />
                                <button onClick={handleSave} className="text-green-500 cursor-pointer hover:scale-125">
                                    <Check size={16} />
                                    <span className="sr-only">수정 확인 버튼</span>
                                </button>
                                <button onClick={() => setIsEditing(false)} className="text-red-400 cursor-pointer hover:scale-125">
                                    <X size={16} />
                                    <span className="sr-only">수정 취소 버튼</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <h3 className="font-extrabold text-lg text-slate-800 tracking-tight">
                                    {weather.nickName || weather.name}
                                </h3>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                                    className="p-2 -m-1 lg:opacity-0 lg:group-hover:opacity-100 bg-slate-50 lg:bg-transparent rounded-full lg:rounded-md transition-all active:bg-slate-200"
                                >
                                    <Pencil size={12} className="text-slate-400" />
                                    <span className="sr-only">수정 버튼</span>
                                </button>
                            </div>
                        )}
                        {actionSlot}
                    </div>
                    {weather.nickName && <p className="text-[10px] text-slate-300 font-bold uppercase">{weather.name}</p>}
                    <p className="text-sm font-medium text-slate-400">{weather.description}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-1 group-hover:scale-110 transition-transform duration-300">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                        alt={weather.description}
                        className="w-12 h-12 object-contain"
                    />
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-1">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{weather.currentTemp}°</span>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400/80 uppercase tracking-wider">
                    최고 {weather.maximumTemp}° / 최저 {weather.minimumTemp}°
                </div>
            </div>
        </div>
    )
}