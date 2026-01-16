import { axiosInstance } from "@/shared/api/axiosInstance";

export const fetchKCityName = async (lat?: number,lon?: number) => {
    try {
        const res = await axiosInstance.get('https://api.openweathermap.org/geo/1.0/reverse', {
            params: {
                lat,
                lon,
                limit: 1,
            }
        })

        console.log('res.data', res.data)
        return res.data[0].local_names.ko
        
    } catch (error) {
        console.log('error from fetchKCityName', error)
        return '알수 없는 지역'
    }
}