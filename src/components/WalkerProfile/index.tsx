import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { Icon, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";
import axios from "axios";
const { width, height } = Dimensions.get("screen");
const imageW = width * 0.9;
const imageH = imageW * 1.7;

const WalkerProfile = ({
  navigation,
  route,
}: RouteStackParamList<"WalkerProfile">) => {
  const [state, setState] = React.useState<any>('');
  React.useEffect(() => {
    axios
      .get(`/walkers/${route.params.id}`)
      .then((result) => setState(result.data));
  }, []);

  const renderLabel = () => {
    return (
      <View style={[styles.tabBar, styles.tabContainer]}>
        <View>
          <Animated.Text style={styles.tabLabelText}>
            $ {state.fee}
          </Animated.Text>
          <Animated.Text style={styles.tabLabelNumber}>Per Walk</Animated.Text>
        </View>
        <View>
          <Animated.Text style={styles.tabLabelText}>
            {state.workHours}
          </Animated.Text>
          <Animated.Text style={styles.tabLabelNumber}>
            Working Hours
          </Animated.Text>
        </View>
        <View>
          <Animated.Text style={styles.tabLabelText}>
            {state.walks || 0}
          </Animated.Text>
          <Animated.Text style={styles.tabLabelNumber}>
            Walks completed
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

  if(!state) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image 
          source={require('../../images/loader.gif')}
          style={{width: 200, height: 150}}
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={{flex:1, justifyContent:'center'}}>
        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.userRow}>
              <Image style={styles.userImage} source={state?.photo ? {uri:`${state.photo}`} : require("../../images/logo.png")}
 />
              <View style={styles.userNameRow}>
                <Text style={styles.userNameText}>
                  {state.name + " " + state.lastname}
                </Text>
              </View>
              <View style={styles.userBioRow}>
                <Text style={styles.userBioText}>{state.description}</Text>
              </View>
            </View>
            <View style={styles.socialRow}>
                <Rating
                  readonly
                  type="custom"
                  startingValue={state.rating}
                  imageSize={30}
                />
                <Text style={styles.ratingText}>
                  {state.reviewsReceived} califications
                </Text>
              </View>
          </View>
          {renderLabel()}
          <Divider />
          {
              state.adsPics && 
            <View style={{ maxHeight: 300, backgroundColor: '#f4f4f4' }}>
              <FlatList
                data={state.adsPics}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({ item }) => (
                  <View
                    style={{
                      width,
                      justifyContent: "center",
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.0,

                      elevation: 24,
                    }}
                  >
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: imageW,
                        height: imageH,
                        resizeMode: "contain",
                        borderRadius: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.0,

                      }}
                    />
                  </View>
                )}
              />
            </View>
            }
          <Divider />
          <View style={styles.descriptionRow}>
            <Icon
              name="map-marker"
              type="font-awesome"
              reverse
              size={25}
              color="#6a2c70"
            />
            <Text style={styles.userDescriptionText}>
              lives in {state.zona}
            </Text>
          </View>
          <View style={styles.descriptionRow}>
            <Icon name="paw" type="font-awesome" size={25} color="#6a2c70" reverse/>
            {state.workZone?.length > 0 &&
                state.workZone.map((item: string, index: number) => (
                  <Text style={styles.userDescriptionText} key={index}>
                    {item}
                  </Text>
                ))}
          </View>
          <TouchableOpacity
              style={styles.messageRow}
              onPress={() => {}}
            >
            <Text style={styles.messageText}>Get Contact Info</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    flex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 15,
    borderRadius: 15,
    width: "90%",
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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    padding: 5,
    borderRadius: 15,
  },
  messageRow: {
    display: 'flex',
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: '#456672',
    borderRadius: 10,
    padding: 8
  },
  tabBar: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    borderRadius: 5,
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-around",
    paddingBottom: 2,
  },
  tabLabelNumber: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  tabLabelText: {
    color: "#fff",
    fontSize: 22.5,
    fontWeight: "600",
    textAlign: "center",
    width: 100, //Agregado
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  descriptionRow: {
    width: "80%",
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  userBioText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  userDescriptionText: {
    color: "#000",
    fontSize: 15,
    textAlign: "center",
    marginLeft: 15,
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
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

const style={
  width: "90%",
  height: 200,
  marginBottom: 30,
  borderRadius: 16
}


export default WalkerProfile;
