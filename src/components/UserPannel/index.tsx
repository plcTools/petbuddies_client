import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Linking, Share } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { getData } from "../../AsyncStorage/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getWalkers } from "../../redux/walker/actions";

const UserPannel = ({ navigation }: RouteStackParamList<"UserPannel">) => {
  const [state, setState] = React.useState<any>();

  const retrieveStorage = async () => {
    const id = await getData();
    axios.get(`/walkers/${id}`).then((result) => setState(result.data));
    dispatch(getWalkers());
  };
  const owners = useSelector((state) => state.user.owner);
  const dispatch = useDispatch();

  useEffect(() => {
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
    <View>
      <ListItem bottomDivider style={{ paddingTop: 40 }}>
        <Avatar /* onPress debería poder modificar la foto de perfil*/
          rounded
          size="large"
          source={{ uri: `${state?.photo}` }}
          overlayContainerStyle={{ backgroundColor: "orange" }}
          onPress={() => alert("ir a editar perfil")}
        />
        <ListItem.Content>
          <ListItem.Title>
            {state?.name} {state?.lastname}
          </ListItem.Title>
          <ListItem.Subtitle>{state?.zona} </ListItem.Subtitle>
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
  cardHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHeaderMain: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  cardHeaderRate: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rateStar: {
    marginRight: 10,
  },
  cardContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    width: 200,
    marginLeft: 20,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 30,
  },
  btnText: {
    fontSize: 12,
  },
});
export default UserPannel;
