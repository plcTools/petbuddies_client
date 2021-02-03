import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WalkerCard from '../components/WalkerCard';
import WalkerProfile from '../components/WalkerProfile';
import UserPannel from '../components/UserPannel';
import HotelScreen from '../components/Hotel';
import HotelProfile from '../components/Hotel/HotelProfile';
import HotelCard from '../components/Hotel/HotelCard';
// import UserFormScreen from '../components/UserFormScreen/UserFormScreen';
import LoginScreen from '../components/LoginScreen';
import { RootStackParamList } from './types';
import HomeScreen from '../components/homeScreen';
import BeatySpaScreen from '../components/BeautySpaScreen/BeautySpaScreen';
import { Icon } from 'react-native-elements';
import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans'
import BeautySpaScreen from '../components/BeautySpaScreen/BeautySpaScreen'
import SelectRol from '../components/SelectRol';
import WalkerForm from "../components/WalkerForm";
import {Image, View} from 'react-native'

export const Routes: React.FC = () => {
  let [fonts] = useFonts({ NunitoSans_400Regular });

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  const Tab = createBottomTabNavigator();
  const TabNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        tabBarOptions={{
          inactiveTintColor: "#fdfafa",
          activeTintColor: "#008891",
          style: {
            backgroundColor: "#c98c70",
          },
          showLabel: false,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            type Icons = {
              [key: string]: string;
            };

            let icons: Icons;
            icons = { Home: "walking", Hotel: 'bed', Peluquerias: 'cut' };

            if (route.name === "Walkers") return null;

            return (
              <Icon
                name={`${icons[route.name]}`}
                type='font-awesome-5'
                color={color}
                size={size}
              />
            );
          },
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Hotel' component={HotelScreen} />
        <Tab.Screen name='Peluquerias' component={BeautySpaScreen} />
      </Tab.Navigator>
    );
  };
  /*   const Drawer = createDrawerNavigator() */
  if(!fonts) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image 
          source={require('../images/loader.gif')}
          style={{width: 200, height: 150}}
        />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Navigator screenOptions={({ navigation }) => ({
        title: 'PetBuddies',
        headerStyle: {
          backgroundColor: '#c98c70',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <Icon
            reverse
            name="user"
            type='font-awesome'
            color='#c98c70'
            size={20}
            onPress={() => navigation.navigate("Profile")}
          />)

      })}>
        <Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Screen name='SelectRol' component={SelectRol} options={{ headerShown: false }} />
        <Screen name='Tab' component={TabNavigation} options={() => ({headerLeft: null})} />
        <Screen name='WalkerCard' component={WalkerCard} />
        <Screen name="WalkerForm" component={WalkerForm} options={{ headerShown: true }} />
        <Screen name='BeautySpaScreen' component={BeatySpaScreen} options={{ headerShown: false }} />
        <Screen name='WalkerProfile' component={WalkerProfile} />
        <Screen name='HotelCard' component={HotelCard} />
        <Screen name='HotelProfile' component={HotelProfile} />
        <Screen name='Profile' component={UserPannel} />
      </Navigator>
    </NavigationContainer>
  );
};

// estilos del header
{
  /* <Stack.Navigator
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
      })}></Stack.Navigator> */
}
