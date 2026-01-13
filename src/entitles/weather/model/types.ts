export interface WeatherRes{
    name: string;
    main: {
        temp: number; //현재기온
        feels_like: number; // 체감온도
        temp_max: number //최고 온도
        tem_min: number // 최저 온도
    },
    weather: Array<{
        description: string;
        icon: string
    }>
}