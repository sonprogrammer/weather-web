export interface District {
    city: string;
    district: string;
    neighborhood: string;
    fullName: string;
    id: string;
}

export interface Coords{
    lat: number;
    lon: number;
    name: string;
    isFallBack? : boolean;
    originalName? : string;
}