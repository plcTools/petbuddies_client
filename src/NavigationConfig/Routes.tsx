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
import LoginScreen from '../components/LoginScreen';
import { RootStackParamList } from './types';
import WalkerScreen from '../components/WalkerScreen';
import BeatySpaScreen from '../components/BeautySpaScreen';
import { Icon } from 'react-native-elements';
import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans'
import BeautySpaScreen from '../components/BeautySpaScreen'
import SelectRol from '../components/SelectRol';
import WalkerForm from "../components/WalkerForm";
import {Image, View} from 'react-native'
import SpaProfile from '../components/BeautySpaScreen/SpaProfile/';
import ReviewsScreen from '../components/ReviewScreen/reviewsScreen';

export const Routes: React.FC = () => {
  let [fonts] = useFonts({ NunitoSans_400Regular });

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  const Tab = createBottomTabNavigator();
  const TabNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName="Walker"
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
        <Tab.Screen name='Home' component={WalkerScreen} />
        <Tab.Screen name='Hotel' component={HotelScreen} />
        <Tab.Screen name='Peluquerias' component={BeautySpaScreen} />
      </Tab.Navigator>
    );
  };
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
        <Screen name='ReviewsScreen' component={ReviewsScreen} />
        <Screen name='SpaProfile' component={SpaProfile} />
      </Navigator>
    </NavigationContainer>
  );
};
