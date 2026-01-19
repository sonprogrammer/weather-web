import { SavedList } from "@/widgets/saved/ui/SavedList";
import { MyLocationWidget } from "@/widgets/weather/ui/MyLocationWidget";
import { SearchWidget } from "@/widgets/weather/ui/SearchWidget";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

export const Home = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

    dayjs.locale('ko')
    const today = dayjs().format('MMMM D일 (ddd)')
    return (
        <main className="relative h-screen bg-slate-50 overflow-y-auto">

            {/* //*현재 위치 위젯 */}
            <div className={cn(
                "transition-all duration-500 ease-in-out",
                isSearchOpen ? "pr-[50%]" : "pr-0"
            )}
            >
                <div className="max-w-md mx-auto pt-10 px-4">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <p className="text-blue-500 font-bold text-sm mb-1">{today}</p>
                            <h1 className="text-2xl font-black">How's the Weather</h1>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsSearchOpen(true)}
                            className="rounded-full shadow-md hover:scale-105 transition-transform bg-white border-slate-100"
                        >
                            <Search className="h-5 w-5 text-slate-500" />
                            <span className="sr-only">지역 검색 버튼</span>
                        </Button>
                    </div>
                    <MyLocationWidget />
                </div>
            </div>
            <SavedList />

            {/* //*검색위젯 */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-in-out border-l border-white/20",
                    "w-full sm:w-100 md:w-112.5",
                    isSearchOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="p-4 flex">

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(false)}
                            className="mb-6 text-slate-400 w-10 h-10 transition-all hover:scale-105 rounded-full hover:bg-slate-300 hover:text-black font-medium"
                        >
                            <ArrowLeft className="h-6 w-6" />
                            <span className="sr-only">뒤로가기 버튼</span>
                        </Button>
                        <div className="flex-1 overflow-y-auto px-3 pb-6">
                            {isSearchOpen && <SearchWidget />}
                        </div>
                    </div>
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