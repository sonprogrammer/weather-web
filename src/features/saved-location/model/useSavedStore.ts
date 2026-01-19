
import { create } from 'zustand';
import { fetchStorage } from "@/entitles/savedLocation/api/fetchStorage";
import type { WeatherState } from "@/entitles/weather/model/types";
import type {SavedState} from "@/features/saved-location/model/types"
import toast from 'react-hot-toast';

export const useSavedStore = create<SavedState>((set, get) => ({
    savedList: fetchStorage.get(),
    checkIsSaved: (cityName: string) => {
        return get().savedList.some(s=>s.name === cityName)
    },
    toggleSave: (weather: WeatherState) => {
        const {savedList} = get()
        const isExist = savedList.some(s => s.name === weather.name)
        let updatedList
        if(isExist){
            updatedList = savedList.filter(s => s.name !== weather.name)
            set({ savedList: updatedList })
            toast.dismiss()
            toast.success(`${weather.name} 날씨가 삭제 되었습니다.`)
            return
        }else{
            if(savedList.length >= 6){
                toast.error('최대 6개까지만 저장 가능합니다.')
                return
            }
            updatedList = [...savedList, weather]
        }
        set({savedList: updatedList})
        toast.dismiss()
        toast.success(`${weather.name} 날씨가 추가 되었습니다.`)
        fetchStorage.set(updatedList)
    },
    updatedName: (originalName: string, nickName: string) =>{
        const { savedList } = get()
        const updatedList = savedList.map(list => 
            list.name === originalName ? {...list, nickName} : list
        )
        set({savedList: updatedList})
        fetchStorage.set(updatedList)
    },
    
}))