import * as React from 'react';
import { useState } from 'react';
import styles from './styles';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';

function ModalUserFormScreen(props: any) {

    const [input, setInput] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    });

    const handleChangeText = (name: string, value: string) => {
        setInput({ ...input, [name]: value });
    };

    function validateEmail(email: String) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        /* si no coincide devuelve false */
    }

    const signup = async () => {
        const { email, password } = input;
        if (email && password) {
            try {
                const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
                if(user) {
                    await axios.post('/owners', { email })
                    return Alert.alert('Registro exitoso!');
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    }

    const onSubmit = () => {
        const emailValidate = input.email && validateEmail(input.email)
        const lenPass = input.password && input.password.length > 5
        const passValidate = input.password && input.repeatPassword && input.password === input.repeatPassword
        if (!emailValidate) { return Alert.alert('Email invalido!') };
        if (!passValidate) { return Alert.alert('Las contraseñas no coinciden') };
        if (!lenPass) { return Alert.alert('La contraseña debe tener como minimo 6 caracteres') };
        if (input.email && input.password && input.repeatPassword && passValidate && emailValidate && lenPass) {
            signup();
            props.modalStatusChange()/* cambia el state para ocultar el modal */
        }

    };



    return (
        <KeyboardAvoidingView style={styles.keyboard}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.headContainer}>
                        <Text style={styles.title}> Register </Text>
                    </View>

                    <View style={styles.container}>

                        <View>
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
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={[styles.input]}
                                maxLength={50}
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(value) => handleChangeText('password', value)}
                                defaultValue={input.password}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={[styles.input]}
                                maxLength={50}
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(value) => handleChangeText('repeatPassword', value)}
                                defaultValue={input.repeatPassword}
                            />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={() => onSubmit()}>
                                <Text style={[styles.textButton]}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: 'rgba(255,115,160, 0.5)' }}
                                onPress={() => {
                                    props.modalStatusChange()
                                }}>
                                <Text style={styles.textButton}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default ModalUserFormScreen;