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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tema } from "../../Theme/theme";

function reviewCard(props: any) {
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <View style={[styles.container, !theme && tema.darkContainer]}>
      <View style={[styles.detailUp, !theme && tema.darkView]}>
        <Text style={{ color: "white" }}>{props.data.userName || props.data.userEmail}</Text>
        <Text style={{ color: "white" }}>{props.data.date.split()}</Text>
      </View>
      <View style={styles.detailDown}>
        <Text style={!theme && { color: '#fff'}}>{props.data.reviewText}</Text>
      </View>
      <View style={!theme && {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#fff",
        width: "50%",
        marginHorizontal: '25%',
        padding: 5,
        borderRadius: 15,
      }}>
        <Rating
          readonly
          type="custom"
          startingValue={props.data.rating}
          imageSize={20}
          />
        </View>
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
