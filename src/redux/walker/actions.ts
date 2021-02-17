import {Walker, GET_WALKERS,MODIFY_WALKERS, WalkerActionsTypes } from './types'
import axios from 'axios'

type DispatchType = (arg0: WalkerActionsTypes) => WalkerActionsTypes;

export const getWalkers = ():any => async (dispatch:DispatchType) => {
    const {data} = await axios.get(`/walkers`)
    return dispatch({ type: GET_WALKERS, payload: data })
}
export const modifyWalkers = (data: any) => async (dispatch:DispatchType) => {
    return dispatch ({type: MODIFY_WALKERS, payload: data})
}
