import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteStackParamList } from '../NavigationConfig/types'
import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
    ScrollView,
} from 'react-native';

import { useState } from 'react';



function UserFormScreen({navigation}: RouteStackParamList<'UserFormScreen'>) {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dni: '',
    });

    const handleChangeText = (name:string, value:string) => {
        setInput({ ...input, [name]: value });
    };

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> Registro </Text>
            </View>

            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={[styles.input]}
                        onChangeText={(text) => handleChangeText('firstName', text)}
                        defaultValue={input.firstName}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Apellido</Text>
                    <TextInput
                        style={[styles.input]}
                        onChangeText={(value) => handleChangeText('lastName', value)}
                        defaultValue={input.lastName}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input]}
                        onChangeText={(value) => handleChangeText('email', value)}
                        defaultValue={input.email}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput
                        style={[styles.input]}
                        onChangeText={(value) => handleChangeText('phone', value)}
                        defaultValue={input.phone}
                    />
                    <Text style={styles.label}>Domicilio</Text>
                    <TextInput
                        style={[styles.input]}
                        onChangeText={(value) => handleChangeText('address', value)}
                        defaultValue={input.address}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Dni</Text>
                    <TextInput
                        style={[styles.input]}
                        onChangeText={(value) => handleChangeText('dni', value)}
                        defaultValue={input.dni}
                    />
                </View>

                <View style={{alignItems:'center'}}>
                    <View style={[styles.buttonView]} onTouchEnd={() => console.log(input)}>
                        <Text style={[styles.textButton]} >Guardar</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginVertical: 2,
        borderRadius: 5,
    },
    title: {
        paddingVertical: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fa9579',
    },
    container: {
        flex: 1,
        marginVertical: 1,
        padding: 30,
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        fontSize: 16,
        height: 40,
        color: '#654062',
    },
    label: {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fa9579',
    },
    buttonView: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 20,
        alignContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#fa9579',
        height: 50,
        width: 250,
    },
    textButton: {
        textAlign: 'center',
        color: '#ff7b54',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10
    }
});

export default UserFormScreen;