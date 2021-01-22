import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const WalkerProfile = () => {

    const walker = {
        name: 'Fred Fort',
        picture: 'https://randomuser.me/api/portraits/men/3.jpg',
        bio: 'Cuando no estoy paseando perros, estoy salvando vidas en el cuerpo de Bomberos Voluntarios.'
    }

  return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.profilePic}
                    source={{
                      uri: walker.picture
                        }}
                  />
                <Text style={styles.profileText}>
                    <Text style={styles.name}>{walker.name}</Text>
                    <Text style={styles.bio}>{walker.bio}</Text>
                </Text>  
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {  
      paddingTop: 50,
    },
    profile: {
        justifyContent: 'space-evenly',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileText: {
        width: 50,
        height: 100,
    },
    name: {
        fontSize: 30,
    },
    bio: {
        fontSize: 18,
    }
  });

export default WalkerProfile;