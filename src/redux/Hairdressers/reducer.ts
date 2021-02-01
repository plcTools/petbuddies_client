import { GET_HAIRDRESSERS, HairdessersActionsTypes, HairdressersState } from './types'

const initialState:HairdressersState = {
    peluquerias: []
}

export function hairdresserReducer(state = initialState, action: HairdessersActionsTypes) {
    switch (action.type) {
        case GET_HAIRDRESSERS:
            return {
                ...state,
                peluquerias: action.payload
            }

        default:
            return state
    }
}