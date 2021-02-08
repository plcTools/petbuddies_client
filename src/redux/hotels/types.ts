export interface Hotel {
  _id: string;
  name: string;
  logo?:string;
  workHours:string;
  workDays: string;
  description?:string;
  adPics: string[];
  fee:number;
  reviewsReceived?:number;
  rating:number;
  phone:string;
  email:string;
  address:string;
  zone:string;
  provincia: string;
  pais: string;
  latitude: number;
  longitude: number;
  allowedNumber?:number;
  checkIn?:number;
  checkOut?:number;
  petsLoved?:number;
  extras?:string[]
  allowedPets?:string[];
  foodInclude?:boolean;
  requirement?:string;
}
export interface HotelState {
  hotels: Hotel[];
}

export const GET_HOTELS = "GET_HOTELS";

interface GetHotels {
  type: typeof GET_HOTELS;
  payload: Hotel[];
}

export type HotelActionsTypes = GetHotels ;
