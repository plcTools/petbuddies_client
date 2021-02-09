import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { getData  } from '../../AsyncStorage/index';
import { RouteStackParamList } from '../../NavigationConfig/types';

export interface SelectRolProps {
   }
 
const SelectRol = ({ navigation }: RouteStackParamList<'LoginScreen'>) => {

    const [ state, setState ] = useState<string>()
    const retrieveStorage = async () =>{
        const id:string = await getData()
        setState(id) 
      };
    
    useLayoutEffect(() => {
        retrieveStorage();
    }, []);

    const walkerSubmit = async() => {
        await axios.put(`/owners/${state}`, { role: 'Walker' })
        navigation.navigate('WalkerForm')
    };

       const ownerSubmit = async() => {
        await axios.put(`/owners/${state}`, { role: 'Owner' })
        navigation.navigate('Tab')
    };



    const serviceSubmit = async() => {
        // await axios.post(`/owners/${state}`, { role: 'Service' })
        //Falta agregar funcionalidad
        navigation.navigate('ServiceForm')
    };

  return (
    <View>
      <Text style={styles.title}>Select your Role</Text>
      <View style={styles.container}>
         <View style={styles.buttons}> 
              <Text style={styles.text}>Owner</Text>
              <Icon
                reverse 
                name='user'
                type='font-awesome-5'
                color='blue'
                size={40}
                style={styles.icon}
                onPress={ownerSubmit} />
        </View>  
        <View style={styles.buttons}>
          <Text style={styles.text}>Walker</Text>
            <Icon
                reverse
                name='walking'
                type='font-awesome-5'
                color='#fc5185'
                style={styles.icon}
                size={40}
                onPress={walkerSubmit} />
        </View>
        <View style={styles.buttons}>
          <Text style={styles.text}>Service</Text>
            <Icon
                reverse
                name='clinic-medical'
                type='font-awesome-5'
                color='#008891'
                style={styles.icon}
                size={40}
                onPress={serviceSubmit} />
        </View>
        </View>
    </View>
  );
};
 
export default SelectRol;

const styles = StyleSheet.create({
  container:{
    padding:10,
    justifyContent:'center',
    marginHorizontal:45,
    marginTop:-20
  },
  icon:{
    backgroundColor: 'black',
  },
  buttons:{
    // flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:110,
    height:20,
    width: 270
  },
  title: {
      marginTop: 100,
      textAlign: 'center',
      fontSize: 30 
  },
  text: {
      fontSize: 15,
      fontWeight: 'bold',
      width: 60,
      textAlign: 'center',
  }
})