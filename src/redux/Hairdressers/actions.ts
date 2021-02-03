import { HairdessersActionsTypes, GET_HAIRDRESSERS } from './types';
import axios from 'axios';

type HairDresserDispatchType = (arg0: HairdessersActionsTypes) => HairdessersActionsTypes;

export const getHairdressers = ():any => async (dispatch:HairDresserDispatchType) => {
    const { data } = await axios.get ('/groomer');
    return dispatch ({ type: GET_HAIRDRESSERS, payload: data })
}