import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { styles } from './styles';
import WalkerCard from '../WalkerCard/index';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '../../redux/store'
import { getWalkers } from '../../redux/walker/actions'
import { getUserFavorites } from '../../redux/owner/actions';
import { Walker } from '../../redux/walker/types';

const HomeScreen = () => {
    const [state, setState] = React.useState<any | typeof walkers>(null);
    /*  const navigation = useNavigation(); */
    const walkers = useSelector((state: RootState) => state.paseadores.walkers)
    const userFavorites = useSelector((state: RootState) => state.user.userFavorites)
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        if (Object.keys(walkers).length > 0) {
            setState(walkers)
        } else {
            dispatch(getUserFavorites("600ae1c984ce6400985f4f7a"))
        }
    }, [dispatch, walkers])

    const renderComponent = (arr: any) => {
        return (<SafeAreaView style={{ width: '100%', display: 'flex', justifyContent: 'center', flex: 1 }}>
            <FlatList
                data={arr}
                keyExtractor={(item: Walker) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (<WalkerCard walker={item} userFavorites={userFavorites} />)
                }}
            />
        </SafeAreaView>)
    }
    return (
        <>
            <View style={styles.viewIcons}>
                <View style={styles.cardIcons}>
                    <Icon
                        reverse
                        name='walking'
                        type='font-awesome-5'
                        color='#fc5185'
                        onPress={() => {
                            {
                                if (Object.keys(walkers).length === 0) {
                                    dispatch(getWalkers())
                                } else {
                                    setState(walkers)
                                }

                            }
                        }} />
                    <Text>Walkers</Text>
                </View>
                <View style={styles.cardIcons}>
                    <Icon
                        reverse
                        name='spa'
                        type='font-awesome-5'
                        color='#fc5185'
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
                    color='red'
                    onPress={() => { setState(userFavorites) }}
                />
                <Icon
                    name='house-user'
                    type='font-awesome-5'
                    color='#00af91'
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
                    renderComponent(state)

                }
            </View>
        </>
    )
};


export default HomeScreen;