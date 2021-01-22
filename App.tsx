import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import UserFormScreen from './components/userForm/UserForm'
import { NavigationScreenProp } from 'react-navigation';

export interface HomeScreenProps{
  navigation: NavigationScreenProp<any,any>
};


const HomeScreen:React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Icon
  raised
  name='heartbeat'
  type='font-awesome'
  color='#f50'
  onPress={() => navigation.navigate('UserFormScreen')} />
    </View>
  );
}

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserForm">
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{
            title: 'Petbuddies',
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
          }} />
        <Stack.Screen name="UserForm" component={UserFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}