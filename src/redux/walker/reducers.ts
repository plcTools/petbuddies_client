import React from 'react';
import {
    WalkerActionsTypes,
    GET_WALKERS,
    MODIFY_WALKERS,
    WalkerState,
    Walker
} from './types'

const initialState: WalkerState = {
    walkers: []
}

export function walkerReducer(state = initialState, action: WalkerActionsTypes): WalkerState {
    switch (action.type) {
        case GET_WALKERS:
            return {
                walkers: action.payload
            }
        case MODIFY_WALKERS:
            const newWalkers = state.walkers.map((walker: Walker) => {
                if (walker._id === action.payload.reviewedId) {
                    const totalReviews = walker.reviewsReceived.concat(action.payload.rating)
                    const sum = totalReviews.reduce((sum: number, acc: number) => sum + acc)
                    const prom = sum / totalReviews.length
                    walker.rating = parseInt(prom.toFixed(2));
                    return walker;
                } else return walker;
            })
            return {
                walkers: newWalkers
            }
        default:
            return state;
    }
}