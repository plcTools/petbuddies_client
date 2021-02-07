import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacityComponent,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import ReviewCard from "./reviewCard";


function reviewsScreen({ route }: any) {
  const [reviews, setReviews] = useState(route.params.reviews);
  return (
    <SafeAreaView style={styles.containerAll}>
      <View style={styles.headers}>
        <Image style={styles.logo} source={{ uri: route.params.photo }} />
      </View>
      <ScrollView style={styles.body}>
        {reviews.review?.map((review: any, i: number) => (
          <View style={styles.review} key={i}>
            <ReviewCard
              data={review}
              HotelData={route.params}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  containerAll: {
    alignItems: "center",
    backgroundColor: 'white',
    height:'100%'
  },
  headers: {
    padding: 20
  },
  logo: {
    height: 100,
    width: 100
  },
  body: {
    width: '100%',
  },
  review:{
    padding:10,
  },


})

export default reviewsScreen;


