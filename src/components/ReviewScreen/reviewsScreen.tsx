import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacityComponent,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import ReviewCard from "./reviewCard";
import { Image, Divider } from "react-native-elements";
import { getData } from "../../AsyncStorage/index";
import axios from "axios";
import { Rating } from "react-native-ratings";
import styles from "./styles";
import PostReview from "./PostReview/PostReview";

function reviewsScreen({ route }: any) {

  // hotelId: state._id,
  //                   photo: state.logo,
  //                   reviews: reviews,
  //                   service: "Hotel",

  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const retrieveStorage = async () => {
    const user: string = await getData();
    const usuario = await axios.get(`/owners/${user}`);
    setUser(usuario.data.owner);
    const hotel = route.params.hotelId;
    const allReviews = await axios.get(`/reviews/${route.params.service}/${hotel}`);
    setReviews(allReviews.data);
  };

  console.log (route, '<=============== Route');

  const getReviews = async () => {
    const hotel = route.params.hotelId;
    const allReviews = await axios.get(`/reviews/${route.params.service}/${hotel}`);
    setReviews(allReviews.data);
  };

  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    retrieveStorage();
  }, []);

  function finishRating(e) {
    setRating(e);
    modalStatusChange();
  }

  return (
    <SafeAreaView style={styles.containerAll}>
      <Divider style={styles.divider} />
      <View style={styles.ratingView}>
        <Text style={styles.title}>Rate and give your opinion</Text>
        <Text style={styles.secondLine}>
          Share your experience and help other users get a clearer idea about
          the place.
        </Text>
        <View style={styles.imageView}>
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
          <Rating
            onFinishRating={(e) => finishRating(e)}
            type="custom"
            startingValue={5}
            imageSize={30}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <ScrollView style={styles.body}>
        {reviews?.map((review: any, i: number) => (
          <View style={styles.review} key={i}>
            <ReviewCard data={review} HotelData={route.params} />
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          modalStatusChange();
        }}
      >
        <PostReview
          service={route.params.service}
          getReviews={getReviews}
          preRating={rating}
          user={user}
          companyName={route.params}
          modalStatusChange={modalStatusChange}
        />
      </Modal>
    </SafeAreaView>
  );
}

export default reviewsScreen;
