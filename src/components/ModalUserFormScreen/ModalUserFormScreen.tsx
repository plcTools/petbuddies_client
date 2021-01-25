import * as React from 'react';
import { useState } from 'react';
import styles from './styles';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

/* puede recibir mode:initialRegister, mode:add o mode:update */
function ModalUserFormScreen(props: any) {
    const mode: String = props.mode

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const handleChangeText = (name: string, value: string) => {
        setInput({ ...input, [name]: value });
    };
    return (
        <KeyboardAvoidingView style={styles.keyboard}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.headContainer}>
                        <Text style={styles.title}> Registro </Text>
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
                            <Text style={styles.label}>Contraseña</Text>
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
                            <Text style={styles.label}>Repetir Constraseña</Text>
                            <TextInput
                                style={[styles.input]}
                                maxLength={50}
                                autoCapitalize="none"
                                secureTextEntry
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
                                onPress={() => {
                                    alert('Guardado con Exito!');
                                    console.log(input);
                                    props.modalStatusChange()
                                }}>
                                <Text style={[styles.textButton]}>Guardar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: 'rgba(255,115,160, 0.5)' }}
                                onPress={() => {
                                    props.modalStatusChange()
                                }}>
                                <Text style={styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default ModalUserFormScreen;