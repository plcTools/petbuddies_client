import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, FlatList, SafeAreaView, Modal } from 'react-native';
import { Icon, Divider, CheckBox } from 'react-native-elements';
import { styles } from './styles';
import WalkerCard from '../WalkerCard/index';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../redux/store';
import { getWalkers } from '../../redux/walker/actions';
import { getUserFavorites } from '../../redux/owner/actions';
import { Walker } from '../../redux/walker/types';

const lista:string[] = ['palermo', 'caballito', 'almagro', 'belgrano', 'saavedra', 'puerto madero', 'recoleta', 'villa crespo', 'boedo', 'colegiales', 'barrio norte'].sort();

const HomeScreen = () => {
    const [state, setState] = React.useState<any | typeof walkers>(null);
    const [check, setCheck] = React.useState<boolean>(false);
    const [checked, setChecked] = React.useState<boolean>(false);
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
    };
    console.log(check)
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
                {/* <View style={styles.cardIcons}>
                    <Icon
                        reverse
                        name='spa'
                        type='font-awesome-5'
                        color='#fc5185'
                    />
                    <Text>Spa & Hostel</Text>
                </View> */}
            </View>
            <Divider />
            <View style={styles.viewIcons}>
                <Icon
                    name='star'
                    type='font-awesome-5'
                    color='#f8dc81'
                    onPress={() => {
                        setState(() => {
                            let newState = [...walkers];
                            return newState.sort((a, b) => b.rating - a.rating)
                        })
                    }}
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
                    onPress={() => setCheck(!check)}
                />
                {/* <Icon
                    name='globe'
                    type='font-awesome-5'
                    color='#51c2d5'
                    onPress={() => alert('all')}
                /> */}
            </View>
            <Divider />
            <View style={styles.container}>
                {
                    renderComponent(state)

                }
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={check}
                    >
                    <View>
                        <Text>Filtrar por zona:</Text>
                    </View>
                    <SafeAreaView>
                        <FlatList 
                            data={lista}
                            renderItem={({ item }) => (
                                <View style={{width: '100%'}}>
                                    <CheckBox 
                                        title={item}
                                        checked={checked}
                                        onPress={() => setChecked(!checked)}
                                        containerStyle={{display:'flex', width: '100%', justifyContent: 'space-between'}}
                                        // iconRight={true}
                                        checkedIcon='times'
                                        uncheckedIcon='check'
                                        checkedColor='red'
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item[0] }
                        
                        />
                    </SafeAreaView>
                </Modal>
            </View>
        </>
    )
};


export default HomeScreen;