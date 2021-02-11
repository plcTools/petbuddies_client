import {
  GET_OWNER_FAVORITES,
  GET_OWNER,
  GET_USER_FAV_GROOMERS,
  OwnerActionsTypes,
  GET_OWNER_FAV_HOTELS,
  THEME,
} from "./types";
import axios from "axios";

type DispatchType = (arg0: OwnerActionsTypes) => OwnerActionsTypes;

export const getUserFavorites = (id: string): any => async (
  dispatch: DispatchType
) => {
  const {
    data: { favorites },
  } = await axios.get(`/owners/${id}/favorites`);
  return dispatch({ type: GET_OWNER_FAVORITES, payload: favorites });
};

export const getOwnerFavHotels = (id: string): any => async (
  dispatch: DispatchType
) => {
  const {
    data: { favoritesHotels },
  } = await axios.get(`/hotels/${id}/favorites`);

  return dispatch({ type: GET_OWNER_FAV_HOTELS, payload: favoritesHotels });
};

export const getOwnerFavGroomers = (userId: string): any => async (
  dispatch: DispatchType
) => {
  const {
    data: { favoritesGroomers },
  } = await axios.get(`/groomer/${userId}/favorites`);
  return dispatch({ type: GET_USER_FAV_GROOMERS, payload: favoritesGroomers });
};

export const getOwner = (id: string): any => async (dispatch: DispatchType) => {
  const {
    data: { owner },
  } = await axios.get(`/owners/${id}`);
  return dispatch({ type: GET_OWNER, payload: owner });
};

export const changeTheme = () => {
  return {
    type: THEME,
  };
};
