/* import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; */
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    WalkerCard: undefined;
    Prueba: undefined;
    WalkerProfile: undefined;
  };

export type RouteStackParamList<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>
}