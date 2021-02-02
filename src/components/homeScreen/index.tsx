import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, FlatList, SafeAreaView, Modal, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Icon, Divider, CheckBox } from 'react-native-elements';
import { styles } from './styles';
import WalkerCard from '../WalkerCard/index';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../redux/store';
import { getWalkers } from '../../redux/walker/actions';
import { getUserFavorites } from '../../redux/owner/actions';
import { Walker } from '../../redux/walker/types';
import {
    useFonts,
    NunitoSans_400Regular,
    NunitoSans_900Black_Italic,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_300Light_Italic,
    NunitoSans_300Light
} from '@expo-google-fonts/nunito-sans';
import { getData } from '../../AsyncStorage';


const lista: string[] = ['palermo', 'caballito', 'almagro', 'belgrano', 'saavedra', 'puerto madero', 'recoleta', 'villa crespo', 'boedo', 'colegiales', 'barrio norte'].sort();
interface ModalChecks {
    [key: string]: boolean;
}

const HomeScreen = () => {
    const [state, setState] = React.useState<any | typeof walkers>(null);
    const [check, setCheck] = React.useState<boolean>(false);
    const [checked, setChecked] = React.useState<string | boolean>(false);
    const [input, setInput] = React.useState<ModalChecks>({});
    const [icon, setIcon] = React.useState<ModalChecks>({ walkers: true });
    /*  const navigation = useNavigation(); */
    const walkers = useSelector((state: RootState) => state.paseadores.walkers)
    const userFavorites = useSelector((state: RootState) => state.user.userFavorites)
    const [id, setId] = React.useState<string>('');
    const dispatch = useAppDispatch();
    let [fonts] = useFonts({
        NunitoSans_400Regular,
        NunitoSans_900Black_Italic,
        NunitoSans_600SemiBold_Italic,
        NunitoSans_600SemiBold,
        NunitoSans_300Light_Italic,
        NunitoSans_300Light
    });

    const retrieveStorage = async () => {
        const idData = await getData();
        setId(idData)
    }

    React.useLayoutEffect(() => {
        retrieveStorage();
        dispatch(getUserFavorites(id))
        if (Object.keys(walkers).length > 0) {
            setState(walkers)
        } else {
            dispatch(getUserFavorites(id))
            dispatch(getWalkers())
        }
    }, [dispatch, walkers]);

    const handleInput = (name: string) => {
        setInput({
            // ...input,
            [name]: input[name] ? false : true
        })
    };

    const handleIcon = (name: string) => {
        setIcon({
            [name]: true
        })
    };

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
    if (!fonts) return <Icon name='spinner' reverse type='font-awesome-5' />
    return (
        <>
            <Divider />
            <View style={styles.viewIcons}>
                <Icon
                    name='walking'
                    type='font-awesome-5'
                    color={icon?.walkers ? "#fc5185" : "grey"}
                    onPress={() => {
                        setState(walkers);
                        setChecked(false);
                        handleIcon("walkers");
                    }}
                />
                <Icon
                    name='star'
                    type='font-awesome'
                    color={icon?.star ? '#f8dc81' : 'grey'}
                    onPress={() => {
                        handleIcon('star')
                        setState(() => {
                            let newState = [...walkers];
                            return newState.sort((a, b) => b.rating - a.rating)
                        })
                        setChecked(false)
                    }}
                />
                <Icon
                    name='heart'
                    type='font-awesome'
                    // color='red'
                    color={icon?.heart ? '#ef4f4f' : 'grey'}
                    onPress={() => {
                        setState(userFavorites);
                        setChecked(false)
                        handleIcon('heart')
                    }}
                />
                <Icon
                    name='map-marker-alt'
                    type='font-awesome-5'
                    // color='#00af91'
                    color={icon?.house ? '#008891' : 'grey'}
                    onPress={() => {
                        setCheck(!check)
                        setChecked(false)
                        handleIcon('house')
                    }}
                />
                {/* <Icon
                    name='globe'
                    type='font-awesome-5'
                    color='#51c2d5'
                    onPress={() => alert('all')}
                /> */}
            </View>
            <Divider />
            {
                checked ? (
                    <>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: 'NunitoSans_600SemiBold', textTransform: 'capitalize', fontSize: 18 }}>Walkers in {checked}</Text>
                        </View>
                        <Divider />
                    </>
                ) : null
            }
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
                    <View
                        style={{
                            backgroundColor: '#f1f1f1',
                            margin: 15,
                            marginTop: 100,
                            padding: 20,
                            marginBottom: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5
                        }}
                    >
                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            <Icon
                                name='times'
                                type='font-awesome-5'
                                onPress={() => {
                                    setCheck(false)
                                    setIcon({})
                                }}
                                color='red'
                                size={15}
                            />
                        </View>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                marginBottom: 10,
                                width: 300,
                                textAlign: 'center'
                            }}
                        >Select your neighborhood</Text>
                        {
                            lista && lista.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        marginBottom: 5,
                                        marginTop: 5,
                                        padding: 7,
                                        backgroundColor: '#fff',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 5,
                                        elevation: 3
                                    }}
                                    onPress={() => handleInput(item)}
                                >
                                    <Text style={{ marginLeft: 10, textTransform: 'capitalize' }}>{item}</Text>
                                    <Icon
                                        name={input[item] ? 'check' : 'plus'}
                                        type='font-awesome-5'
                                        size={13}
                                        color={input[item] ? 'green' : 'gray'}
                                    />
                                </TouchableOpacity>
                            ))
                        }

                        <TouchableOpacity
                            style={{ marginTop: 10, backgroundColor: '#ccc', borderRadius: 8, padding: 5, width: '70%' }}
                            onPress={() => {
                                for (const prop in input) {
                                    if (input[prop]) {
                                        setCheck(!check)
                                        setChecked(prop)
                                        return setState(walkers.filter((w) => w.workZone.includes(prop)))
                                    }
                                }
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>
    )
};


export default HomeScreen;