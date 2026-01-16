import type { WeatherState } from "@/entitles/weather/model/types";

export interface SavedCardProps {
    weather: WeatherState;
    isSaved: boolean;
    toggle: () => void;
}