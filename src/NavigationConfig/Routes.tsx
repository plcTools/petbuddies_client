import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WalkerCard from '../components/WalkerCard';
import WalkerProfile from '../components/WalkerProfile';
import UserPannel from '../components/UserPannel';
// import UserFormScreen from '../components/UserFormScreen/UserFormScreen';
import LoginScreen from '../components/LoginScreen';
import { RootStackParamList } from './types';
import HomeScreen from '../components/homeScreen';
import { Icon } from 'react-native-elements';
import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans'


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
  let [fonts] = useFonts({ NunitoSans_400Regular });

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  const Tab = createBottomTabNavigator()
  const TabNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName='HomeScreen'
        tabBarOptions={{
          inactiveTintColor: '#fdfafa',
          activeTintColor: '#008891',
          style: {
            backgroundColor: '#c98c70'
          },
          showLabel: false,

        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            type Icons = {
              [key: string]: string;
            }

            let icons: Icons;
            icons = { Home: "home", Profile: "user" };

            if (route.name === 'Walkers') return null;

            return (
              <Icon
                name={`${icons[route.name]}`}
                type='font-awesome'
                color={color}
                size={size}
              />
            );
          },
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Profile' component={UserPannel} />
      </Tab.Navigator>
    )
  }
  /*   const Drawer = createDrawerNavigator() */
  if (!fonts) return <Icon name='spinner' reverse type='font-awesome-5' />
  return (

    <NavigationContainer>
      <Navigator >
        <Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Screen name='Tab' component={TabNavigation} options={{ headerShown: false }} />
        <Screen name='WalkerCard' component={WalkerCard} />
        <Screen name='WalkerProfile' component={WalkerProfile} />
      </Navigator>
    </NavigationContainer>
  )
}


// estilos del header
{/* <Stack.Navigator
      initialRouteName='Tab'
      screenOptions={({navigation}) => ({
        title: 'PetBuddies',
        headerStyle: {
          backgroundColor: '#364f6b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <Icon
            reverse
            name="message"
            color='#364f6b'
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />)
      })}></Stack.Navigator> */}