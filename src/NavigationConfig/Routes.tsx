import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WalkerCard from '../components/WalkerCard';
import WalkerProfile from '../components/WalkerProfile';
import UserPannel from '../components/UserPannel';
import UserFormScreen from '../components/UserFormScreen/UserFormScreen';
import LoginScreen from '../components/LoginScreen';
import { RootStackParamList } from './types';
import HomeScreen from '../components/homeScreen';


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

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  const Tab = createBottomTabNavigator()
  const TabNavigation = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='UserPannel' component={UserPannel} />
      </Tab.Navigator>
    )
  }
/*   const Drawer = createDrawerNavigator() */

return (
  
    <NavigationContainer>
      <Navigator >
        <Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
        <Screen name='Tab' component={TabNavigation} options={{headerShown: false}} />
        <Screen name='UserFormScreen' component={UserFormScreen} />
        <Screen name='WalkerCard' component={WalkerCard} />
        <Screen name='WalkerProfile' component={WalkerProfile} />
      </Navigator>
    </NavigationContainer>
  ) 
}