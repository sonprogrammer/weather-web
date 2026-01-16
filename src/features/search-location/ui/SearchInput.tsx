import type { District } from "@/entitles/district/model/types"
import type { SearchInputProps } from "@/features/search-location/model/types"
import { useRecentSearches } from "@/features/search-location/model/useRecentSearches"

export const SearchInput = ({ query, setQuery, results, onCityClick }: SearchInputProps) => {
    const { recentList, addRecent, removeRecent } = useRecentSearches()

    const handleHistoryClick = (city: District) => {
        addRecent(city)
        onCityClick(city)
    }

    return (
        <div className="relative w-full p-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="국내 지역을 입력해 주세요."
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {query === "" && recentList.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xs font-bold text-slate-400 mb-2 px-1">최근 검색 5개 지역</h3>
                    <div className="flex flex-wrap gap-2 px-1">
                        {recentList.map(city => (
                                <button
                                    key={city.id}
                                    onClick={() => onCityClick(city)}
                                    className="px-3 py-1.5 flex gap-2 bg-slate-100 hover:bg-slate-200
                                     text-slate-600 text-sm rounded-full transition-colors"
                                >
                                    {city.fullName}
                                    <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeRecent(city.id)
                                    }}
                                        className="hover:bg-slate-300 rounded-full w-5 h-5 cursor-pointer
                                        transition-opacity text-slate-400 hover:text-slate-600"
                                    >X</span>
                                </button>

                        ))}
                    </div>
                </div>
            )}


            {query.trim() !== "" && (
                <div className="absolute z-10 left-2 right-2 mt-2 bg-white border rounded-xl shadow-xl overflow-hidden">
                    {results.length > 0 ? (
                        <ul>
                            {results.map(city => (
                                <li
                                    key={city.id}
                                    onClick={() => handleHistoryClick(city)} 
                                    className="p-4 hover:bg-blue-50 cursor-pointer border-b last:border-none"
                                >
                                    📍 {city.fullName}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-6 text-center text-slate-500 text-sm">
                            결과가 없습니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}