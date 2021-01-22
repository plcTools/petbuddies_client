import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Prueba from '../Prueba';
import WalkerCard from '../WalkerCard';
import UserPannel from '../UserPannel';
import { RootStackParamList } from './types';
import {Icon} from 'react-native-elements'

/* 
    Para agregar una ruta tenemos que hacer lo siguiente:
    1)Agregarla al stack en este mismo archivo.
    2)Ir al archivo '/NavigationConfig/types' y agregar el componente a RootStackParamList con sus props.
    3) ir al componente nuevo que creamos y pasarle el prop {navigation}: RootStackParamList<'nombre_componente'>

*/

export const Routes: React.FC= () => {

    const Stack = createStackNavigator<RootStackParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                title: 'My home',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => (
                  <Icon
                  name="home"
                  color='#fff'
                  onPress={() => alert("hola")}
              />)
              }}>
                <Stack.Screen name='Prueba' component={Prueba}/>
                <Stack.Screen name='WalkerCard' component={WalkerCard}/>
                <Stack.Screen name='UserPannel' component={UserPannel}/>
            </Stack.Navigator>

        </NavigationContainer>
    )
}