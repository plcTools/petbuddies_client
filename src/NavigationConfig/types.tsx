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
  SpaProfile: { id: number };
  UserPannel: undefined;
  UserFormScreen: undefined;
  WalkerScreen: undefined;
  LoginScreen: undefined;
  SelectRol: undefined;
  Home: undefined;
  Drawer: undefined;
  Stack: undefined
  Tab: undefined;
  TabNavigation: undefined;
  WalkerForm: undefined;
  BeautySpaScreen:undefined;
  ServiceForm: {
    service: string;
  };
  HotelCard: {
    hotel: hotel
  }
  Profile: undefined ;

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
  logo?:string;
  workHours:string;
  workDays: string;
  description?:string;
  adPics: string[];
  fee:number;
  reviewsReceived?:number;
  rating:number;
  phone:string;
  email:string;
  address:string;
  zone:string;
  provincia: string;
  pais: string;
  latitude: number;
  longitude: number;
  allowedNumber?:number;
  checkOut?:number;
  petsLoved?:number;
  extras?:string[]
  allowedPets?:string[];
  foodInclude?:boolean;
  requirement?:string;
}
export type groomer = {
  _id: string;
  name: string;
  logo?: string;
  workHours: string;
  workDays: string;
  description: string;
  adPics?: string[];
  fee: number;
  reviewsReceived?: number;
  rating: number;
  phone: string;
  email: string;
  adress: string;
  zone: string;
  provincia: string;
  latitude: number;
  longitude: number;
  services?: string[];
}