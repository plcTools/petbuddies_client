import { GET_HAIRDRESSERS, HairdessersActionsTypes } from './types'

const initialState = {
    hairdressers: []
}

export function hairdresserReducer(state = initialState, action: HairdessersActionsTypes) {
    switch (action.type) {
        case GET_HAIRDRESSERS:
            return {
                ...state,
                hairdressers: action.payload
            }

        default:
            return state
    }
}