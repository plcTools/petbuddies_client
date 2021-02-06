import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'

export type RootStackParamList = {
  WalkerCard: {
    walker: walker,
    userFavorites: walker[]
  };
  Prueba: undefined;
  WalkerProfile: { id: number };
  HotelProfile: { id: number };
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
  WalkerForm: undefined;
  BeautySpaScreen:undefined;
  HotelCard: {
    hotel: hotel
  }
  Profile: undefined ;
  ReviewsScreen: undefined;
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
  workZone: string[];
  workHours?: string;
  reveiewsReceived?:number;
  fee?: number;
  countDogs?: number;
  rating: number;
};
export type hotel = {
  _id: string;
  name: string;
  photo?:string;
  schedule?:string;
  description?:string;
  fee:number;
  allowedPets?:string[];
  foodInclude?:boolean;
  requirement?:string;
  zone:string;
  celphone:string;
  allowedNumber?:number;
  checkIn?:number;
  checkOut?:number;
  email:string;
  address:string;
  rating?:number;
  reviewsReceived?:number;
  petsLoved?:number;
  extras?:string[]
}