import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { View, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import {  Icon, ListItem, Avatar, Card } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';

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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    console.log(list)
    return (
        <>
            <View style={{alignItems:'center', flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Icon 
                        reverse
                        name='walking'
                        type='font-awesome-5'
                        />
                    <Text>Walkers</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Icon 
                        reverse
                        name='spa'
                        type='font-awesome-5'
                        />
                    <Text>Spa & Hostel</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop: 20, flex: 1}}>
                <Icon 
                    name='star-half-alt'
                    type='font-awesome-5'
                />
                <Icon 
                    name='heart'
                    type='font-awesome-5'
                />
                <Icon 
                    name='house-user'
                    type='font-awesome-5'
                />
                <Icon 
                    name='globe'
                    type='font-awesome-5'
                />
            </View>
            <View style={styles.container}>
                {/* <ScrollView 
                    contentContainerStyle={styles.scrollView} 
                    showsVerticalScrollIndicator={false} 
                    style={styles.scroll}
                >
                    {
                        list.map((l, i) => (
                            <ListItem key={i} bottomDivider containerStyle={styles.cards}>
                                <Avatar source={{uri: l.avatar_url}} size='small' />
                                <ListItem.Content >
                                    <ListItem.Title style={{color: '#fff'}}>{l.name}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: '#fff'}}>{l.subtitle}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </ScrollView> */}
                <SafeAreaView style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <FlatList
                        data={list}
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
            <View style={styles.footer}>
                <Icon 
                    reverse
                    name='home'
                    style={styles.icons}
                    onPress={
                        () => navigation.navigate('Home')
                    }
                    />
                <Icon 
                    reverse
                    name='user-o'
                    type= 'font-awesome'
                    style={styles.icons}
                    onPress={
                        () => navigation.navigate('Profile')
                    }
                    /> 
            </View>
        </>
    )
};

export default HomeScreen;