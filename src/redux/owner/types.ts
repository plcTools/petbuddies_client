import { Hotel } from "../hotels/types";
export interface Owner {
  _id?: string;
  name: string;
  description?: string;
  lastname: string;
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
  reveiewsReceived?: number;
  countDogs?: number;
  rating: number;
}

export interface Groomer {
  _id?: string;
  name: string;
  photo?: string[];
  workHours?: string;
  workDays?: string;
  services?: string[];
  reviews: number;
  phone?: number;
  whatsapp?: number;
  mail: string;
  address?: string;
  localidad?: string;
  provincia?: string;
  pais?: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface OwnerState {
  userFavorites: Owner[];
  owner: Owner[];
  userFavHotels: Hotel[];
  userFavGroomers: Groomer[];
  theme: boolean;
}

export const GET_OWNER_FAVORITES: string = "GET_OWNER_FAVORITES";
export const GET_OWNER: string = "GET_OWNER";
export const GET_OWNER_FAV_HOTELS: string = "GET_OWNER_FAV_HOTELS";
export const GET_USER_FAV_GROOMERS: string = "GET_USER_FAV_GROOMERS";
export const THEME: string = "THEME";
export const GET_THEME: string = 'GET_THEME';

interface GetOwnerFavHotels {
  type: typeof GET_OWNER_FAV_HOTELS;
  payload: Hotel[];
}

interface GetUserFavGroomers {
  type: typeof GET_USER_FAV_GROOMERS;
  payload: Groomer[];
}

interface GetOwnerFavorites {
  type: typeof GET_OWNER_FAVORITES;
  payload: Owner[];
}

interface GetOwner {
  type: typeof GET_OWNER;
  payload: Owner;
}

interface ChangeTheme {
  type: typeof THEME;
  // payload: boolean;
}
interface GetTheme {
  type: typeof GET_THEME;
  payload: boolean
}

export type OwnerActionsTypes =
  | GetOwnerFavorites
  | GetOwner
  | GetOwnerFavHotels
  | GetUserFavGroomers
  | ChangeTheme
  | GetTheme
// export type OwnerAction = GetOwner;
