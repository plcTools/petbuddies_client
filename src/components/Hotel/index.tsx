import "react-native-gesture-handler";
import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon, Divider } from "react-native-elements";
import { styles } from "../WalkerScreen/styles";
import HotelCard from "./HotelCard/index";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { getData } from "../../AsyncStorage/index";
import { getHotels } from "../../redux/hotels/actions";
import { getOwnerFavHotels } from "../../redux/owner/actions";
import { Hotel } from "../../redux/hotels/types";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_900Black_Italic,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_300Light_Italic,
  NunitoSans_300Light,
} from "@expo-google-fonts/nunito-sans";
import { tema } from "../../Theme/theme";

interface ModalChecks {
  [key: string]: boolean;
}

const HotelScreen = () => {

  const dispatch = useAppDispatch();
  const [state, setState] = React.useState<any | typeof hotels>(null);
  const [check, setCheck] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<string | boolean>(false);
  const [input, setInput] = React.useState<ModalChecks>({});
  const [icon, setIcon] = React.useState<ModalChecks>({ hotels: true });
  const [list, setList] = React.useState<string[]>([]);
  const theme = useSelector((state: RootState) => state.user.theme);
  const hotels = useSelector((state: RootState) => state.hotels.hotels);
  const [id, setId] = React.useState<string>("");
  const userFavHotels = useSelector(
    (state: RootState) => state.user.userFavHotels
  );
  let [fonts] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_900Black_Italic,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_300Light_Italic,
    NunitoSans_300Light,
  });

  const handleList = (hotels: Hotel[]) => {
    const arr: string[] = hotels.map((item) => item.zone);
    const uniqueZones = arr.filter(
      (item, index) => arr.indexOf(item) === index
    );
    return setList(uniqueZones);
  };
  const retrieveStorage = async () => {
    const user: string = await getData();
    setId(user);
  };

  const handleInput = (name: string) => {
    setInput({
      // ...input, -> esta comentado para q solo renderice por una sola zona
      [name]: input[name] ? false : true,
    });
  };

  const handleIcon = (name: string) => {
    setIcon({
      [name]: true,
    });
  };

  const renderComponent = (arr: any) => {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <FlatList
          data={arr}
          keyExtractor={(item: Hotel) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <HotelCard hotel={item} userFavHotels={userFavHotels} />;
          }}
        />
      </SafeAreaView>
    );
  };

  /*   React.useEffect(() => {
      retrieveStorage();
      if (Object.keys(hotels).length === 0) {
        dispatch(getHotels());
      }
      dispatch(getOwnerFavHotels(id));
      handleList(hotels);
      setState(hotels);
    }, [dispatch, hotels]); */


  useFocusEffect(
    React.useCallback(() => {
      retrieveStorage();
      handleList(hotels);
      if (Object.keys(hotels).length > 0) {
        setState(hotels);
        dispatch(getOwnerFavHotels(id));
      } else {
        dispatch(getHotels());
      }
    }, [dispatch, hotels])
  );

  if (!fonts) {
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
    <View style={[!theme ? tema.darkCard : tema.lightContainer]}>
      <Divider />
      <View style={styles.viewIcons}>
        <Icon
          name="list-ul"
          type="font-awesome"
          color={icon?.hotels ? "#07689f" : "grey"}
          onPress={() => {
            setState(hotels);
            setChecked(false);
            handleIcon("hotels");
          }}
        />
        <Icon
          name="star"
          type="font-awesome"
          // color='#f8dc81'
          color={icon?.star ? "#1fab89" : "grey"}
          onPress={() => {
            handleIcon("star");
            setState(() => {
              let newState = [...hotels];
              return newState.sort((a, b) => b.rating - a.rating);
            });
            setChecked(false);
          }}
        />
        <Icon
          name="heart"
          type="font-awesome"
          color={icon?.heart ? "#ef4f4f" : "grey"}
          onPress={() => {
            setState(userFavHotels);
            setChecked(false);
            handleIcon("heart");
          }}
        />
        <Icon
          name="map-marker-alt"
          type="font-awesome-5"
          color={icon?.house ? "#fc5185" : "grey"}
          onPress={() => {
            setCheck(!check);
            setChecked(false);
            handleIcon("house");
          }}
        />
      </View>
      <Divider />
      {checked ? (
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "NunitoSans_600SemiBold",
                textTransform: "capitalize",
                fontSize: 18,
              }}
            >
              hotels por {checked}
            </Text>
          </View>
          <Divider />
        </>
      ) : null}
      <View style={styles.container}>{renderComponent(state)}</View>
      <View>
        <Modal animationType="slide" transparent={true} visible={check}>
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
          >
            <View
              style={[
                {
                  backgroundColor: "#f1f1f1",
                  marginVertical: "30%",
                  padding: 20,
                  marginHorizontal: 15,
                  borderRadius: 25,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
                !theme && tema.darkContainer,
              ]}
            >
              <View style={{ width: "100%", alignItems: "flex-end" }}>
                <Icon
                  name="times"
                  type="font-awesome-5"
                  onPress={() => {
                    setCheck(false);
                    setIcon({});
                  }}
                  color="red"
                  size={15}
                />
              </View>
              <Text
                style={[
                  {
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 10,
                    width: 300,
                    textAlign: "center",
                  },
                  !theme && tema.darkText,
                ]}
              >
                Select your neighborhood
              </Text>
              {list &&
                list.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      {
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: 10,
                        marginBottom: 5,
                        marginTop: 5,
                        padding: 7,
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 5,
                        elevation: 3,
                      },
                      !theme && { backgroundColor: "#303841" },
                    ]}
                    onPress={() => handleInput(item)}
                  >
                    <Text
                      style={[
                        { marginLeft: 10, textTransform: "capitalize" },
                        !theme && tema.darkText,
                      ]}
                    >
                      {item}
                    </Text>
                    <Icon
                      name={input[item] ? "check" : "plus"}
                      type="font-awesome-5"
                      size={13}
                      color={input[item] ? "green" : "gray"}
                    />
                  </TouchableOpacity>
                ))}

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: !theme ? "#303851" : "#ffff",
                  borderRadius: 8,
                  padding: 5,
                  width: "70%",
                }}
                onPress={() => {
                  for (const prop in input) {
                    if (input[prop]) {
                      setCheck(!check);
                      setChecked(prop);
                      return setState(
                        hotels.filter(
                          (h) => h.zone.toLowerCase() === prop.toLowerCase()
                        )
                      );
                    }
                  }
                }}
              >
                <Text
                  style={[{ textAlign: "center" }, !theme && tema.darkText]}
                >
                  Select
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HotelScreen;
