import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
export interface SelectRolProps {
   }
 
const SelectRol: React.FC<SelectRolProps> = () => {
  return (
    <View>
      <Text style={styles.title}>Select your Role</Text>
      <View style={styles.container}>
         <View style={styles.buttons}> 
              <Text>Owner</Text>
              <Icon
          reverse 
         name='user'
         type='font-awesome-5'
         color='#fc5185'
         size={40}
         style={styles.icon}
         onPress={() => console.log('hello')} />

        </View>  
        <View style={styles.buttons}>
          <Text>Walker</Text>
         <Icon
         reverse
         name='walking'
         type='font-awesome-5'
         color='#fc5185'
         style={styles.icon}
         size={40}
         onPress={() => console.log('hello')} />
        </View>
        <View style={styles.buttons}>
          <Text>Service</Text>
            <Icon
          reverse
         name='clinic-medical'
         type='font-awesome-5'
         color='#fc5185'
         style={styles.icon}
         size={40}
         onPress={() => console.log('hello')} />
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
    marginTop:-20,
  },
  icon:{
    backgroundColor: 'grey',
  },
  buttons:{
    flex:1,
  justifyContent:'center',
    alignItems:'center',
    marginTop:150,
    backgroundColor: 'grey',
  },
  title: {
      marginTop: 100,
      textAlign: 'center',
      fontSize: 30 
  }
})