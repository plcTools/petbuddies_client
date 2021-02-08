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
  Modal
} from "react-native";
import { RouteStackParamList } from "../../../NavigationConfig/types";
import { Icon, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";
import axios from "axios";
import InfoModal from "../../InfoModal";
import {styles} from './styles'
const { width } = Dimensions.get("screen");
const imageW = width * 0.9;
const imageH = imageW * 1.7;

const HotelProfile = ({ navigation, route, }: RouteStackParamList<"HotelProfile">) => {
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

  if (!state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../../images/loader.gif')}
          style={{ width: 200, height: 150 }}
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.cardContainer}>
            {/* Main Info Box */}
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
            <Divider />
            {/* Fotos */}
            {
              state.adsPics &&
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
            }
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
                {`$${state.fee} per night`}
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
              <Text style={styles.userDescriptionText}>
                {state.address + ", " + state.zone}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <View style={{ justifyContent: "center", width: 30 }}>
                <Icon
                  name="paw"
                  type="font-awesome"
                  size={23}
                  color="#6a2c70"
                />
              </View>
              {state.allowedPets?.length > 0 &&
                <Text style={styles.userDescriptionText}>
                  {`We accept:`}
                </Text>}
              {state.allowedPets?.length > 0 &&
                state.allowedPets.map((item: string, index: number) => (
                  <Text style={styles.userDescriptionText} key={index}>
                    {`${`- ${item}  -`}`}
                  </Text>
                ))}
            </View>
            {state.foodInclude && (
              <View style={styles.descriptionRow}>
                <View style={{ justifyContent: "center", width: 30 }}>
                  <Icon
                    name="utensils"
                    type="font-awesome-5"
                    size={25}
                    color="#6a2c70"
                  />
                </View>
                <Text style={styles.userDescriptionText}>Comida incluida</Text>
              </View>
            )}
            {state.requirement?.length > 0 && (
              <View style={styles.descriptionRow}>
                <View style={{ justifyContent: "center", width: 30 }}>
                  <Icon
                    name="clipboard-list"
                    type="font-awesome-5"
                    size={25}
                    color="#6a2c70"
                  />
                </View>
                <Text style={styles.userDescriptionText}>
                  Requisitos: {state.requirement}
                </Text>
              </View>
            )}

            {state.extras?.length > 0 &&
              state.extras?.map((item: string, index: number) => {
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
                    <Text style={styles.userDescriptionText}>{item}</Text>
                  </View>
                );
              })
            }
            <TouchableOpacity
              style={styles.messageRow}
              onPress={modalStatusChange}
            >
              <Text style={styles.messageText}>Get contact info</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* InfoModal */}
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

export default HotelProfile;
