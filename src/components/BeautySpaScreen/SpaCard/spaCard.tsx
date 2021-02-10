import * as React from "react";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { Icon, Card, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_900Black_Italic,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_300Light_Italic,
  NunitoSans_300Light,
} from "@expo-google-fonts/nunito-sans";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { getOwnerFavGroomers } from "../../../redux/owner/actions";
import axios from "axios";
import InfoModal from "../../InfoModal";

function SpaCard(props: any) {
  
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);


  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

  const userFavGroomers = useSelector((state: RootState) => state.user.userFavGroomers);


  useEffect(() => {
    const found = userFavGroomers && userFavGroomers.find(peluqueria => peluqueria._id == props.id);
    if (found) setChecked(true);
  }, [])

  const navigation = useNavigation();

  let [fonts] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_900Black_Italic,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_300Light_Italic,
    NunitoSans_300Light,
  });

  const dispatch = useAppDispatch();


  /* Para Mostrar las reviews, Get a reviews
    y posteriormente se pasan por props a los childs */

    React.useEffect(() => {
      axios
        .get(`/reviews/DogGroomer/${props.peluqueria._id}`)
        .then((reviewsData) => {
          const sum = reviewsData.data
            .map((e: any) => e.rating)
            .reduce((a: any, c: any) => a + c, 0);
          const prom = Number (String (sum / reviewsData.data.length).slice (0,3));
          setReviews({ review: reviewsData.data, prom })
        })
        .catch((err) => console.log(err));
    }, []);
    /* console.log(1111111111,navigator.geolocation.getCurrentPosition((p) => p.coords )); */

     


  return (
    <Card containerStyle={styles.container} >
      <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('SpaProfile', {id: props.id,reviews})}>
        <View style={styles.cardHeader}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 4,
              marginRight: 10,
              marginTop: 3,
              marginBottom: 7,
            }}
            source={{
              uri: `${props.peluqueria.logo}`,
            }}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{props.peluqueria.name}</Text>
          </View>
        </View>
        <View>
          <Card.Divider />
          <Text style={{ fontFamily: "NunitoSans_600SemiBold", fontSize: 20 }}>
            {props.peluqueria.description}
          </Text>
          <View style={styles.workZone}>
            <Icon
              style={styles.icon}
              name="map-marker-alt"
              type="font-awesome-5"
              size={20}
              color="#fc5185"
            />
            <Text
              style={{
                textTransform: "capitalize",
                marginLeft: 6,
                fontFamily: "NunitoSans_600SemiBold",
              }}
            >
              {props.peluqueria.zone}
            </Text>
          </View>
        </View>
        <View style={styles.cardHeaderRate}>

            <Text style={{ marginRight: 5, fontSize: 15 }}>{
              reviews.prom > 0 && reviews.prom

            }</Text>
            <Icon
              name={reviews.prom && "star" || "star-o"}
              type="font-awesome"
              size={18}
              color="green"
              underlayColor="red"
            />

        </View>
        
      </TouchableOpacity>
      <View style={styles.fav}>
        <CheckBox
          uncheckedIcon={
            <Icon
            raised
            name="heart-o"
              type="font-awesome"
              size={15}
              color="black"
            />
          }
          checkedIcon={
            <Icon
              raised
              name="heart"
              type="font-awesome"
              size={15}
              color={"red"}
              />
            }
            checked={checked}
            onPress={async () => {
              if (!checked) {
                
                const result = await axios.patch(`/groomer/${props.userId}/favourites/${props.id}`);
                dispatch(getOwnerFavGroomers(props.userId));
                return setChecked(true);
              } else {
                const result = await axios.delete(
                  `/groomer/${props.userId}/favourites/${props.id}`
                  );
                  dispatch(getOwnerFavGroomers(props.userId));
                  return setChecked(false);
                }
                
              }} />
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          modalStatusChange();
        }}
      >
        {/* <DetailsSpaCard
          modalStatusChange={modalStatusChange}
          data={{peluqueria:props.peluqueria,reviews}}
        /> */}
      </Modal>
      </View>
    </Card>
  );
}

export default SpaCard;
