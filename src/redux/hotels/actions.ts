import { Hotel, GET_HOTELS, HotelActionsTypes } from "./types";
import axios from "axios";

type DispatchType = (arg0: HotelActionsTypes) => HotelActionsTypes;

export const getHotels = (): any => async (
  dispatch: DispatchType
) => {
  const {
    data: hotels,
  } = await axios.get(`/hotels`);
  return dispatch({ type: GET_HOTELS, payload: hotels });
};

