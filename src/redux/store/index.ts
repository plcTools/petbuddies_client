import { combineReducers, createStore, compose, applyMiddleware} from 'redux'
import {walkerReducer} from '../reducers/walker/reducers'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({paseadores: walkerReducer})
const composeEnhancer = compose;

export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>