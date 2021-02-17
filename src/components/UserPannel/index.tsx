import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Linking, Share, Text, LogBox } from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { getData } from "../../AsyncStorage/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getWalkers } from "../../redux/walker/actions";
import { Switch } from "react-native-switch";
import { changeTheme } from "../../redux/owner/actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { tema } from "../../Theme/theme";
import {RootState} from '../../redux/store'
import { getOwner } from "../../redux/owner/actions";
import {changeThemeStorage, getTheme} from '../../AsyncStorage'


const UserPannel = ({ navigation }: RouteStackParamList<"UserPannel">) => {
  const theme = useSelector((state: RootState) => state.user.theme);
  const [state, setState] = React.useState<any>();
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const owners = useSelector((state: RootState) => state.user.owner);
  const dispatch = useDispatch();

  const toggleSwitch = async () => {
    await changeThemeStorage(!theme)
    dispatch(changeTheme());
  };
  

  const retrieveStorage = async () => {
    const id = await getData();
    axios.get(`/walkers/${id}`).then((result) => setState(result.data));
  };
  useEffect(() => {
    setEnabled(theme);
  }, [theme]);

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]); // Para quitar un error de log que salia en la pantalla
    if(!state) {
      retrieveStorage();
    }
  }, [owners]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@id");
      navigation.push("LoginScreen");
    } catch (e) {
      alert(e);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey there! I'm using PetBuddies, a fast, simple and secure app, perfect for finding pet walkers and everything related to your pet! Download it here https://petbuddies.com/dl/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={!theme && tema.darkCard}>
      <View style={styles.boxHeader}>
        <Avatar 
          rounded
          size="large"
          containerStyle={{ borderColor: "black", borderWidth: 1 }}
          source={
            state?.photo
              ? state.photo[0] === "h"
                ? { uri: `${state.photo}` }
                : { uri: `data:image/jpeg;base64,${state?.photo}` }
              : require("../../images/logo.png")
          }
          overlayContainerStyle={{ backgroundColor: "orange" }}
          onPress={() => alert("ir a editar perfil")}
        />
        <View>
          <Text
            style={[styles.textHeader, !theme ? tema.darkText : tema.lightText]}
          >
            {state?.name ? state?.name + " " + state?.lastname : state?.email}
          </Text>
          <Text
            style={[styles.textHeader, !theme ? tema.darkText : tema.lightText]}
          >
            {state?.zona}{" "}
          </Text>
          <View style={styles.luna}>
            <Switch
              changeValueImmediately={true}
              circleBorderWidth={0}
              activeText={"🌞"}
              backgroundActive={"rgba(0,0,0,0.3)"}
              inActiveText={"🌜"}
              value={enabled}
              onValueChange={toggleSwitch}
              circleSize={28}
              barHeight={32}
              switchLeftPx={6}
              switchRightPx={6}
              circleActiveColor={"#fdd400"}
              circleInActiveColor={"#fff3e6"}
            />
          </View>
        </View>
      </View>
      <Divider />

      <TouchableOpacity
        style={[styles.box, !theme && tema.darkContainer]}
        onPress={() => state?.service ? navigation.push("ServiceForm", {service: state?.serviceType}) : navigation.push("WalkerForm")}
      >
        <Icon raised name="user-cog" type="font-awesome-5" size={20} />
        <Text style={[styles.text, !theme && tema.darkText]}>Edit Account</Text>
      </TouchableOpacity>

      <Divider />
      <TouchableOpacity
        style={[styles.box, !theme && tema.darkContainer]}
        onPress={() => Linking.openURL("mailto:petBuddies@support.com")}
      >
        <Icon raised name="envelope" type="font-awesome" size={20} />
        <Text style={[styles.text, !theme && tema.darkText]}>Support</Text>
      </TouchableOpacity>

      <Divider />
      <TouchableOpacity
        style={[styles.box, !theme && tema.darkContainer]}
        onPress={onShare}
      >
        <Icon raised name="user-plus" type="font-awesome" size={20} />
        <Text style={[styles.text, !theme && tema.darkText]}>
          Invite a friend
        </Text>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity
        style={[styles.box, !theme && tema.darkContainer]}
        onPress={() => logout()}
      >
        <Icon raised name="sign-out" type="font-awesome" size={20} />
        <Text style={[styles.text, !theme && tema.darkText]}>Logout</Text>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  boxHeader: {
    flexDirection: "row",
    position: "relative",
    padding: 35,
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 320,
    width: "100%",
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    color: "#000",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 20,
  },

  luna: {
    position: "absolute",
    right: -95,
    top: -27,
  },
});
export default UserPannel;
