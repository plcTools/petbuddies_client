import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';
import SpaCard from './SpaCard/spaCard';
import { RouteStackParamList } from '../../NavigationConfig/types';
import { useAppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getHairdressers } from '../../redux/Hairdressers/actions';

function BeautySpaScreen() {
    /* hay que hacer un .map */
    const dispatch = useAppDispatch();
    const peluquerias = useSelector((state: RootState) => state.peluqueros.peluquerias);

    useEffect(() => {
        dispatch(getHairdressers())
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, width: '100%', justifyContent: 'center', padding:8 }}>
            <ScrollView>
                {peluquerias.map(peluqueria => <SpaCard id={peluqueria._id} peluqueria={peluqueria} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

export default BeautySpaScreen;