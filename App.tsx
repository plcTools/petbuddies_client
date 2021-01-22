import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import {  Icon } from 'react-native-elements';
import HomeScreen from './src/components/homeScreen';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name='Home' 
          component={HomeScreen} 
          options={{
            title: 'PetBuddies',
            headerStyle: {
              backgroundColor: '#3e3e3e'
            },
            headerTintColor: '#fff',
            headerRight: () => (
              <Icon 
              reverse 
              name="message"
              color= 'transparent'
              onPress={() => alert('tenes un mensaje')}
              /> 
              )
            }}
        />
        <Stack.Screen name="Profile" component={DetailsScreen} options={{
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
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}