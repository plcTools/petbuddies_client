export interface Owner {
    _id: string;
    name?: string;
    description?: string;
    lastname?: string;
    email?: string;
    password?: string;
    cellphone?: number;
    adress?: string;
    zona?: string;
    dni?: number;
    photo?: string;
    role?: string;
    CUIT?: string;
    workZone: string[];
    workHours?: string;
    fee?: number;
    countDogs: number;
    rating: number;
  }
  export interface OwnerState {
    userFavorites: Owner[]
  }
  
  export const GET_OWNER_FAVORITES = 'GET_OWNER_FAVORITES';
  
  interface GetOwnerFavorites {
    type: typeof GET_OWNER_FAVORITES;
    payload: Owner[]
  }
  
  export type OwnerActionsTypes = GetOwnerFavorites