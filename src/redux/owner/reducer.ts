import { 
    OwnerActionsTypes,
    GET_OWNER_FAVORITES,
    OwnerState,
    Owner
} from './types'

const initialState:OwnerState = {
    userFavorites: [] 
}

export function userReducer(state = initialState, action: OwnerActionsTypes): OwnerState {
    switch(action.type) {
        case GET_OWNER_FAVORITES:
            return {
                userFavorites: action.payload
            }
        default: 
        return state;
    }
}