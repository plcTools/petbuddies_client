import "react-native-gesture-handler";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styles } from "./styles";
import { RouteStackParamList } from "../../../NavigationConfig/types";
import { Icon, Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import { tema } from "../../../Theme/theme";
import { Rating } from "react-native-ratings";
import axios from "axios";
import InfoModal from "../../InfoModal";
const { width } = Dimensions.get("screen");
const imageW = width * 0.9;
const imageH = imageW * 1.7;

const SpaProfile = ({
  navigation,
  route,
}: RouteStackParamList<"SpaProfile">) => {
  const theme = useSelector((state) => state.user.theme);
  const [state, setState] = React.useState<any>("");
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

  React.useEffect(() => {
    axios.get(`/groomer/${route.params.id}`).then((result) => {
      setState(result.data);
      setThisRegion({
        ...thisRegion,
        latitude: result.data.latitude,
        longitude: result.data.longitude,
      });
    });
  }, []);

  if (!state) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../images/loader.gif")}
          style={{ width: 200, height: 150 }}
        />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.scroll, !theme && tema.darkCard]}>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.cardContainer}>
            <View
              style={[
                styles.headerContainer,
                { borderColor: !theme ? "rgba(256,256,256, 0.4)" : "#ccc" },
              ]}
            >
              <View style={styles.userRow}>
                <Image style={styles.userImage} source={{ uri: state.logo }} />
                <View style={styles.userNameRow}>
                  <Text style={[styles.userNameText, !theme && tema.darkText]}>
                    {state?.name}
                  </Text>
                </View>
                <View style={styles.userBioRow}>
                  <Text style={[styles.userBioText, !theme && tema.darkText]}>
                    {state?.description}
                  </Text>
                </View>
              </View>
              <View style={styles.socialRow}>
                <Rating
                  readonly
                  type="custom"
                  startingValue={state?.rating}
                  imageSize={30}
                />
                <Text style={[styles.ratingText, !theme && tema.darkText]}>
                  {state?.reviewsReceived} califications
                </Text>
              </View>
            </View>
            <Divider />
            {state.adsPics && (
              <View style={{ maxHeight: 300 }}>
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
            )}
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
                {`$${state.fee} average per cut `}
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
                {`${state.workDays} : ${state.workHours} `}
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
              <Text
                style={[styles.userDescriptionText, !theme && tema.darkText]}
              >
                {state.address + ", " + state.zone}
              </Text>
            </View>
            {state.services?.length > 0 &&
              state.services?.map((item: string, index: number) => {
                return (
                  <View style={styles.descriptionRow} key={index}>
                    <View style={{ justifyContent: "center", width: 30 }}>
                      <Icon
                        name="plus"
                        size={25}
                        type="font-awesome-5"
                        color="#6a2c70"
                      />
                    </View>
                    <Text
                      style={[
                        styles.userDescriptionText,
                        !theme && tema.darkText,
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}

            <TouchableOpacity
              style={styles.messageRow}
              onPress={modalStatusChange}
            >
              <Text style={styles.messageText}>Get contact info</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              modalStatusChange();
            }}
          >
            <View
              style={[
                {
                  height: "100%",
                },
                {
                  backgroundColor: !theme
                    ? "rgba(0,0,0, 0.7)"
                    : "rgba(0,0,0,0.2)",
                },
              ]}
              // onPress={modalStatusChange}
            >
              <InfoModal modalStatusChange={modalStatusChange} data={state} />
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SpaProfile;
