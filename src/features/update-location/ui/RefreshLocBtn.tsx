import { Button } from "@/components/ui/button"
import { useGetLocation } from "@/entitles/location/model/useGetLocation"
import { cn } from "@/lib/utils"
import { RefreshCw } from "lucide-react"


export const RefreshLocBtn = () => {
    const { refetch, isFetching} = useGetLocation()

    const handleRefresh = async() => {
        await refetch()
    }
    
    return(
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full cursor-pointer"
            onClick={handleRefresh}
            disabled={isFetching}
        >
            <RefreshCw 
                className={cn(
                "h-4 w-4 transition-transform",
                isFetching && "animate-spin"
                )}
            />
            <span className="sr-only">현재 위치 새로고침</span>
        </Button>
    )
}