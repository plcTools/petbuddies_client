import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Animated,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  Linking,
} from "react-native";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { styles } from "./styles";
import { Icon, Divider, Overlay } from "react-native-elements";
import { Rating } from "react-native-ratings";
import axios from "axios";
import InfoModal from "../InfoModal";
const { width, height } = Dimensions.get("screen");
const imageW = width * 0.9;
const imageH = imageW * 1.7;

const WalkerProfile = ({
  navigation,
  route,
}: RouteStackParamList<"WalkerProfile">) => {
  const [state, setState] = React.useState<any>("");
  React.useEffect(() => {
    axios
      .get(`/walkers/${route.params.id}`)
      .then((result) => setState(result.data));
  }, []);
  const [modalVisible, setModalVisible] = React.useState(false);

  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

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
      <ScrollView style={styles.scroll}>
        <View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {/* Main container */}
            <View style={styles.cardContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.userRow}>
                  <Image style={styles.userImage} source={state?.photo ? state.photo[0] === 'h' ? { uri: `${state.photo}` } : { uri: `data:image/jpeg;base64,${state.photo}` } : require("../../images/logo.png")}
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
                    {state.reveiewsReceived} califications
                  </Text>
                </View>
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
                <Text style={styles.userDescriptionText}>
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
                <Text style={styles.userDescriptionText}>
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
                      <Text style={styles.userDescriptionText} key={index}>
                        {item}
                      </Text>
                    ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.messageRow}
                onPress={modalStatusChange}
              >
                <Text style={styles.messageText}>Get Contact Info</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Overlay
            isVisible={modalVisible}
            onBackdropPress={modalStatusChange}
            style={styles.overlay}
          >
            <View>
              <View style={styles.overlay}>
                <View>
                  <Image
                    style={styles.fotoverlay}
                    source={state?.photo ? state.photo[0] === 'h' ? { uri: `${state.photo}` } : { uri: `data:image/jpeg;base64,${state.photo}` } : require("../../images/logo.png")}                  />

                </View>
                <Text style={styles.titleOverlay}>
                  {state.name + " " + state.lastname}
                </Text>
              </View>

              <View style={styles.socialOverlay}>
                <Icon
                  name="phone"
                  type="font-awesome-5"
                  color="blue"
                  onPress={() => Linking.openURL(`tel:${state?.phone}`)}
                />
                <Icon
                  name="whatsapp"
                  type="font-awesome-5"
                  color="green"
                  onPress={() =>
                    Linking.openURL(
                      `https://wa.me/${state?.phone}?text=Quiero mas Información`
                    )
                  }
                />
                <Icon
                  name="envelope"
                  type="font-awesome-5"
                  color="#ef4f4f"
                  onPress={() => Linking.openURL(`mailto:${state?.email}`)}
                />
              </View>
            </View>
          </Overlay>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalkerProfile;
