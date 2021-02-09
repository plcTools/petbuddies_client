import "react-native-gesture-handler";
import React from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Linking,
  TouchableOpacity,
  Modal
} from "react-native";
import { RouteStackParamList } from "../../../NavigationConfig/types";
import { Icon, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { NunitoSans_900Black } from "@expo-google-fonts/nunito-sans";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import InfoModal from "../../InfoModal";
const { width, height } = Dimensions.get("screen");
const imageW = width * 0.9;
const imageH = imageW * 1.7;

const HotelProfile = ({
  navigation,
  route,
}: RouteStackParamList<"HotelProfile">) => {
  const [state, setState] = React.useState<any>('');
  const [thisRegion, setThisRegion] = React.useState<any>({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    latitude: 0,
    longitude: 0,
  });
  const [modalVisible, setModalVisible] = React.useState(false);

  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

  interface Region {
    latitude?: number;
    longitude?: number;
    longitudeDelta: number;
    latitudeDelta: number;
  }

  React.useEffect(() => {
    axios.get(`/hotels/${route.params.id}`).then((result) => {
      setState(result.data);
      setThisRegion({
        ...thisRegion,
        latitude: result.data.latitude,
        longitude: result.data.longitude,
      });
    });
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
            {state.workHours}
          </Animated.Text>
        </View>
        <View>
          <Animated.Text style={styles.tabLabelText}>
            {state.petsLoved ? state.petsLoved : "?"}
          </Animated.Text>
          <Animated.Text style={styles.tabLabelNumber}>
            Loved pets
          </Animated.Text>
        </View>
      </View>
    );
  };

  if(!state) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image 
          source={require('../../../images/loader.gif')}
          style={{width: 200, height: 150}}
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.userRow}>
                <Image style={styles.userImage} source={{ uri: state.logo }} />
                <View style={styles.userNameRow}>
                  <Text style={styles.userNameText}>{state.name}</Text>
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
                reverse
                type="font-awesome"
                size={25}
                color="#6a2c70"
              />
              <Text style={styles.userDescriptionText}>
                {state?.address + ", " + state?.zone}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Icon
                name="paw"
                reverse
                type="font-awesome"
                size={25}
                color="#6a2c70"
              />
              {state.allowedPets?.length > 0 &&
                state.allowedPets.map((item: string, index: number) => (
                  <Text style={styles.userDescriptionText} key={index}>
                    {item}
                  </Text>
                ))}
            </View>
            {state.foodInclude && (
              <View style={styles.descriptionRow}>
                <Icon
                  name="utensils"
                  reverse
                  type="font-awesome-5"
                  size={25}
                  color="#6a2c70"
                />
                <Text style={styles.userDescriptionText}>Comida incluida</Text>
              </View>
            )}
            {state.requirement?.length > 0 && (
              <View style={styles.descriptionRow}>
                <Icon
                  name="clipboard-list"
                  reverse
                  type="font-awesome-5"
                  size={25}
                  color="#6a2c70"
                />
                <Text style={{ color: "#000", marginLeft: 15, fontSize: 15 }}>
                  Requisitos: {state.requirement}
                </Text>
              </View>
            )}

            {state.extras?.length > 0 && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  width: "80%",
                  marginTop: 15,
                }}
              >
                <Text style={{ fontSize: 20, color: "#000" }}>
                  Este hotel ademas cuenta con:
                </Text>
                {state.extras?.map((item: string, index: number) => {
                  return (
                    <View style={styles.descriptionRow} key={index}>
                      <Icon
                        reverse
                        name="plus"
                        size={13}
                        type="font-awesome-5"
                        color="#6a2c70"
                      />
                      <Text style={styles.userDescriptionText}>{item}</Text>
                    </View>
                  );
                })}
              </View>
            )}
            <MapView
              style={{
                width:'90%',
                height: 200,
                marginBottom: 30,
                marginTop: 30,
              }}
              region={thisRegion}
            >
              <Marker
                coordinate={{
                  latitude: thisRegion.latitude || 0,
                  longitude: thisRegion.longitude || 0,
                }}
              />
            </MapView>
            <TouchableOpacity
              style={styles.messageRow}
              onPress={modalStatusChange}
            >
              <Text style={styles.messageText}>Get contact info</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            modalStatusChange();
          }}
        >
          <InfoModal
            modalStatusChange={modalStatusChange}
            data={state}
          />
        </Modal>
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
    flexDirection: "row",
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
    marginLeft: 5, 
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

export default HotelProfile;
