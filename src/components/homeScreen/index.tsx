import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, FlatList, SafeAreaView, VirtualizedList } from 'react-native';
import {  Icon, Avatar, Card, Divider } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import {RouteStackParamList} from '../../NavigationConfig/types';
import WalkerCard from '../WalkerCard/index';
import { useNavigation } from '@react-navigation/native';
import { walkers } from '../WalkerCard/data';
import axios from 'axios';

interface Walker {
    _id: string;
    name: string;
    lastname: string;
    avatar: string;
    fee: number;
    description: string;
    workZone: string[];
    countDogs: string;
    
};

const HomeScreen = () => {
    const [ state, setState ] = React.useState<any | typeof walkers>(null);
    const navigation = useNavigation();

    React.useEffect(() => {
        axios.get(`http://localhost:3001/walkers`)
        .then((result) => setState(result.data))
    },[])
    return (
        <>
            <View style={styles.viewIcons}>
                <View style={styles.cardIcons}>
                    <Icon 
                        reverse
                        name='walking'
                        type='font-awesome-5'
                        color= '#fc5185'
                        onPress={() => setState(walkers)}
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
                    onPress={() => alert('all')}
                />
            </View>
            <Divider />
            <View style={styles.container}>
                {
                state ? (

                    <SafeAreaView style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <FlatList
                            data={state}
                            keyExtractor={(item: Walker) => item._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (<WalkerCard walker={item} />)
                            }}
                        />
                    </SafeAreaView>
                ) : null    
                }
            </View>
        </>
    )
};


export default HomeScreen;