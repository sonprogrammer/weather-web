export interface WeatherRes {
    name: string;
    main: {
        temp: number; //현재기온
    },
    weather: {
        description: string;
        icon: string
    }[]
}

export interface HourData {
    time: string;
    temp: number;
    icon: string;
    isTmw: boolean;
}

export interface WeatherState {
    name: string;
    nickName?: string;
    currentTemp: number;
    isFallBack?: boolean; //도시에 대한 날씨 정보를 api가 못가져올시
    originalName?: string; //도시에 대한 날씨 정보를 api가 못가져올시
    maximumTemp: number;
    minimumTemp: number;
    description: string;
    icon: string;
    hourly: HourData[];
}

export interface ForecastData{
    dt: number;
    main: {
        temp: number;
    };
    weather: {
        icon: string
    }[]
}

