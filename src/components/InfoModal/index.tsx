import * as React from "react";
import { Card, Image, Icon, CheckBox, Divider } from "react-native-elements";
import { View, Text, TouchableOpacity, Alert, Linking, Platform } from "react-native";
import { styles } from "./styles";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";


function InfoModal(props: any) {
    const { data, modalStatusChange } = props;

    var region = {
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    };

    function openWhatsApp() {
        data.phone
            ? Alert.alert("WhatsApp", "¿Want to chat?", [
                {
                    text: "OK",
                    onPress: () => {
                        Linking.openURL(
                            `https://wa.me/${data?.phone}?text=Quiero mas Información`
                        );
                    },
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
            ])
            : Alert.alert("This place hasn't WhatsApp");
    }

    function openTel() {
        data.phone
            ? Alert.alert("Phone", "¿Want to CALL?", [
                {
                    text: "OK",
                    onPress: () => {
                        Linking.openURL(`tel:${data?.phone}`);
                    },
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
            ])
            : Alert.alert("This place hasen't telephone");
    }

    function openMail() {
        data.email
            ? Alert.alert("Mail", "Want to send a MAIL?", [
                {
                    text: "OK",
                    onPress: () => {
                        Linking.openURL(`mailto:${data?.email}`);
                    },
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
            ])
            : Alert.alert("This place hasen't Email");
    }


    function openGps(add: String, loc: String, prov: String, pais: String) {
        var url = `https://www.google.com/maps/dir/?api=1&origin=&destination=${add} ${loc} ${prov} ${pais} &travelmode=bicycling`;
        Linking.openURL(url);
    }
    return (
        <View style={styles.containerAll}>
            <View style={styles.headersContainer}>

                <View style={{ width: '90%', alignItems: 'flex-end' }}>
                    <Icon
                        name="times"
                        type="font-awesome-5"
                        color="red"
                        size={15}
                        onPress={() => {
                            modalStatusChange();
                        }}
                    />
                </View>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.title}>
                    <Image
                        style={{
                            height: 75,
                            width: 75,
                            borderRadius: 50,
                        }}
                        source={data.logo ? { uri: `${data.logo}`} : { uri:`${data.photo}` }}
                    />
                    <Text style={styles.textTitle}>{data.name}</Text>
                </View>
                <View style={styles.buttonsContainer}>

                    <TouchableOpacity onPress={() => openTel()}>
                        <Icon
                            name='phone'
                            type='font-awesome-5'
                            color='blue'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => openWhatsApp()}
                    >
                        <Icon
                            name='whatsapp'
                            type='font-awesome-5'
                            color='green'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => openMail()}>
                        <Icon
                            name='envelope'
                            type='font-awesome-5'
                            color='#ef4f4f'
                        />
                    </TouchableOpacity>
                </View>

                <Divider />

                 <View style={styles.dataContainer}>

                    <View style={styles.dataLeft}>
                        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Visit us!</Text>
                    </View>

                    <View style={styles.dataright} >
                        <Text style={styles.textData}>{data.address}</Text>
                        <Text style={styles.textData}>{data.zone}</Text>
                        <Text style={styles.textData}>{data.provincia}</Text>
                        <Text style={styles.textData}>{data.pais}</Text>
                    </View>
                </View>

                <Divider />

                <View style={styles.mapContainer}>
                    <MapView region={region} style={{ width: "80%", height: "80%" }}>
                        <Marker
                            coordinate={{
                                latitude: region.latitude,
                                longitude: region.longitude,
                            }}
                        />
                    </MapView>
                </View>
            </View>

            <View  style={styles.footerContainer}>
                <Divider />
                <View>
                    <TouchableOpacity
                        style={{ ...styles.button, backgroundColor: '#c75643' }}
                        onPress={() => openGps(data.address, data.zone, data.provincia, data.pais)}
                    >
                        <Text style={styles.textButton}>Go to Maps</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default InfoModal;
