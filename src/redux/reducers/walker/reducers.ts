import { 
    WalkerActionsTypes,
    GET_WALKERS,
    WalkerState
} from './types'

const initialState = {
    walkers: []
}

export function walkerReducer(state = initialState, action: WalkerActionsTypes): WalkerState {
    switch(action.type) {
        case GET_WALKERS:
            return {
                walkers: action.payload
            }
        default: 
        return state;
    }
}