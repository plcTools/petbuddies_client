import "react-native-gesture-handler";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Linking,
} from "react-native";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { styles } from "./styles";
import { Icon, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { tema } from "../../Theme/theme";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store'
import { useFocusEffect } from "@react-navigation/native";

const WalkerProfile = ({
  navigation,
  route,
}: RouteStackParamList<"WalkerProfile">) => {
  const [state, setState] = React.useState<any>("");
  const theme = useSelector((state: RootState) => state.user.theme);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`/walkers/${route.params.id}`)
        .then((result) => setState(result.data));
    }, [])
  );

  if (!state) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../images/loader.gif")}
          style={{ width: 200, height: 150 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flex: 1,
        height: "100%",
      }}
    >

      <ScrollView style={[styles.scroll, !theme && tema.darkCard]}>

        <View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {/* Main container */}
            <View style={styles.cardContainer}>
              <View
                style={[
                  styles.headerContainer,
                  { borderColor: !theme ? "rgba(256,256,256,0.4)" : "#ccc" },
                ]}
              >
                <View style={styles.userRow}>


                  <Image style={styles.userImage} source={state?.photo ? state.photo[0] === 'h' ? { uri: `${state.photo}` } : { uri: `data:image/jpeg;base64,${state.photo}` } : require("../../images/logo.png")}

                  />
                  <View style={styles.userNameRow}>
                    <Text
                      style={[styles.userNameText, !theme && tema.darkText]}
                    >
                      {state.name + " " + state.lastname}
                    </Text>
                  </View>
                  <View style={styles.userBioRow}>
                    <Text style={[styles.userBioText, !theme && tema.darkText]}>
                      {state.description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ReviewsScreen", {
                      hotelId: state._id,
                      photo: state.logo,
                      service: "Walker",
                    })
                  }
                >
                  <View style={styles.socialRow}>
                    <Rating
                      readonly
                      type="custom"
                      startingValue={state.rating}
                      imageSize={30}
                    />

                    <Text style={styles.ratingText}>
                      {state.reviewsReceived.length} califications
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Divider />
              {/* Description items */}
              <View style={styles.descriptionRow}>
                <View style={{ justifyContent: "center", width: 30 }}>
                  <Icon
                    name="dollar-sign"
                    type="font-awesome-5"
                    size={25}
                    color="#6a2c70"
                  />
                </View>
                <Text
                  style={[styles.userDescriptionText, !theme && tema.darkText]}
                >
                  {`$${state.fee} average per walk `}
                </Text>
              </View>
              <View style={styles.descriptionRow}>
                <View style={{ justifyContent: "center", width: 30 }}>
                  <Icon
                    name="clock"
                    type="font-awesome-5"
                    size={25}
                    color="#6a2c70"
                  />
                </View>
                <Text
                  style={[styles.userDescriptionText, !theme && tema.darkText]}
                >
                  {`${state.workHours} `}
                </Text>
              </View>
              <View style={styles.descriptionRow}>
                <View style={{ justifyContent: "center", width: 30 }}>
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    size={25}
                    color="#6a2c70"
                  />
                </View>
                <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                  {state.workZone?.length > 0 &&
                    state.workZone.map((item: string, index: number) => (
                      <Text
                        style={[
                          styles.userDescriptionText,
                          !theme && tema.darkText,
                        ]}
                        key={index}
                      >
                        {item}
                      </Text>
                    ))}
                </View>
              </View>
              {/* <TouchableOpacity
                style={styles.messageRow}
                onPress={modalStatusChange}
                >
                </TouchableOpacity> }
                </View>
                </View>
                {/* <Overlay
                  isVisible={modalVisible}
                  onBackdropPress={modalStatusChange}
                  style={styles.overlay}
                > */}
            </View>
            {/* </View>
          <Overlay
            isVisible={modalVisible}
            onBackdropPress={modalStatusChange}
            style={styles.overlay}
          >
            <View> */}
            <View
              style={[
                styles.socialOverlay,
                { borderColor: !theme ? "#fff" : "#ccc" },
              ]}
            >
              <Text style={[styles.messageText, !theme && tema.darkText]}>
                {" "}
                Contact Info
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Icon
                  name="phone"
                  type="font-awesome-5"
                  color="#11698e"
                  onPress={() => Linking.openURL(`tel:${state?.phone}`)}
                />
                <Icon
                  name="whatsapp"
                  type="font-awesome-5"
                  color="#16c79a"
                  onPress={() =>
                    Linking.openURL(
                      `https://wa.me/${state?.phone}?text=Quiero mas Información`
                    )
                  }
                />
                <Icon
                  name="envelope"
                  type="font-awesome-5"
                  color="#f05454"
                  onPress={() => Linking.openURL(`mailto:${state?.email}`)}
                />
              </View>
            </View>
          </View>
          {/* </Overlay> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalkerProfile;
