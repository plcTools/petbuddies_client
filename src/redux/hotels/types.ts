export interface Hotel {
  _id?: string;
  name?: string;
  photo?:string;
  schedule?:string;
  description?:string;
  fee?:number;
  allowedPets?:string[];
  foodInclude?:boolean;
  requirement?:string;
  zone?:string;
  celphone?:string;
  allowedNumber?:number;
  checkIn?:number;
  checkOut?:number;
  email?:string;
  address?:string;
  reviewsReceived?:number;
  rating?:number;
  petsLoved?:number;
  extras?:string[]
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
