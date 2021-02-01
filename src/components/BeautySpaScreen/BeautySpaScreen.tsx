import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import SpaCard from './SpaCard/spaCard';
import { RouteStackParamList } from '../../NavigationConfig/types';
import { useAppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getHairdressers } from '../../redux/Hairdressers/actions';

function BeautySpaScreen() {
    /* hay que hacer un .map */
    const dispatch = useAppDispatch ();
    const peluquerias = useSelector((state: RootState) => state.peluqueros.peluquerias);

    useEffect (() => {
        dispatch (getHairdressers ())
    }, [])

    return (
        <ScrollView>
            <View style={{backgroundColor:'grey'}}>
              {peluquerias.map (peluqueria => <SpaCard peluqueria={peluqueria} />)}  
            </View>
            
        </ScrollView>
    )
}

export default BeautySpaScreen;