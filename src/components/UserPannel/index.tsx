import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Linking, Share } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { getData } from "../../AsyncStorage/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getWalkers } from "../../redux/walker/actions";
import { Switch } from "react-native-switch";
import { changeTheme } from "../../redux/owner/actions";

const UserPannel = ({ navigation }: RouteStackParamList<"UserPannel">) => {
  const theme = useSelector((state) => state.user.theme);
  const [state, setState] = React.useState<any>();
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const owners = useSelector((state) => state.user.owner);
  const dispatch = useDispatch();

  const toggleSwitch = async () => {
    dispatch(changeTheme());
    // setEnabled((enabled) => !enabled);
  };

  const retrieveStorage = async () => {
    const id = await getData();
    axios.get(`/walkers/${id}`).then((result) => setState(result.data));
    dispatch(getWalkers());
  };
  useEffect(() => {
    setEnabled(theme);
  }, [theme]);

  useEffect(() => {
    // LogBox.ignoreAllLogs(true);
    retrieveStorage();
  }, [owners]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@id");
      navigation.navigate("LoginScreen");
    } catch (e) {
      console.log(e);
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
          // shared with activity type of result.activityType
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
    <View
      style={{
        position: "relative",
        backgroundColor: theme ? "black" : "yellow",
      }}
    >
      <ListItem bottomDivider>
        <Avatar /* onPress debería poder modificar la foto de perfil*/
          rounded
          size="large"
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
        <ListItem.Content>
          <ListItem.Title>
            {state?.name ? state?.name + " " + state?.lastname : state?.email}
          </ListItem.Title>
          <ListItem.Subtitle>{state?.zona} </ListItem.Subtitle>
          <View style={styles.luna}>
            {/* <Text style={styles.sol}>🌞</Text>
            <Text style={styles.luni}>🌜</Text> */}
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
              circleInActiveColor={"#ccc"}
            />
          </View>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider onPress={() => navigation.navigate("WalkerForm")}>
        <Icon raised name="user-cog" type="font-awesome-5" size={20} />
        <ListItem.Content>
          <ListItem.Title>Edit Account</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      {/* <ListItem bottomDivider>
        <Icon raised name="blind" type="font-awesome" size={10} />
        <ListItem.Content>
          <ListItem.Title>Walks</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem> */}

      <ListItem
        bottomDivider
        onPress={() => Linking.openURL("mailto:petBuddies@support.com")}
      >
        <Icon raised name="envelope" type="font-awesome" size={20} />
        <ListItem.Content>
          <ListItem.Title>Support</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={onShare}>
        <Icon raised name="user-plus" type="font-awesome" size={20} />
        <ListItem.Content>
          <ListItem.Title>Invite a friend</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon raised name="cog" type="font-awesome" size={20} />
        <ListItem.Content>
          <ListItem.Title>Settings</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon raised name="sign-out" type="font-awesome" size={20} />
        <ListItem.Content>
          <ListItem.Title onPress={() => logout()}>Logout</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  textDark: {
    backgroundColor: "black",
    color: "white",
  },
  textLight: {
    color: "black",
    backgroundColor: "white",
  },
  luna: {
    position: "absolute",
    right: 9,
    top: -5,
  },
  darkContainer: {
    position: "relative",
  },
  sol: {
    position: "absolute",
  },
  luni: {
    position: "absolute",
  },
});
export default UserPannel;
