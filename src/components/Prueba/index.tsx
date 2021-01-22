import React from 'react';
import {View, Text} from 'react-native';
import {Icon } from 'react-native-elements'
import {RouteStackParamList} from '../NavigationConfig/types'


const Prueba =({navigation}: RouteStackParamList<'Prueba'>)=> {
    
    return (
        <View>
            <Text>Hello World!</Text>
            <Icon name='star-o' type='font-awesome' onPress={() => navigation.navigate('WalkerCard')}/>
        </View>
    )
}

export default Prueba;