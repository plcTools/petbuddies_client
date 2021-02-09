import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  Image,
} from "react-native";
import { Avatar, CheckBox } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../AsyncStorage";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { getOwner } from "../../redux/owner/actions";
import { getWalkers } from "../../redux/walker/actions";
import * as ImagePicker from "expo-image-picker";
interface State {
  name?: string;
  lastname?: string;
  phone?: number;
  workDays?: string;
  fee?: number;
  description?: string;
  address?: string;
  provincia?: string;
  workHours?: string;
  pais?: string;
  zone?: string;
  role?: string;
  logo?: string;
  checkIn?: string;
  checkOut?: string;
  adsPics?: string[];
  foodInclude?: boolean;
  requirement?: string;
  allowedPets?: string[];
  email?: string;
  pics?: string[];
  longitude: number;
  latitude: number;
}

const WalkerForm = ({ navigation }: RouteStackParamList<"WalkerForm">) => {
  const user = useSelector((state: any /* : RootState */) => state.user.owner);
  const [data, setData] = useState<State>({});
  const [id, setId] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [pics, setPics] = useState<string[] | undefined>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [service, setService] = useState<string>("hotels");
  const dispatch = useDispatch();

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const dataStore = async () => {
    const idData = await getData();
    setId(idData);
    dispatch(getOwner(idData));
  };

  useEffect(() => {
    dataStore();
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleSubmit = async () => {
    const results:any = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address},${data.zone},${data.provincia},${data.pais},+CA&key=AIzaSyCe-UKS_dF_ixRKNh28jFypTZXcpMyVeFQ`)
    const {data: google} = results;
    const {lng, lat} = google.results[0].geometry.location
    console.log(lng, lat)
    setData({ ...data, email: user.email, adsPics: pics, logo: image, latitude: lat, longitude: lng});
    await axios.post(`/${service}`, data);
    await axios.put(`/walkers/${id}`, {photo: image});
    navigation.navigate("Tab");
    dispatch(getOwner(id));
    dispatch(getWalkers());
  };

  const pickImage = async (type: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      if (type === "profile") {
        setImage(result.base64);
      } else {
        setPics([...pics, result.base64]);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <View style={styles.formImage}>
          <Text style={styles.labelImage}>SERVICE / change profile pic</Text>
          <View>
            <Avatar
              rounded
              size="large"
              source={
                image !== undefined
                  ? { uri: `data:image/jpeg;base64,${image}` }
                  : user?.photo
                  ? { uri: user?.photo }
                  : require("../../images/logo.png")
              }
              overlayContainerStyle={{ backgroundColor: "white" }}
              onPress={() => pickImage("profile")}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CheckBox
            center
            title="Hotel"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={!check}
            onPress={() => {
              setCheck(!check);
              setService("hotels");
            }}
          />
          <CheckBox
            center
            title="Peluqueria"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={check}
            onPress={() => {
              setCheck(!check);
              setService("groomer");
            }}
          />
        </View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          defaultValue={user?.name || ""}
          onChangeText={(value) => handleChange("name", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <View style={styles.textArea}>
          <TextInput
            defaultValue={user?.description || ""}
            onChangeText={(value) => handleChange("description", value)}
            style={styles.input}
            maxLength={50}
            autoCapitalize="none"
          />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Cellphone</Text>
        <TextInput
          defaultValue={String(user?.phone) || undefined ? "" : ""}
          onChangeText={(value) => handleChange("phone", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="phone-pad"
        />
      </View>
      <View>
        <Text style={styles.label}>Country</Text>
        <TextInput
          defaultValue={user?.pais || ""}
          onChangeText={(value) => handleChange("pais", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Province/state</Text>
        <TextInput
          defaultValue={String(user?.provincia) || undefined ? "" : ""}
          onChangeText={(value) => handleChange("provincia", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>City</Text>
        <TextInput
          defaultValue={user?.zone || ""}
          onChangeText={(value) => handleChange("zone", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Address</Text>
        <TextInput
          defaultValue={user?.address || ""}
          onChangeText={(value) => handleChange("address", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Fee</Text>
        <TextInput
          defaultValue={String(user?.fee) || undefined ? "" : ""}
          onChangeText={(value) => handleChange("fee", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text style={styles.label}>Work hours</Text>
        <TextInput
          defaultValue={String(user?.workHours) || undefined ? "" : ""}
          style={styles.input}
          onChangeText={(value) => handleChange("workHours", value)}
          maxLength={50}
          autoCapitalize="none"
          placeholder="E.g. : 14 to 18hs"
        />
      </View>
      <View>
        <Text style={styles.label}>Work Days</Text>
        <TextInput
          defaultValue={String(user?.workDays) || undefined ? "" : ""}
          style={styles.input}
          onChangeText={(value) => handleChange("workDays", value)}
          maxLength={50}
          autoCapitalize="none"
          placeholder="E.g. : Monday to Friday"
        />
      </View>
      <Text style={styles.label}>Business photos</Text>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => pickImage("pic")}>
          <Image
            style={{ width: 90, height: 90 }}
            source={
              pics && pics[0]
                ? { uri: `data:image/jpeg;base64,${pics[0]}` }
                : require("../../images/placeholder.jpg")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage("pic")}>
          <Image
            style={{ width: 90, height: 90 }}
            source={
              pics && pics[1]
                ? { uri: `data:image/jpeg;base64,${pics[1]}` }
                : require("../../images/placeholder.jpg")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage("pic")}>
          <Image
            style={{ width: 90, height: 90 }}
            source={
              pics && pics[2]
                ? { uri: `data:image/jpeg;base64,${pics[2]}` }
                : require("../../images/placeholder.jpg")
            }
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WalkerForm;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: "#456672",
  },
  formGroup: {
    borderColor: "#fff",
  },
  label: {
    color: "#c98c70",
    fontSize: 19,
    textShadowColor: "#fff",
    textShadowOffset: {
      width: 0.4,
      height: -1,
    },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: "#c98c70",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 70,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  textArea: {},
  description: {
    height: 80,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 4,
    borderBottomColor: "#456672",
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 4,
    marginTop: 4,
    backgroundColor: "#fff",
    textTransform: "capitalize",
  },
  input: {
    borderRadius: 4,
    height: 30,
    borderBottomColor: "#456672",
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 4,
    marginTop: 4,
    backgroundColor: "#fff",
    textTransform: "capitalize",
  },
  labelImage: {
    marginBottom: 10,
    color: "#c98c70",
    fontSize: 19,
    textShadowColor: "#fff",
    textShadowOffset: {
      width: 0.4,
      height: -1,
    },
    textShadowRadius: 1,
  },
  formImage: {
    borderColor: "#fff",
    alignItems: "center",
    marginBottom: 10,
  },
});
