/* import 'react-native-gesture-handler'; */
import React from 'react';
import {Provider} from 'react-redux'
import { Routes } from './src/NavigationConfig/Routes';
import {store} from './src/redux/store';
import './src/auth/firebase';


export default function App() {
  return (
    <Provider store={store}>
      <Routes/>  
    </Provider>
  )
}