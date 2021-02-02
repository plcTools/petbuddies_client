export interface Owner {
  _id?: string;
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
  workZone?: string[];
  workHours?: string;
  fee?: number;
  countDogs?: number;
  rating?: number;
}
export interface OwnerState {
  userFavorites: Owner[];
  owner: Owner;
}

export const GET_OWNER_FAVORITES: string = "GET_OWNER_FAVORITES";
export const GET_OWNER: string = "GET_OWNER";

interface GetOwnerFavorites {
  type: typeof GET_OWNER_FAVORITES;
  payload: Owner[];
}

interface GetOwner {
  type: typeof GET_OWNER;
  payload: Owner;
}

export type OwnerActionsTypes = GetOwnerFavorites | GetOwner;
// export type OwnerAction = GetOwner;
