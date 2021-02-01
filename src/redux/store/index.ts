import { combineReducers, createStore, compose, applyMiddleware} from 'redux';
import {walkerReducer} from '../walker/reducers';
import {userReducer} from '../owner/reducer';
import {hotelReducer} from '../hotels/reducer'
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({paseadores: walkerReducer, user: userReducer, hotels:hotelReducer})
const composeEnhancer = compose;

export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()