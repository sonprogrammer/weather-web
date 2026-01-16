import type { District } from '@/entitles/district/model/types';
import { useState, useEffect } from 'react'




export const useRecentSearches = () => {
    const [recentList, setRecentList] = useState<District[]>(() =>{
        const saved = localStorage.getItem('history')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(recentList));
    }, [recentList])

    const addRecent = (city: District) => {
        const filtered = recentList.filter(item => item.id !== city.id)
        const newList = [city, ...filtered].slice(0, 5)
        
        setRecentList(newList);
        localStorage.setItem('history', JSON.stringify(newList));
    }

    const removeRecent = (id: string | number) => {
        setRecentList(prev => prev.filter(item => item.id !== id));
    }

    const clearRecent = () => {
        setRecentList([]);
        localStorage.removeItem('history')
    };

    return { recentList, addRecent, clearRecent, removeRecent }
};