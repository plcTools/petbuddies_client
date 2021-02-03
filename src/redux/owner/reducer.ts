import { 
    OwnerActionsTypes,
    GET_OWNER_FAVORITES,
    GET_OWNER_FAV_HOTELS,
    GET_OWNER,
    OwnerState,
    GET_USER_FAV_GROOMERS
} from './types'

const initialState:OwnerState  = {
    userFavorites: [],
    owner: [],
    userFavHotels:[],
    userFavGroomers: []
}

export function userReducer(state = initialState, action: any/* : OwnerActionsTypes */): OwnerState {
    switch (action.type) {
      case GET_OWNER_FAVORITES:
        return {
          ...state,
          userFavorites: action.payload,
        };
      case GET_OWNER:
        return {
          ...state,
          owner: action.payload,
        };
      case GET_OWNER_FAV_HOTELS:
        return{
          ...state,
          userFavHotels: action.payload
        };
      case GET_USER_FAV_GROOMERS:
        return {
          ...state,
          userFavGroomers: action.payload
        }
      default:
        return state;
    }
}
