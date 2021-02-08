import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import axios from "axios";
import { Rating } from "react-native-ratings";

function PostReview({ modalStatusChange, companyName, user }) {
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    axios
      .get(`/hotels/${companyName.hotelId}`)
      .then((hotelData) => setHotel(hotelData.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.upView}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            size={25}
            color="#a3a3a3"
          />
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <TouchableOpacity>
            <Text style={styles.publishBtn}>Publish</Text>
          </TouchableOpacity>
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
            type="custom"
            startingValue={5}
            imageSize={30}
          />
        </View>
        <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1 }} />
      </View>
    </SafeAreaView>
  );
}

export default PostReview;
