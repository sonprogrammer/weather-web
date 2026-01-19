
import type { SearchInputProps } from "@/features/search-location/model/types"
import { useRecentSearches } from "@/features/search-location/model/useRecentSearches"
import { Search, X, Clock, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"

export const SearchInput = ({ query, setQuery, results, onCityClick }: SearchInputProps) => {
    const { recentList, addRecent, removeRecent } = useRecentSearches()


    return (
        <div className="relative w-full p-2">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="국내 지역을 입력해 주세요."
                    className="pl-10 h-12 bg-white rounded-xl border-slate-200 focus-visible:ring-blue-500 transition-all shadow-sm"
                />
            </div>

            {/* //*최근 검색 5개지역 */}
            {query === "" && recentList.length > 0 && (
                <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-xs font-bold text-slate-400">최근 검색 5개 지역</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recentList.map(city => (
                            <div
                                key={city.id}
                                className="group flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50 rounded-full transition-all cursor-pointer shadow-sm"
                                onClick={() => onCityClick(city)}

                            >
                                <Clock className="h-3 w-3 text-slate-300 group-hover:text-blue-400" />
                                <span className="text-sm font-medium text-slate-600">
                                    {city.fullName}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeRecent(city.id)
                                        }}
                                        className="ml-1 p-0.5 rounded-full hover:bg-slate-200 text-slate-300 hover:text-slate-600 transition-colors"
                                    >
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">검색 내역에서 삭제 버튼</span>
                                    </button>
                                </span>
                            </div>

                        ))}
                    </div>
                </div>
            )}

            {/* //* 검색 내역 */}
            {query.trim() !== "" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                    {results.length > 0 ? (
                        <div className="max-h-50 overflow-y-auto">
                        <ul className="divide-y divide-slate-50">
                            {results.map(city => (
                                <li
                                    key={city.id}
                                    onClick={() => {
                                        addRecent(city)
                                        onCityClick(city)
                                    }}
                                    className="flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer transition-colors group"
                                >
                                    <MapPin className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                                    <span className="text-sm font-medium text-slate-700">{city.fullName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    ) : (
                        <div className="py-12 text-center">
                            결과가 없습니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}