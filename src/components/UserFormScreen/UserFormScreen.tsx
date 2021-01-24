import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteStackParamList } from '../../NavigationConfig/types'
import stylesLandscape from './styles/stylesLandscape';
import stylesPortrait from './styles/stylesPortrait';
import {
    Button,
    View,
    Text,
    Alert,
    Modal,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    TextInputProps,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';


function UserFormScreen({ navigation }: RouteStackParamList<'UserFormScreen'>) {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dni: '',
    });
    const [modalVisible, setModalVisible] = useState(true);

    const window = Dimensions.get('window');
    const screen = Dimensions.get('screen');
    var initialStyles: any;
    const orientation = window.height > window.width;
    !orientation
        ? (initialStyles = stylesPortrait)
        : (initialStyles = stylesLandscape);

    const [styles, setStyles] = useState(initialStyles);

    const handleChangeText = (name: string, value: string) => {
        setInput({ ...input, [name]: value });
    };


    const [dimensions, setDimensions] = useState({ window, screen });

    const onChange = ({ window: { }, screen: { } }) => {
        setDimensions({ window, screen });//guarda las dimensiones de la pantalla en el state
        console.log(window)
        const orientation = window.height > window.width;//si altura es mayo a ancho, orientaton es true
        console.log(orientation)
        orientation ? setStyles(stylesPortrait) : setStyles(stylesLandscape);//elije el archivo de estilos segun las medidas
    };

    useEffect(() => {
        Dimensions.addEventListener('change', onChange);//escucha el cambio de medidadas en la screen
        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    });

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalView}>
                    <View style={styles.headContainer}>

                             <Text style={styles.title}> Registro </Text>

                        <TouchableOpacity
                            style={styles.buttonPhoto}
                            onPress={() => {
                                alert('abre camara')
                            }}>
                            <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center' }}>Foto{'\n'}
                                <Text />
                                <Text style={{ ...styles.title, textAlign: 'center' }}>+</Text>
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.scrollContainer}>
                        <ScrollView style={styles.scroll}>
                            <View>
                                <Text style={styles.label}>Nombre</Text>
                                <TextInput
                                    style={styles.input}
                                    autoFocus
                                    maxLength={50}
                                    onChangeText={(text) => handleChangeText('firstName', text)}
                                    defaultValue={input.firstName}
                                />
                            </View>

                            <View>
                                <Text style={styles.label}>Apellido</Text>
                                <TextInput
                                    style={[styles.input]}
                                    maxLength={50}
                                    onChangeText={(value) => handleChangeText('lastName', value)}
                                    defaultValue={input.lastName}
                                />
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input]}
                                    maxLength={50}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onChangeText={(value) => handleChangeText('email', value)}
                                    defaultValue={input.email}
                                />
                            </View>

                            <View>
                                <Text style={styles.label}>Teléfono</Text>
                                <TextInput
                                    style={[styles.input]}
                                    keyboardType="phone-pad"
                                    maxLength={12}
                                    onChangeText={(value) => handleChangeText('phone', value)}
                                    defaultValue={input.phone}
                                />
                                <Text style={styles.label}>Domicilio</Text>
                                <TextInput
                                    style={[styles.input]}
                                    maxLength={50}
                                    onChangeText={(value) => handleChangeText('address', value)}
                                    defaultValue={input.address}
                                />
                            </View>

                            <View>
                                <Text style={styles.label}>Dni</Text>
                                <TextInput
                                    style={[styles.input]}
                                    maxLength={10}
                                    onChangeText={(value) => handleChangeText('dni', value)}
                                    defaultValue={input.dni}
                                />
                            </View>
                        </ScrollView>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={() => {
                                    alert('Guardado con Exito!');
                                    setModalVisible(!modalVisible);
                                    console.log(input);
                                }}>
                                <Text style={[styles.textButton]}>Guardar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: 'red' }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default UserFormScreen;