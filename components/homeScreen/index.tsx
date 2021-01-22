import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { View, Text, ScrollView } from 'react-native';
import {  Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any,any>
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Paseadores por tu zona:</Text>
                <View style={styles.cards}><Text>hola</Text></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
                <View style={styles.cards}></View>
            </View>
            <View style={styles.footer}>
                <Icon 
                    reverse
                    name='profile'
                    style={styles.icons}
                    onPress={
                        () => navigation.navigate('Profile')
                    }
                /> 
                <Icon 
                    reverse
                    name='home'
                    style={styles.icons}
                    onPress={
                        () => navigation.navigate('Home')
                    }
                />
            </View>
        </>
    )
};

export default HomeScreen;