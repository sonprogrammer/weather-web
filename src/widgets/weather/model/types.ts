import type { Coords } from "@/entitles/district/model/types";

export interface SearchWidgetProps{
    onLocationSelect?: (coords: Coords) => void;
}