import {Walker, GET_WALKERS, WalkerActionsTypes} from './types'

export function getWalkers(walker: Walker[]): WalkerActionsTypes  {
    return {
        type: GET_WALKERS,
        payload: walker
    }
}
