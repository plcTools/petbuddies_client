import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { RouteStackParamList } from "../../../NavigationConfig/types";
import { Icon } from "react-native-elements";
import { Rating } from "react-native-ratings";
// import Carousel from "react-native-snap-carousel";
import axios from "axios";


const HotelProfile = ({
  navigation,
  route,
}: RouteStackParamList<"HotelProfile">) => {
  const [state, setState] = React.useState<any>();
  React.useEffect(() => {
    axios
      .get(`/hotels/${route.params.id}`)
      .then((result) => setState(result.data));
  }, []);

  const renderLabel = () => {
    return (
      <View style={[styles.tabBar, styles.tabContainer]}>
        <View>
          <Animated.Text style={styles.tabLabelText}>
            $ {state.fee}
          </Animated.Text>
          <Animated.Text style={styles.tabLabelNumber}>Per Night</Animated.Text>
        </View>
        <View>
          <Animated.Text style={styles.tabLabelText}>Schedule</Animated.Text>
          <Animated.Text style={styles.tabLabelNumber}>
            {state.schedule}
          </Animated.Text>
        </View>
        <View>
          <Animated.Text style={styles.tabLabelText}>
            350
          </Animated.Text>
          <Animated.Text style={styles.tabLabelNumber}>
            Loved pets
          </Animated.Text>
        </View>
        {/* <View>
        <Animated.Text style={styles.tabLabelText}>
          100%
        </Animated.Text>
        <Animated.Text style={styles.tabLabelNumber}>
        Respuesta <br/>
        a mensajes
        </Animated.Text>
        </View> */}
      </View>
    );
  };
//   const carouselItems= [
//     {
//       title: "Item 1",
//       text: "Text 1",
//     },
//     {
//       title: "Item 2",
//       text: "Text 2",
//     },
//     {
//       title: "Item 3",
//       text: "Text 3",
//     },
//     {
//       title: "Item 4",
//       text: "Text 4",
//     },
//     {
//       title: "Item 5",
//       text: "Text 5"
//     }
//   ];

  if (!state) return <Icon name="spinner" reverse type="font-awesome-5" />;

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.userRow}>
              <Image style={styles.userImage} source={{ uri: state.photo }} />
              <View style={styles.userNameRow}>
                <Text style={styles.userNameText}>{state.name}</Text>
              </View>
              <View style={styles.userBioRow}>
                <Text style={styles.userBioText}>{state.description}</Text>
              </View>
            </View>
            <View style={styles.socialRow}>
              <Rating readonly startingValue={5} />
              <Text style={styles.ratingText}>{5} califications</Text>
            </View>
          </View>
          {renderLabel()}
          <View style={styles.descriptionRow}>
            <Icon
              name="map-marker"
              type="font-awesome"
              size={25}
              color="#c98c70"
            />
            <Text style={styles.userDescriptionText}>
              {state.address + ", " + state.zone}
            </Text>
          </View>
          <View style={styles.descriptionRow}>
            <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
            <Text style={styles.userDescriptionText}>{state.zone}</Text>
          </View>
          {/* <View>
            <Carousel
              sliderWidth={300}
              itemWidth={300}
              ref={(c) => {
                this.carousel = c;
              }}
              layout={"default"}
              data={carouselItems}
              renderItem={(item: any) =>{ return  (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Text style={{fontSize: 30}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>
          )}}
            />
          </View> */}
          <View style={styles.messageRow}>
            <Icon
              name="comments"
              type="font-awesome"
              reverse
              color="#456672"
              onPress={() => alert(`Ahora no puedo pasear :(`)}
            />
            <Text style={styles.messageText}>Send message</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
    marginTop: 30,
  },
  indicatorTab: {
    backgroundColor: "transparent",
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  messageRow: {
    flexDirection: "row",
    marginLeft: 0, //Tenia 40
    marginRight: 40,
  },
  tabBar: {
    backgroundColor: "#EEE",
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-around",
    paddingBottom: 2,
  },
  tabLabelNumber: {
    color: "gray",
    fontSize: 12.5,
    textAlign: "center",
  },
  tabLabelText: {
    color: "black",
    fontSize: 22.5,
    fontWeight: "600",
    textAlign: "center",
    width: 100, //Agregado
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'blue'
  },
  descriptionRow: {
    marginLeft: 20,
    marginRight: 40,
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  userBioText: {
    color: "gray",
    fontSize: 13.5,
    textAlign: "center",
  },
  userDescriptionText: {
    color: "gray",
    fontSize: 13.5,
    // textAlign: 'center',
    marginLeft: 5,
    textTransform: "capitalize",
  },
  ratingText: {
    color: "white",
    fontSize: 13.5,
    textAlign: "center",
    marginLeft: 14,
    margin: 10,
    backgroundColor: "gray",
    padding: 3,
    borderRadius: 5,
  },
  messageText: {
    color: "#456672",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5, //Tenia 14
    margin: 17, //Tenia 7
    width: 140, // No estaba
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  userRow: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});

export default HotelProfile;
