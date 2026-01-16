// TODO 삭제 해도됨 전역상태로 바꿈

import { fetchStorage } from "@/entitles/savedLocation/api/fetchStorage";
import type { WeatherState } from "@/entitles/weather/model/types";
import {  useState, useTransition } from "react";

export const useSaved = () => {
    const [savedList, setSavedList] = useState(() =>fetchStorage.get())
    const [isPending, startTransition] = useTransition() //* 버튼을 로딩상태로 만들때 사용

    const checkIsSaved = (cityName: string) => {
        return savedList.some(s => s.name === cityName)
    }

    const toggleSave = (location: WeatherState) => {
        if(!location) return

        startTransition(() => {
            let updatedList
            const isSaved = savedList.some(s => s.name === location.name)
            if (isSaved) {
                updatedList = savedList.filter(f => f.name !== location.name)
            } else {
                if (savedList.length >= 6) {
                    alert("즐겨찾기는 최대 6개까지만 가능합니다.")
                    return
                }
                updatedList = [...savedList, location];
            }
            
            setSavedList(updatedList);
            fetchStorage.set(updatedList);
        })
    }

    const updateName =(originalName: string, nickName: string) => {
        startTransition(() => {
            const updatedNickNameList = savedList.map(list => {
                return list.name === originalName ? { ...list, nickName} : list
            })
            setSavedList(updatedNickNameList)
            fetchStorage.set(updatedNickNameList)
        })
    }
    return { checkIsSaved, toggleSave, isPending, savedList, updateName }
}