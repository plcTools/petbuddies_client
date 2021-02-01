import {Owner, GET_OWNER_FAVORITES, GET_OWNER, OwnerActionsTypes, OwnerAction } from './types'
import axios from 'axios'

type DispatchType = (arg0: OwnerActionsTypes) => OwnerActionsTypes;
type DispatchTypes = (arg0: OwnerAction) => OwnerAction;



export const getUserFavorites = (id:string):any => async (dispatch:DispatchType) => {
    const {data: {favorites}} = await axios.get(`/owners/${id}/favorites`)
    return dispatch({ type: GET_OWNER_FAVORITES, payload: favorites })
}

export const getOwner = (id:string):any => async (dispatch: DispatchTypes) => {
    const {data: {owner}} = await axios.get(`/owners/${id}`)
    return dispatch({ type: GET_OWNER, payload: owner})
}
