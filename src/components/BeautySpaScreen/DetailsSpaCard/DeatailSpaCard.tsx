import * as React from "react";
import { Card, Image, Icon, CheckBox, Divider } from "react-native-elements";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { styles } from "./styles";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

function DetailsSpaCard(props: any) {
  var region = {
    latitude: props.data.latitude || 0,
    longitude: props.data.longitude || 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  function openWhatsApp() {
    props.data.whatsapp
      ? Alert.alert("WhatsApp", "¿Want to chat?", [
          {
            text: "OK",
            onPress: () => {
              Linking.openURL(
                `https://wa.me/${props.data.whatsapp}?text=Quiero mas Información`
              );
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ])
      : Alert.alert("El establecimiento no posee WhatApp");
  }

  function openTel() {
    props.data.phone
      ? Alert.alert("Phone", "¿Want to CALL?", [
          {
            text: "OK",
            onPress: () => {
              Linking.openURL(`tel:${props.data.phone}`);
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ])
      : Alert.alert("El establecimiento no posee Telefono");
  }

  function openMail() {
    props.data.mail
      ? Alert.alert("Mail", "Want to send a MAIL?", [
          {
            text: "OK",
            onPress: () => {
              Linking.openURL(`mailito:${props.data.mail}`);
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ])
      : Alert.alert("El establecimiento no posee WhatApp");
  }

  return (
    <View /* containerAll */ style={styles.containerAll}>
      <View /* headerContainer*/ style={styles.headersContainer}>
        <View /* title */>
          <Text style={styles.textTitle}>{props.data.name}</Text>
        </View>

        <View /* buttonContainer */>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: "rgba(255,115,160, 0.5)",
            }}
            onPress={() => {
              props.modalStatusChange();
            }}
          >
            <Text style={styles.textButton}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View /* bodyContainer */ style={styles.bodyContainer}>
        <Divider />
        <View /* buttonsContainer */ style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => openTel()}>
            <Text style={styles.textButton}>Tel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => openWhatsApp()}
          >
            <Text style={styles.textButton}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => openMail()}>
            <Text style={styles.textButton}>Email</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <View /* mapContainer*/ style={styles.mapContainer}>
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

      <View /* footerContainer */ style={styles.footerContainer}>
        <Divider />
        <View /* buttonGoContainer*/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("hola")}
          >
            <Text style={styles.textButton}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default DetailsSpaCard;
