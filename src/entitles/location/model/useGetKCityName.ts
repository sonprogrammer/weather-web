import { fetchKCityName } from "@/entitles/location/api/fetchKCityName";
import { useQuery } from "@tanstack/react-query";

export const useGetKCityName = (lat?: number, lon?: number) => {
    return useQuery({
        queryKey: ['KCityName', lat, lon],
        queryFn: () => fetchKCityName(lat!, lon!),
        enabled: !!lat && !!lon,
        staleTime: Infinity
    })
}