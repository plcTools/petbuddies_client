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
import { getHotels } from "../../redux/hotels/actions";
import { RootState, useAppDispatch } from "../../redux/store";
import { getWalkers } from "../../redux/walker/actions";
import { getHairdressers } from "../../redux/Hairdressers/actions";
import { tema } from "../../Theme/theme";
import { useSelector } from "react-redux";
import { Review } from "./types";

function reviewsScreen({ route, navigation }: any) {
  const theme = useSelector((state: RootState) => state.user.theme);

  const dispatch = useAppDispatch();

  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState<any>({});
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyCommented, setAlreadyCommented] = useState(false);

  const retrieveStorage = async () => {
    const user: string = await getData();
    const usuario: any = await axios.get(`/owners/${user}`);
    setUser(usuario.data.owner);
    const hotel = route.params.hotelId;
    const allReviews: any = await axios.get(
      `/reviews/${route.params.service}/${hotel}`
    );
    const found = allReviews.data.find(
      (review: Review) => review.userId == usuario.data.owner._id
    );
    if (found) setAlreadyCommented(true);
    setReviews(allReviews.data);
  };

  const getReviews = async () => {
    const hotel = route.params.hotelId;
    const allReviews = await axios.get(
      `/reviews/${route.params.service}/${hotel}`
    );
    setReviews(allReviews.data);
  };

  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    retrieveStorage();
  }, []);

  function finishRating(e: any) {
    setRating(e);
    modalStatusChange();
  }

  return (
    <SafeAreaView style={[styles.containerAll, !theme && tema.darkCard]}>
      <Divider style={styles.divider} />
      <View style={styles.ratingView}>
        {!alreadyCommented && (
        <View>
          <Text style={[styles.title, !theme && tema.darkText]}>
            Rate and give your opinion
          </Text>
          <Text style={[styles.secondLine, !theme && tema.darkText]}>
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
              source={
                user?.photo
                  ? user.photo[0] === "h"
                    ? { uri: `${user.photo}` }
                    : { uri: `data:image/jpeg;base64,${user?.photo}` }
                  : require("../../images/logo.png")
              }
            />
            <Rating
              onFinishRating={(e) => finishRating(e)}
              type="custom"
              startingValue={5}
              imageSize={30}
            />
          </View>
        </View>
        )}
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
          navigation={navigation}
        />
      </Modal>
    </SafeAreaView>
  );
}

export default reviewsScreen;
