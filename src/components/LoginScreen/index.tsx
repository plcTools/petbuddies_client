import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { RouteStackParamList } from '../../NavigationConfig/types'
import ModalUserFormScreen from '../ModalUserFormScreen/ModalUserFormScreen'
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';


interface state {
  [key: string]: any
}

const LoginScreen = ({ navigation }: RouteStackParamList<'LoginScreen'>) => {
  const [state, setState] = useState<state | null>(null);
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  /* const signInWithGoogle = async () => {
    console.log('hiciste click')
    try {
      const result = await Expo.Google.logInAsync({
        behavior: 'web',
        androidClientId: '901331707362-en3032377ik1c8fpj3noe9pajl47q2j6.apps.googleusercontent.com',
    
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
      
        console.log(result)
      } else {
        console.log('hiciste click2')
        return { cancelled: true };
      }
    } catch (e) {
      console.log('hiciste click3')
      return { error: true };
    }
  } */

  const signInWithGoogle = async () => {
    console.log('hiciste click')
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      
      if (type === 'success') {
        console.log(user)
      }
    } catch ({ message }) {
      console.log('login: Error:' + message);
    }
  };

  const login = async () => {
    const { email, password } = userData;
    if (email && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('Tab');
      } catch (error) {
        console.log(error.message)
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('Error', 'Check your email and password and try again.')
    }
  }  
  
  const handleLogin = async () => {
    login()
  }   

  const [modalVisible, setModalVisible] = useState(false);
  const modalStatusChange = () => {
  setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../images/wallpaper.jpg')} style={styles.backgImage} >
        <View style={styles.subcontainer}>
          <Image source={require('../../images/logo.png')} style={styles.logo} />
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#e3b587"
              onChangeText={text => setUserData({ ...userData, email: text })} />
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#e3b587"
              onChangeText={text => setUserData({ ...userData, password: text })} />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => signInWithGoogle()}>
            <Text style={styles.loginText}>LOGIN WITH GOOGLE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View>
        <View >
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('se cierra el Modal.');
            }}>
            <ModalUserFormScreen modalStatusChange={modalStatusChange}/>
          </Modal>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
  subcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: -100,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#456672",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#c98c70",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});

export default LoginScreen;