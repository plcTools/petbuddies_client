import { StackNavigationProp } from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native'

export type RootStackParamList = {
    WalkerCard: undefined;
    Prueba: undefined;
    WalkerProfile: {id: number};
    UserPannel: undefined;
    UserFormScreen:undefined;
    HomeScreen: undefined;
    LoginScreen: undefined;
    Home: undefined;
    Drawer: undefined;
    Stack: undefined
    Tab: undefined;
    TabNavigation: undefined;
  };

export type RouteStackParamList<T extends keyof RootStackParamList> = {
  navigation:  StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>
}