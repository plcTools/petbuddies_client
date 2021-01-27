import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, FlatList, SafeAreaView, Modal, TouchableOpacity, Button } from 'react-native';
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
interface ModalChecks {
    [key: string]: boolean;
}


const HomeScreen = () => {
    const [state, setState] = React.useState<any | typeof walkers>(null);
    const [check, setCheck] = React.useState<boolean>(false);
    const [checked, setChecked] = React.useState<string>('check');
    const [ input, setInput ] = React.useState<ModalChecks>({});
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
    }, [dispatch, walkers]);

    const handleInput = (name: string) => {
        setInput({
            ...input,
            [name]: input[name] ? false : true
        })
    }

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={check}
                >
                    <View  
                        style={{
                            backgroundColor: '#f1f1f1',
                            margin: 15, 
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
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 20
                            }}
                        >Filtrar por zona:</Text>
                        {
                            lista && lista.map((item, i) => (
                                <TouchableOpacity style={{
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
                                    <Text style={{marginLeft: 10, textTransform: 'capitalize'}}>{item}</Text>
                                    <Icon 
                                        name={ input[item] ? 'check' : 'plus' }
                                        type='font-awesome-5'
                                        size={13}
                                        color={input[item] ? 'green' : 'gray'}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                        
                        <TouchableOpacity
                            style={{marginTop: 10, backgroundColor: '#ccc', borderRadius: 8, padding: 5, width: '70%'}} 
                            onPress={() => {
                                console.log(Object.keys(input))
                                // setState(walkers.filter((w) => w.workZone.includes(Object.keys(input))))
                                setCheck(!check)
                            }}
                        >
                            <Text style={{textAlign: 'center'}}>Filtrar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>
    )
};


export default HomeScreen;