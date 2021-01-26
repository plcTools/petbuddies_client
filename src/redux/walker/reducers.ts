import { 
    WalkerActionsTypes,
    GET_WALKERS,
    WalkerState,
    Walker
} from './types'

const initialState:WalkerState = {
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