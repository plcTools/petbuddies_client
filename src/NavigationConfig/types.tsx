import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'

export type RootStackParamList = {
  WalkerCard: {
    walker: walker,
    userFavorites: walker[]
  };
  Prueba: undefined;
  WalkerProfile: { id: number };
  UserPannel: undefined;
  UserFormScreen: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
  SelectRol: undefined;
  Home: undefined;
  Drawer: undefined;
  Stack: undefined
  Tab: undefined;
  TabNavigation: undefined;
};

export type RouteStackParamList<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>
}

export type walker = {
  _id?: string;
  name?: string;
  description?: string;
  lastname?: string;
  email?: string;
  password?: string;
  cellphone?: number;
  adress?: string;
  zona?: string;
  dni?: number;
  photo?: string;
  role?: string;
  CUIT?: string;
  workZone: string[]
  workHours?: string;
  fee?: number;
  countDogs?: number;
  rating: number;
}