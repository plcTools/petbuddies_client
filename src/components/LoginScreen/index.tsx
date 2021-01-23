import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';


const LoginScreen = () => {

  const [userData, setUserData] = useState({
    email:"",
    password:""
  })  

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
            onChangeText={text => setUserData({...userData, email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#e3b587"
            onChangeText={text => setUserData({...userData, password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
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
  logo:{
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: -100,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#456672",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#c98c70",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

export default LoginScreen;