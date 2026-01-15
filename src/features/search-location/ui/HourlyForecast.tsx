import type { HourData } from "@/entitles/weather/model/types"
import { useEffect, useRef, useState } from "react";

export const HourlyForecast = ({ hourly }: { hourly: HourData[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showLeftBtn, setShowLeftBtn] = useState(false)
    const [showRightBtn, setShowRightBtn] = useState(true)

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

            setShowLeftBtn(scrollLeft > 0)
            console.log('scrollLeft', scrollLeft)
            
            setShowRightBtn(scrollLeft + clientWidth < scrollWidth - 1)
            console.log('scrollWidth', scrollWidth)
            console.log('clientWidth', clientWidth)
        }
    }


    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current
            const moveDistance = clientWidth * 0.5

            scrollRef.current.scrollBy({
                left: direction === 'left' ? -moveDistance : moveDistance,
                behavior: 'smooth'
            });
        }
    }

    useEffect(() => {
        checkScrollPosition()

        const currentRef = scrollRef.current
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScrollPosition)
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScrollPosition)
            }
        };
    }, [hourly])

    return (
        <div className="relative group w-full">

            {showLeftBtn && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                     bg-white/90 shadow-lg rounded-full w-8 h-8 flex items-center
                      justify-center hover:bg-white transition-all duration-300 border
                       border-slate-100 opacity-0 group-hover:opacity-100"
                >
                    <span className="text-slate-600 text-xs">←</span>
                </button>
            )}

            <div
                ref={scrollRef}
                className="hourly-list flex overflow-x-auto gap-4 mt-4 scrollbar-hide no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {hourly.map((h, i) => (
                    <div key={i} className="flex flex-col items-center min-w-14 py-2">
                        <span className={`text-[11px] whitespace-nowrap ${h.isTmw ? 'text-purple-500 font-bold' : 'text-slate-400 font-medium'}`}>
                            {h.time === '0시' && h.isTmw ? '내일' : h.time}
                        </span>
                        <img
                            src={`https://openweathermap.org/img/wn/${h.icon}.png`}
                            className="w-10 h-10 select-none"
                            alt="weather"
                        />
                        <span className="font-bold text-slate-700 text-sm">{h.temp}°</span>
                    </div>
                ))}
            </div>

            {showRightBtn && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     bg-white/90 shadow-lg rounded-full w-8 h-8 flex items-center
                      justify-center hover:bg-white transition-all duration-300 border
                       border-slate-100 opacity-0 group-hover:opacity-100"
                >
                    <span className="text-slate-600 text-xs">→</span>
                </button>
            )}
        </div>
    )
}