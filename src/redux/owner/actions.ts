import {Owner, GET_OWNER_FAVORITES, OwnerActionsTypes} from './types'
import axios from 'axios'

type DispatchType = (arg0: OwnerActionsTypes) => OwnerActionsTypes;


export const getUserFavorites = (id:string):any => async (dispatch:DispatchType) => {
    const {data: {favorites}} = await axios.get(`http://192.168.1.35:3001/owners/${id}/favorites`)
    return dispatch({ type: GET_OWNER_FAVORITES, payload: favorites })
}
