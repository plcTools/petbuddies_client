
import React, { useState } from "react";
import { Card, Image, Icon, CheckBox, Divider } from "react-native-elements";
import { View, Text, TouchableOpacity, Alert, Linking, Platform,Modal } from "react-native";
import { styles } from "./styles";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Rating } from "react-native-ratings";
import ModalReviewsScreen from './ModalReviewScreen/modalReviewsScreen'

function DetailsSpaCard(props: any) {

const peluqueria = props.data.peluqueria


  var region = {
    latitude: peluqueria.latitude || 0,
    longitude: peluqueria.longitude || 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };


  const [reviews, setReviews] = useState(props.data.reviews);

  function openWhatsApp() {
    props.data.whatsapp
      ? Alert.alert("WhatsApp", "¿Want to chat?", [
        {
          text: "OK",
          onPress: () => {
            Linking.openURL(
              `https://wa.me/${peluqueria.whatsapp}?text=Quiero mas Información`
            );
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ])
      : Alert.alert("This place hasen't WhatsApp");
  }

  function openTel() {
    props.data.phone
      ? Alert.alert("Phone", "¿Want to CALL?", [
        {
          text: "OK",
          onPress: () => {
            Linking.openURL(`tel:${peluqueria.phone}`);
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
    props.data.mail
      ? Alert.alert("Mail", "Want to send a MAIL?", [
        {
          text: "OK",
          onPress: () => {
            Linking.openURL(`mailito:${peluqueria.mail}`);
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


  function openGps(add:String, loc:String, prov:String, pais:String) {
    //var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';  
    var url = `https://www.google.com/maps/dir/?api=1&origin=&destination=${add} ${loc} ${prov} ${pais} &travelmode=bicycling`;
    Linking.openURL(url);
  }
  //por lat y long
  //`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

  //por direccion
  //`https://www.google.com/maps/dir/?api=1&origin=&destination=${props.data.address} ${props.data.localidad} ${props.data.provincia} ${props.data.pais} &travelmode=bicycling`

  const [modalRatingVisible, setModalRatingVisible] = useState(false);
  const modalRatingStatusChange = () => {
    setModalRatingVisible(!modalRatingVisible);
  };

  return (
    <View style={styles.containerAll}>
      <View style={styles.headersContainer}>

        <View style={{width: '90%', alignItems: 'flex-end'}}>
            <Icon
                name="times"
                type="font-awesome-5"
                color="red"
                size={15}
                onPress={() => {
                  props.modalStatusChange();
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
            source={{
              uri: `${props.data.peluqueria.photo[0]}`,
            }}
          />
          <Text style={styles.textTitle}>{peluqueria.name}</Text>
        </View>
        <View /* buttonsContainer */ style={styles.buttonsContainer}>
        
          <TouchableOpacity /* style={styles.button} */ onPress={() => openTel()}>
            <Icon 
              name='phone'
              type='font-awesome-5'
              color='blue'
            />
          </TouchableOpacity>

          <TouchableOpacity
           /*  style={styles.button} */
            onPress={() => openWhatsApp()}
          >
            <Icon 
              name='whatsapp'
              type='font-awesome-5'
              color='green'
            />
          </TouchableOpacity>

          <TouchableOpacity /* style={styles.button} */ onPress={() => openMail()}>
            <Icon 
              name='envelope'
              type='font-awesome-5'
              color='#ef4f4f'
            />
          </TouchableOpacity>
        </View>

        <Divider />

        <View /* dataContainer */ style={styles.dataContainer}>

          <View /* dataLeft */ style={styles.dataLeft}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Visit us!</Text>
            <TouchableOpacity onPress={() => reviews.prom && setModalRatingVisible(!modalRatingVisible)}>
                <View style={styles.socialRow}>
                  <Rating
                    readonly
                    type="custom"
                    startingValue={reviews.prom}//aca pido reviews
                    imageSize={15}
                  />
                  <Text style={styles.ratingText}>
                    {reviews.review.length} califications
                  </Text>
                </View>
              </TouchableOpacity>
          </View>

          <View /* dataRight */ style={styles.dataright} >
            <Text style={styles.textData}>{peluqueria.address}</Text>
            <Text style={styles.textData}>{peluqueria.localidad}</Text>
            <Text style={styles.textData}>{peluqueria.provincia}</Text>
            <Text style={styles.textData}>{peluqueria.pais}</Text>
          </View>
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
            style={{ ...styles.button, backgroundColor: '#c75643' }}
            /* onPress={() => openGps(region.latitude, region.longitude)} */
            onPress={() => openGps(peluqueria.address, peluqueria.localidad, peluqueria.provincia, peluqueria.pais)}
          >
            <Text style={styles.textButton}>Go to Maps</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRatingVisible}
        onRequestClose={() => {
          modalRatingStatusChange();
        }}
      >
        <ModalReviewsScreen
          modalRatingStatusChange={modalRatingStatusChange}
          data={{photo:peluqueria.photo,reviews}}
        />
      </Modal>
    </View>
  );
}

export default DetailsSpaCard;
