import {Owner, GET_OWNER_FAVORITES, OwnerActionsTypes} from './types'
import axios from 'axios'

type DispatchType = (arg0: OwnerActionsTypes) => OwnerActionsTypes;


export const getUserFavorites = (id:string):any => async (dispatch:DispatchType) => {
    const {data: {favorites}} = await axios.get(`https://henry-petbuddies.herokuapp.com/owners/${id}/favorites`)
    return dispatch({ type: GET_OWNER_FAVORITES, payload: favorites })
}
