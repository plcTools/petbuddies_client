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
import { useAppDispatch } from "../../../redux/store";
import { getWalkers } from "../../../redux/walker/actions";
import { getHairdressers } from "../../../redux/Hairdressers/actions";
import { getHotels } from "../../../redux/hotels/actions";

function PostReview({
  service,
  getReviews,
  modalStatusChange,
  companyName,
  user,
  preRating,
  navigation,
}) {
  const [hotel, setHotel] = useState({});
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(preRating);

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
      userName: `${user.name} ${user.lastname}`,
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
    <SafeAreaView>
      <View style={styles.container}>
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
            <Text style={styles.hotelName}>{hotel.name}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text onPress={handleSubmit} style={styles.publishBtn}>
                Publish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userView}>
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
            <Text style={styles.name}>{`${user.name} ${user.lastname}`}</Text>
            <Rating
              onFinishRating={(e) => setRating(e)}
              type="custom"
              startingValue={preRating}
              imageSize={30}
            />
          </View>
        </View>
        <TextInput
          onChangeText={(e) => setInput(e)}
          multiline
          placeholder="Share details about your experience here"
          style={styles.textInput}
        />
      </View>
    </SafeAreaView>
  );
}

export default PostReview;
