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
import ModalReviewCard from "./modalReviewCard";


function ModalReviewsScreen(params: any) {
console.log(params);



  const [reviews, setReviews] = useState(params.data.reviews);
 
  return (
    <SafeAreaView style={styles.containerAll}>
      <View style={styles.headers}>
        <Image style={styles.logo} source={{ uri: params.data.photo[0] }} />
      </View>
      <ScrollView style={styles.body}>
        {reviews.review?.map((review: any, i: number) => (
          <View style={styles.review} key={i}>
            <ModalReviewCard
              data={review}
              HotelData={params}
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
    width: 100,
    borderRadius:100

  },
  body: {
    width: '100%',
  },
  review:{
    padding:10,
  },


})

export default ModalReviewsScreen;


