import type { District } from "@/entitles/district/model/types";

export interface SearchInputProps{
    query: string;
    setQuery: (a: string) => void;
    results: District[];
    onCityClick: (city: District) => void;
}