import React, { useState, useLayoutEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { RouteStackParamList } from "../../NavigationConfig/types";
import ModalUserFormScreen from "../ModalUserFormScreen/ModalUserFormScreen";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { storeData, getData } from "../../AsyncStorage/index";

interface state {
  [key: string]: any;
}

const LoginScreen = ({ navigation }: RouteStackParamList<"LoginScreen">) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const retrieveStorage = async () =>{
    const id:string = await getData()
     if(id) navigation.navigate('Tab')
  }

  React.useEffect(() => {
    retrieveStorage();
  }, []);

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const id: { data: string | any } = await axios.post("/owners", {
          name: result.user.givenName,
          lastname: result.user.familyName,
          email: result.user.email,
          photo: result.user.photoUrl,
        });
        if (id.data.name !== "MongoError") {
          storeData(id.data);
          navigation.navigate("SelectRol");
        } else {
          const id = await axios.get(`/owners/email/${result.user.email}`);
          await storeData(id.data);
          navigation.navigate("Tab");
        }
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const login = async () => {
    const { email, password } = userData;
    if (email && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const id = await axios.get(`/owners/email/${email}`);
        await storeData(id.data);
        navigation.navigate("Tab");
      } catch (error) {
        console.log(error.message);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert("Error", "Check your email and password and try again.");
    }
  };

  const handleLogin = async () => {
    login();
  };

  const [modalVisible, setModalVisible] = useState(false);
  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../images/wallpaper.jpg")}
        style={styles.backgImage}
      >
        <View style={styles.subcontainer}>
          <Image
            source={require("../../images/logo.png")}
            style={styles.logo}
          />
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              autoCorrect={false}
              autoCapitalize={"none"}
              placeholder="Email..."
              placeholderTextColor="#e3b587"
              onChangeText={(text) => setUserData({ ...userData, email: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#e3b587"
              onChangeText={(text) =>
                setUserData({ ...userData, password: text })
              }
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => handleLogin()}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginGoogle} onPress={() => signIn()}>
            <Image
              source={require("../../images/google.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ color: "#393e46" }}>SIGN-IN WITH GOOGLE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View>
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("se cierra el Modal.");
            }}
          >
            <ModalUserFormScreen modalStatusChange={modalStatusChange} />
          </Modal>
        </View>
      </View>
    </View>
  );
};

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
    alignItems: "center",
    justifyContent: "center",
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
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#c98c70",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  loginGoogle: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    marginTop: 15,
    height: 50,
  },
  loginText: {
    color: "#eeeeee",
  },
});

export default LoginScreen;

function store(id: string) {
  throw new Error("Function not implemented.");
}
