export interface Peluqueria {
    _id: string;
    name: string;
    photo?: string[];
    workDays?: string;
    workHours?: string;
    services?: string[];
    reviews: number;
    phone?: number;
    whatsapp?: number;
    mail: string;
    address?: string;
    localidad: string;
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