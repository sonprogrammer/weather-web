import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SavedCardProps } from "@/widgets/saved/model/types";


export const SavedCard = ({ weather, isSaved, toggle }: SavedCardProps) => {
    
    return (
        <div
            className="cursor-pointer p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all"
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-2">
                    <div>
                        <h3 className="font-bold text-lg">{weather.name}</h3>
                        <p className="text-xs text-gray-800">{weather.description}</p>
                    </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg border"
                            onClick={(e) => {
                                e.stopPropagation()
                                toggle() 
                                }
                            }
                        >
                            <Star 
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    isSaved ? "fill-yellow-400 text-yellow-400" : "text-slate-500"
                                )}
                            />
                        </Button>
                </div>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                    alt={weather.description}
                    className="w-10 h-10"
                />
            </div>
            <div className="mt-4">
                <span className="text-3xl font-black">{weather.currentTemp}°</span>
                <div className="text-xs text-slate-400 mt-1">
                    최고 {weather.maximumTemp}° / 최저 {weather.minimumTemp}°
                </div>
            </div>
        </div>
    )
}