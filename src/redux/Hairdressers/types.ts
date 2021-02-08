export interface Peluqueria {
    _id: string;
    name: string;
    logo?: string;
    workHours: string;
    workDays: string;
    description: string;
    adPics?: string[];
    fee: number;
    reviewsReceived?: number;
    rating: number;
    phone: string;
    email: string;
    adress: string;
    zone: string;
    provincia: string;
    latitude: number;
    longitude: number;
    services?: string[];
}

export interface HairdressersState {
    peluquerias: Peluqueria[]
}

export const GET_HAIRDRESSERS = 'GET_HAIRDRESSERS';

interface GetHairdressersAction {
    type: typeof GET_HAIRDRESSERS,
    payload: Peluqueria[]
}

export type HairdessersActionsTypes = GetHairdressersAction;