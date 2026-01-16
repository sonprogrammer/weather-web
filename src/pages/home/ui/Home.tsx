import { SavedList } from "@/widgets/saved/ui/SavedList";
import { MyLocationWidget } from "@/widgets/weather/ui/MyLocationWidget";
import { SearchWidget } from "@/widgets/weather/ui/SearchWidget";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
import { useState } from "react";

export const Home = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

    dayjs.locale('ko')
    const today = dayjs().format('MMMM D일 (ddd)')
    return(
        <main className="relative h-screen bg-slate-50 overflow-y-auto">

            {/* //*현재 위치 위젯 */}
            <div className={`transition-all duration-500 ease-in-out ${isSearchOpen ? 'pr-[50%]' : 'pr-0'}`}>
                <div className="max-w-md mx-auto pt-10 px-4">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-blue-500 font-bold text-sm mb-1">{today}</p>
                        <h1 className="text-2xl font-black">Weather</h1>

                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors"
                        >
                            🔍
                        </button>
                    </div>
                    <MyLocationWidget />
                </div>
            </div>
            <SavedList />

            {/* //*검색위젯 */}
            <div 
                className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50 border-l border-slate-100 ${
                    isSearchOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-6 h-full w-full">
                    <button 
                        onClick={() => setIsSearchOpen(false)}
                        className="mb-6 text-slate-400 hover:text-black font-medium"
                    >
                        ✕ 닫기
                    </button>
                    <SearchWidget />
                </div>
            </div>

            {/* //*검색창 */}
            {isSearchOpen && (
                <div 
                    className="fixed inset-0 bg-black/10 z-40"
                    onClick={() => setIsSearchOpen(false)}
                />
            )}
        </main>
    )
}