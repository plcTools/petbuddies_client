import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacityComponent,
  Text,
  FlatList,
  SafeAreaView
} from "react-native";
import ReviewCard from "./reviewCard";
import axios from "axios";
import { Review } from './types';

function reviewsScreen({ route }: any) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const hotelId = route.params.hotelId;
    axios
      .get(`/reviews/Hotel/${hotelId}`)
      .then((hotelReviews) => setReviews(hotelReviews.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
        {reviews.map (review => <ReviewCard />)}
    </SafeAreaView>
  );
}

export default reviewsScreen;
