import * as React from 'react';
import { Card, Image, Icon, CheckBox, Divider } from 'react-native-elements';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { styles } from './styles'
import MapView from 'react-native-maps';



function DetailsSpaCard(props: any) {

    console.log(props)

    return (

        <View /* containerAll */ style={styles.containerAll}>

            <View /* headerContainer*/ style={styles.headersContainer}>

                <View /* title */>
                    <Text style={styles.textTitle}>
                        Nombre
                        </Text>
                </View>

                <View /* buttonContainer */>
                    <TouchableOpacity
                        style={{ ...styles.button, backgroundColor: 'rgba(255,115,160, 0.5)' }}
                        onPress={() => {
                            props.modalStatusChange()
                        }}>
                        <Text style={styles.textButton}>X</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View /* bodyContainer */ style={styles.bodyContainer}>
                <Divider />
                <View /* buttonsContainer */ style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert('hola')}>
                        <Text style={styles.textButton}>Tel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert('hola')}>
                        <Text style={styles.textButton}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert('hola')}>
                        <Text style={styles.textButton}>Email</Text>
                    </TouchableOpacity>
                </View>

                <Divider />

                <View /* dataContainer*/ style={styles.mapContainer}>
                        
                       {props.data.map(()=> <Text>dato</Text>)}

                </View>

                <View /* mapContainer*/ style={styles.mapContainer}>
                    <MapView style={{ width: '80%', height: '80%' }} />
                </View>

            </View>

            <View /* footerContainer */ style={styles.footerContainer}>
                <Divider />
                <View /* buttonGoContainer*/>

                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert('hola')}>
                        <Text style={styles.textButton}>Go</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>


    )
}

export default DetailsSpaCard;