import {Walker, GET_WALKERS, WalkerActionsTypes} from './types'
import axios from 'axios'

type DispatchType = (arg0: WalkerActionsTypes) => WalkerActionsTypes;


export const getWalkers = ():any => async (dispatch:DispatchType) => {
    const {data} = await axios.get(`http://192.168.1.35:3001/walkers`)
    return dispatch({ type: GET_WALKERS, payload: data })
}
