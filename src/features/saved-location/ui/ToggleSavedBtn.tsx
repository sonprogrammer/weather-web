import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSavedStore } from "../model/useSavedStore"
import type { WeatherState } from "@/entitles/weather/model/types"

interface ToggleSavedButtonProps {
    weather: WeatherState
    locationName: string
}

export const ToggleSavedButton = ({ weather, locationName }: ToggleSavedButtonProps) => {
    const savedList = useSavedStore((state) => state.savedList)
    const toggleSave = useSavedStore((state) => state.toggleSave)

    const isSaved = savedList.some((s) => s.name === locationName)

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const weatherToSave = {
            ...weather,
            name: locationName,
        }
        toggleSave(weatherToSave)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg border shadow-sm transition-all hover:bg-slate-50"
            onClick={handleToggle}
        >
            <Star
                className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isSaved ? "fill-yellow-400 text-yellow-400 scale-110" : "text-slate-400"
                )}
            />
            <span className="sr-only">즐겨찾기 토글</span>
        </Button>
    )
}