import type { LocationCoords } from "@/entitles/location/model/types"

export const checkLocation = (): Promise<LocationCoords> => {
    return new Promise((res, rej) => {
        if(!navigator.geolocation){
            return rej(new Error('브라우저가 위치 서비스를 지원하지 않습니다.'))
        }

        navigator.geolocation.getCurrentPosition(
            (position) => res({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }),
            (err) => rej(err)

        )
    })
}