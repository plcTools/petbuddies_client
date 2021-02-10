import React, { useEffect, useState } from "react";
import {
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

function PostReview({ getReviews, modalStatusChange, companyName, user, preRating }) {
  const [hotel, setHotel] = useState({});
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(preRating);

  useEffect(() => {
    axios
      .get(`/hotels/${companyName.hotelId}`)
      .then((hotelData) => setHotel(hotelData.data))
      .catch((err) => console.log(err));
  
  }, []);

  function handleSubmit() {
    const body = {
      serviceType: "Hotel",
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
      })
      .catch((err) => console.log(err));
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
            />
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text onPress={ handleSubmit } style={styles.publishBtn}>
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
            source={{
              uri: `${user.photo}`,
            }}
          />
          <Text style={styles.name}>{`${user.name} ${user.lastname}`}</Text>
          <Rating
            onFinishRating={(e) => setRating(e)}
            type="custom"
            startingValue={5}
            imageSize={30}
          />
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
