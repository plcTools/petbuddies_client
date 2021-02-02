import { 
    OwnerActionsTypes,
    GET_OWNER_FAVORITES,
    GET_OWNER,
    OwnerState,
} from './types'

const initialState:OwnerState  = {
    userFavorites: [],
    owner: {}
}

export function userReducer(state = initialState, action: OwnerActionsTypes): OwnerState {
    switch(action.type) {
        case GET_OWNER_FAVORITES:
            return {
                ...state,
                userFavorites: action.payload
            }
        case GET_OWNER:
            return {
                ...state,
                owner: action.payload
            }
        default: 
        return state;
    }
}