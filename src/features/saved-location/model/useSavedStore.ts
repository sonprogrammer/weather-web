import { create } from 'zustand';
import { fetchStorage } from "@/entitles/savedLocation/api/fetchStorage";
import type { WeatherState } from "@/entitles/weather/model/types";
import type {SavedState} from "@/features/saved-location/model/types"

export const useSavedStore = create<SavedState>((set, get) => ({
    savedList: fetchStorage.get(),
    checkIsSaved: (cityName: string) => {
        return get().savedList.some(s=>s.name === cityName)
    },
    toggleSave: (location: WeatherState) => {
        const {savedList} = get()
        const isExist = savedList.some(s => s.name === location.name)

        let updatedList
        if(isExist){
            updatedList = savedList.filter(s => s.name !== location.name)
        }else{
            if(savedList.length >= 6){
                alert('최대 6개까지만 저장 가능합니다.')
                return
            }
            updatedList = [...savedList, location]
        }
        set({savedList: updatedList})
        fetchStorage.set(updatedList)
    },
    updatedName: (originalName: string, nickName: string) =>{
        const { savedList } = get()
        const updatedList = savedList.map(list => 
            list.name === originalName ? {...list, nickName} : list
        )
        set({savedList: updatedList})
        fetchStorage.set(updatedList)
    }
}))