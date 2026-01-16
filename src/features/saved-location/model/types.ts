import type { WeatherState } from "@/entitles/weather/model/types"

export interface SavedState {
    savedList: WeatherState[]
    toggleSave: (location: WeatherState) => void
    updatedName: (originalName: string, nickName: string) => void
    checkIsSaved: (cityName: string) => boolean
}