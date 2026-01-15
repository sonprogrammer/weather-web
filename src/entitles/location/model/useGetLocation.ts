import { checkLocation } from "@/entitles/location/libs/checkLocation";
import { useQuery } from "@tanstack/react-query";


export const useGetLocation = () => {
    return useQuery({
        queryKey: ['My-location'],
        queryFn: checkLocation,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 *60
    })
}