  import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Divider, Icon } from "react-native-elements";
import SpaCard from "./SpaCard/spaCard";
import { useAppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { getHairdressers } from "../../redux/Hairdressers/actions";
import styles from "./styles";
import { getData } from "../../AsyncStorage/index";
import { getOwnerFavGroomers } from "../../redux/owner/actions";
import { Peluqueria } from "../../redux/Hairdressers/types";
import { tema } from "../../Theme/theme";

function BeautySpaScreen() {
  const [id, setId] = useState("");
  const [icon, setIcon] = React.useState<ModalChecks>({ walkers: true });
  const [input, setInput] = React.useState<ModalChecks>({});
  const [state, setState] = useState<any>(null);
  const [checked, setChecked] = React.useState<string | boolean>(false);
  const [check, setCheck] = React.useState<boolean>(false);
  const [list, setList] = React.useState<string[]>([]);
  const theme = useSelector((state) => state.user.theme);
  interface ModalChecks {
    [key: string]: boolean;
  }

  const retrieveStorage = async () => {
    const user: string = await getData();
    setId(user);
  };

  const peluquerias = useSelector(
    (state: RootState) => state.peluqueros.peluquerias
  );
  const userFavGroomers = useSelector(
    (state: RootState) => state.user.userFavGroomers
  );

  const dispatch = useAppDispatch();

  const handleIcon = (name: string) => {
    setIcon({
      [name]: true,
    });
  };
  const handleList = (peluquerias: Peluqueria[]) => {
    const arr: string[] = peluquerias.map((item) => item.zone);
    const uniqueZones = arr.filter(
      (item, index) => arr.indexOf(item) === index
    );
    return setList(uniqueZones);
  };
  const handleInput = (name: string) => {
    setInput({
      // ...input, -> esta comentado para q solo renderice por una sola zona
      [name]: input[name] ? false : true,
    });
  };

  React.useEffect(() => {
    retrieveStorage();
    if (Object.keys(peluquerias).length === 0) {
      dispatch(getHairdressers());
    }
    dispatch(getOwnerFavGroomers(id));
    handleList(peluquerias);
    setState(peluquerias);
  }, [dispatch, peluquerias]);

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
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <SpaCard id={item._id} peluqueria={item} userId={id} />;
          }}
        />
      </SafeAreaView>
    );
  };
  if (!id) {
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
          color={icon?.walkers ? "#07689f" : "grey"}
          onPress={() => {
            setState(peluquerias);
            setChecked(false);
            handleIcon("walkers");
          }}
        />
        <Icon
          name="star"
          type="font-awesome"
          color={icon?.star ? "#1fab89" : "grey"}
          onPress={() => {
            handleIcon("star");
            setState(() => {
              let newState = [...peluquerias];
              return newState.sort((a, b) => b.rating - a.rating);
            });
            setChecked(false);
          }}
        />
        <Icon
          name="heart"
          type="font-awesome"
          // color='red'
          color={icon?.heart ? "#ef4f4f" : "grey"}
          onPress={() => {
            setState(userFavGroomers);
            setChecked(false);
            handleIcon("heart");
          }}
        />
        <Icon
          name="map-marker-alt"
          type="font-awesome-5"
          // color='#00af91'
          color={icon?.house ? "#fc5185" : "grey"}
          onPress={() => {
            setCheck(!check);
            setChecked(false);
            handleIcon("house");
          }}
        />
      </View>
      <Divider />
      <View style={styles.container}>{renderComponent(state)}</View>
      {/*  {state !== null && state.map((item: any) => <SpaCard id={item._id} peluqueria={item} userId={id} />)} */}
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
                  backgroundColor: !theme ? "#303851" : "#ffff",
                  marginTop: 10,
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
                        peluquerias.filter(
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
}

export default BeautySpaScreen;
