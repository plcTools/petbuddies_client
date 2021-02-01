import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import SpaCard from './SpaCard/spaCard';
import { RouteStackParamList } from '../../NavigationConfig/types';
import { useAppDispatch, RootState } from '../../redux/store/index';
import { useSelector } from 'react-redux';

const peluquerias = [
    {
        name: 'Spa Perruno',
        photos:'https://images.unsplash.com/photo-1611173622933-91942d394b04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        openDays:'Lunes a Viernes',
        workHours:'9hs to 20hs',
        services: [{id: '1', title: 'Corte Uñas'},{id: '2', title: 'Despulgue'}, {id: '1', title: 'Baño'}],
        location: 'Villa Urquiza CABA'

    },
    {
        name: 'Los Papus',
        photos:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        openDays:'Lunes a Viernes',
        workHours:'10hs to 21hs',
        services: [{id: '1', title: 'Corte Uñas'},{id: '2', title: 'Maquillaje'}, {id: '1', title: 'Baño'}],
        location: 'Caballito'
    },
    {
        name: 'Koquetos',
        photos:'https://images.unsplash.com/photo-1611173622933-91942d394b04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        openDays:'Lunes a Viernes',
        workHours:'9hs to 20hs',
        services: [{id: '1', title: 'Baño de Cremas'},{id: '2', title: 'Brushing'}, {id: '1', title: 'Baño'}],
        location: 'valle de Punilla, Cordoba'

    },
    {
        name: 'Dia de la Marmota',
        photos:'https://images.unsplash.com/photo-1611173622933-91942d394b04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        openDays:'Lunes a Viernes',
        workHours:'9hs to 20hs',
        services: [{id: '1', title: 'Baño de Cremas'},{id: '2', title: 'Flequillo'}, {id: '1', title: 'Exfoliado'}],
        location: 'Once, CABA'

    },
    {
        name: 'Perros de la calle',
        photos:'https://images.unsplash.com/photo-1611173622933-91942d394b04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        openDays:'Lunes a Viernes',
        workHours:'9hs to 20hs',
        services: [{id: '1', title: 'Baño de Cremas'},{id: '2', title: 'Sauna'}, {id: '1', title: 'Corte de uñas'}],
        location: 'Devoto, CABA'

    }
]

function BeautySpaScreen(props: any) {
    /* hay que hacer un .map */

    const peluquerias = useSelector((state: RootState) => state.hairdressers.hairdressers)

    const dispatch = useAppDispatch ();

    // const walkers = useSelector((state: RootState) => state.paseadores.walkers)
    // React.useEffect(() => {
    //     if (Object.keys(walkers).length > 0) {
    //         setState(walkers)
    //     } else {
    //         dispatch(getUserFavorites("600ae1c984ce6400985f4f7a"))
    //         dispatch(getWalkers())
    //     }
    // }, [dispatch, walkers]);

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