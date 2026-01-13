import { SearchLocation } from "@/features/search-location/ui/SearchLocation";

export const Home = () => {
    return(
        <div>
            <div>
                <h1>
                    Weather
                </h1>
                <p>
                    날씨를 검색해보세요
                </p>
                <div className="border border-black">
                    <SearchLocation />
                </div>
            </div>
        </div>
    )
}