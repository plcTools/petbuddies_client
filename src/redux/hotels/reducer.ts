import {
  HotelActionsTypes,
  GET_HOTELS,
  HotelState,
  Hotel,
} from "./types";

const initialState: HotelState = {
  hotels: [],
};

export function hotelReducer(
  state = initialState,
  action: HotelActionsTypes
): HotelState {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    
    default:
      return state;
  }
}
