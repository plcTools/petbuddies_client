import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacityComponent,
  Text,
  StyleSheet,
} from "react-native";
import { Rating } from "react-native-ratings";

function reviewCard(props: any) {

  return (
    <View style={styles.container}>
      <View style={styles.detailUp}>
        <Text style={{ color: "white" }}>{props.data.userName}</Text>
        <Text style={{ color: "white" }}>{props.data.date.split()}</Text>
      </View>
      <View style={styles.detailDown}>
        <Text>{props.data.reviewText}</Text>
      </View>

      <Rating
        readonly
        type="custom"
        startingValue={props.data.rating}
        imageSize={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    borderColor: "#c98c70",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
  },
  detailUp: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#c98c70",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#c98c70",
  },
  detailDown: {
    padding: 10,
  },
});

export default reviewCard;
