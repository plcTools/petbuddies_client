import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Prueba from '../Prueba';
import WalkerCard from '../WalkerCard';
import UserPannel from '../UserPannel';
import UserFormScreen from '../UserFormScreen/UserFormScreen';

import { RootStackParamList } from './types';
import { Icon } from 'react-native-elements'
import HomeScreen from '../homeScreen';
import { DrawerActions } from '@react-navigation/native';

/* 
    Para agregar una ruta tenemos que hacer lo siguiente:
    1)Agregarla al stack en este mismo archivo.
    2)Ir al archivo '/NavigationConfig/types' y agregar el componente a RootStackParamList con sus props.
    3) ir al componente nuevo que creamos y pasarle el prop {navigation}: RootStackParamList<'nombre_componente'>

*/
/* 
  Tenemos que ver el tema de Nested-Navigation. 
  Ver que componente va en cada NAVIGATOR (TAB, DRAWER, STACK)
*/

export const Routes: React.FC = () => {

  const Stack = createStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const AppTab = () => {
    return (
      <Tab.Navigator initialRouteName='HomeScreen'>
        <Tab.Screen name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='UsePannel' component={UserPannel} />
      </Tab.Navigator>
    )
  }
  const DrawerTab = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Prueba' component={Prueba}/>
      </Drawer.Navigator>
    )
  }
  const StackNavigation = () => {
    return (
      <Stack.Navigator
      initialRouteName='Tab'
      screenOptions={({navigation}) => ({
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
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />)
      })}>
      <Stack.Screen name='Tab' component={AppTab} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='Drawer' component={DrawerTab} />
      <Stack.Screen name='UserFormScreen' component={UserFormScreen} />
      <Stack.Screen name='WalkerCard' component={WalkerCard} />
      <Stack.Screen name='Stack' component={StackNavigation} />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
     <StackNavigation/>
    </NavigationContainer>
  )
}