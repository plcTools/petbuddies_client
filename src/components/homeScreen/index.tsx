import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import {  Icon, Avatar, Card, Divider } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import {RouteStackParamList} from '../NavigationConfig/types'
import { DrawerActions } from '@react-navigation/native';

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any,any>
};

const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
      subtitle: 'Vice Chairman'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
        subtitle: 'Vice Chairman'
      },
    //   {
    //     name: 'Chris Jackson',
    //     avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
    //     subtitle: 'Vice Chairman'
    //   }, // more items
    //   {
    //     name: 'Chris Jackson',
    //     avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
    //     subtitle: 'Vice Chairman'
    //   },
    //   {
    //     name: 'Chris Jackson',
    //     avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
    //     subtitle: 'Vice Chairman'
    //   },
    //   {
    //     name: 'Chris Jackson',
    //     avatar_url: 'http://www.graficaszamart.com/imprenta/wp-content/uploads/2015/08/Foto-perfil.jpg',
    //     subtitle: 'Vice Chairman'
    //   },
];

const HomeScreen = ({navigation}: RouteStackParamList<'HomeScreen'>) => {
    return (
        <>
            <View style={styles.viewIcons}>
                <View style={styles.cardIcons}>
                    <Icon 
                        reverse
                        name='walking'
                        type='font-awesome-5'
                        color= '#fc5185'
                        />
                    <Text>Walkers</Text>
                </View>
                <View style={styles.cardIcons}>
                    <Icon 
                        reverse
                        name='spa'
                        type='font-awesome-5'
                        color= '#fc5185'
                        />
                    <Text>Spa & Hostel</Text>
                </View>
            </View>
            <Divider />
            <View style={styles.viewIcons}>
                <Icon 
                    name='star'
                    type='font-awesome-5'
                    color='#f8dc81'
                />
                <Icon 
                    name='heart'
                    type='font-awesome-5'
                    color= 'red'
                />
                <Icon 
                    name='house-user'
                    type='font-awesome-5'
                    color= '#00af91'
                />
                <Icon 
                    name='globe'
                    type='font-awesome-5'
                    color='#51c2d5'
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            </View>
            <Divider />
            <View style={styles.container}>
                <SafeAreaView style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <FlatList
                        data={list}
                        keyExtractor={(item, i) => i.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Card containerStyle={styles.cards}>
                                <Avatar source={{uri: item.avatar_url}} size='small' />
                                    <Card.Title style={{color: '#fff'}}>{item.name}</Card.Title>
                                    <Text style={{color: '#fff'}}>{item.subtitle}</Text>
                            </Card>
                        )}
                    />
                </SafeAreaView>
            </View>
        </>
    )
};

export default HomeScreen;