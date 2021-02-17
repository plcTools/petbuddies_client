import {
  HotelActionsTypes,
  GET_HOTELS,
  MODIFY_HOTEL,
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
    case MODIFY_HOTEL:
      const newHotels = state.hotels.map((hotel: Hotel) => {
        if (hotel._id === action.payload.reviewedId) {
          const totalReviews = hotel.reviewsReceived.concat(action.payload.rating)
          const sum = totalReviews.reduce((sum: number, acc: number) => sum + acc)
          const prom = sum / totalReviews.length
          hotel.rating = parseInt(prom.toFixed(2));
          console.log(hotel)
          return hotel;
        } else return hotel;
      });
      return {
        hotels: newHotels
      }

    default:
      return state;
  }
}
