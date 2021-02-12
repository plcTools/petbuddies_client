import React, { useEffect, useState } from "react";
import {Alert,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import axios from "axios";
import { Rating } from "react-native-ratings";
import { RootState, useAppDispatch } from "../../../redux/store";
import { getWalkers } from "../../../redux/walker/actions";
import { getHairdressers } from "../../../redux/Hairdressers/actions";
import { getHotels } from "../../../redux/hotels/actions";
import { useSelector } from "react-redux";
import { tema } from "../../../Theme/theme";

interface Props {
  service: string;
  getReviews: any
  modalStatusChange: any
  companyName: any
  user: any;
  preRating: any;
  /* esto hay que cambiarlo jajaj */
}
function PostReview({
  service,
  getReviews,
  modalStatusChange,
  companyName,
  user,
  preRating,
}:Props) {
  const [hotel, setHotel] = useState<any>({});
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(preRating);
  const theme = useSelector((state: RootState) => state.user.theme);

  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(`/hotels/${companyName.hotelId}`)
      .then((hotelData) => setHotel(hotelData.data))
      .catch((err) => alert(err));
  }, []);

  function handleSubmit() {
    const body = {
      serviceType: service,
      userId: user._id,
      userName: `${user.name? user.name : user.email} ${user.lastname ? user.lastname : ""}`,
      reviewedId: companyName.hotelId,
      rating: rating,
      reviewText: input,
    };
    axios
      .post("/reviews/", body)
      .then((res) => {
        getReviews();
        modalStatusChange();
        if (service === "Hotel") dispatch(getHotels());
        else if (service === "DogGroomer") dispatch(getHairdressers());
        else if (service === "Walker") dispatch(getWalkers());
      })
      .then(()=> Alert.alert("PetBuddies","Gracias por su comentario"))
      .catch((err) => alert(err));
  }

  return (
      <View style={[styles.container, !theme && tema.darkCard]}>
        <View style={styles.upView}>
          <View>
            <Icon
              name="arrow-left"
              type="font-awesome-5"
              size={25}
              color="#a3a3a3"
              onPress={() => modalStatusChange ()}
            />
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={[styles.hotelName, !theme && tema.darkText]}>{hotel.name}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text onPress={handleSubmit} style={[styles.publishBtn, !theme && tema.darkText]}>
                Publish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.userView, !theme && tema.darkView]}>
          <Image
            style={{
              marginTop: 10,
              height: 60,
              width: 60,
              borderRadius: 50,
              marginRight: 25,
            }}
            source={
              user?.photo
                ? user.photo[0] === "h"
                  ? { uri: `${user.photo}` }
                  : { uri: `data:image/jpeg;base64,${user?.photo}` }
                : require("../../../images/logo.png")
            }
          />
          <View style={styles.ratingView}>
            <Text style={[styles.name, !theme && tema.darkText]}>{user.name ? `${user.name}` : `${user.email}`}</Text>
            <View style={!theme && {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#fff",
        width: "90%",
        padding: 5,
        borderRadius: 15,
      }}>
            <Rating
              onFinishRating={(e) => setRating(e)}
              type="custom"
              startingValue={preRating}
              imageSize={30}
              />
            </View>
          </View>
        </View>
        <TextInput
          onChangeText={(e) => setInput(e)}
          multiline
          placeholder="Share details about your experience here"
          placeholderTextColor={!theme ? '#fff' : '#121212'}
          style={[styles.textInput, !theme && tema.darkText]}
        />
      </View>
  );
}

export default PostReview;
