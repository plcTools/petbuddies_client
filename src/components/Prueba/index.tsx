import React from 'react';
import {View, Text, Button} from 'react-native';
import {Icon } from 'react-native-elements'
import {RouteStackParamList} from '../NavigationConfig/types'
import {useDispatch} from 'react-redux';
import {getWalkers} from '../../redux/reducers/walker/actions'


const Prueba =({navigation}: RouteStackParamList<'Prueba'>)=> {
    const dispatch = useDispatch();
//
    return (
        <View>
            <Text>Hello World!</Text>
            <Icon name='star-o' type='font-awesome' onPress={() => navigation.navigate('WalkerCard')}/>
            <Icon name='user-circle-o' type='font-awesome' onPress={() => navigation.navigate('UserPannel')}/>
            <Button title='press me' onPress={() => dispatch(getWalkers([{firstName: 'Manuel'}]))}></Button>
            <Icon name='heart-o' type='font-awesome' onPress={() => navigation.navigate('UserFormScreen')}/>
        </View>
    )
}

export default Prueba;