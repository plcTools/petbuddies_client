import { GET_HAIRDRESSERS, HairdessersActionsTypes, HairdressersState, MODIFY_HAIRDRESSER, Peluqueria } from './types'

const initialState: HairdressersState = {
    peluquerias: []
}

export function hairdresserReducer(state = initialState, action: HairdessersActionsTypes): HairdressersState {
    switch (action.type) {
        case GET_HAIRDRESSERS:
            return {
                ...state,
                peluquerias: action.payload
            }
        case MODIFY_HAIRDRESSER:
            const newHairdressers = state.peluquerias.map((peluqueria: Peluqueria) => {
                if (peluqueria._id === action.payload.reviewedId) {
                    const totalReviews = peluqueria.reviewsReceived.concat(action.payload.rating)
                    const sum = totalReviews.reduce((sum: number, acc: number) => sum + acc)
                    const prom = sum / totalReviews.length
                    peluqueria.rating = parseInt(prom.toFixed(2));
                    return peluqueria;
                } else return peluqueria;
            });
            return {
                peluquerias: newHairdressers
            }

        default:
            return state
    }
}