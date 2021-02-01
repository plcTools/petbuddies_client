export interface Peluqueria {
    _id: string;
    name: string;
    photo?: string[];
    schedule?: string;
    services?: string[];
    reviews?: number;
    phone?: number;
    whatsapp?: number;
    mail: string;
    address?: string;
}

export interface PeluqueriasState {
    peluquerias: Peluqueria[]
}

export const GET_HAIRDRESSERS = 'GET_HAIRDRESSERS';

interface GetHairdressersAction {
    type: typeof GET_HAIRDRESSERS,
    payload: Peluqueria[]
}

export type HairdessersActionsTypes = GetHairdressersAction;