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
  phone?: string;
  workDays?: string;
  fee?: number;
  description?: string;
  address: string;
  provincia: string;
  workHours?: string;
  pais: string;
  zone: string;
  role?: string;
  logo?: string;
  checkIn?: string;
  checkOut?: string;
  adsPics: string[];
  foodInclude?: boolean;
  requirement?: string;
  allowedPets?: string[];
  email?: string;
  pics?: string[];
  longitude?: number;
  latitude?: number;
  serviceType?: string;
  extras: string[];
}

const ServiceForm = ({ navigation, route }: RouteStackParamList<"ServiceForm">) => {
  const user = useSelector((state: any /* : RootState */) => state.user.owner);
  const [data, setData] = useState<any>({});
  const [id, setId] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [pics, setPics] = useState<string[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [service, setService] = useState<string>("hotels");
  const [servicio, setServicio] = useState<State>()
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

  useEffect(() => {
    setData(user)
    if (route.params.service) {
      axios.get(`/${route.params.service}/${user?.service}`)
        .then(result => {
          setServicio(result.data)
          setPics(oldpics => result.data.adsPics)
        })
    }
  }, [user])

  const handleSubmit = async () => {
    const results: any = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address},${data.zone},${data.provincia},${data.pais},+CA&key=AIzaSyCe-UKS_dF_ixRKNh28jFypTZXcpMyVeFQ`)
    const { lng, lat } = results.data.results[0].geometry.location
    if (user.service) {
      axios.put(`/${route.params.service}/${user.service}`, { ...data, adsPics: pics, logo: image, latitude: lat, longitude: lng });
      await axios.put(`/walkers/${id}`, { photo: image });
    } else {
      const response = await axios.post(`/${service}`, { ...data, adsPics: pics, logo: image, latitude: lat, longitude: lng });
      await axios.put(`/walkers/${id}`, { photo: image, service: response.data._id, serviceType: service });
    }
    setData({})
    setPics([])
    dispatch(getOwner(id));
    dispatch(getWalkers());
    navigation.push("Tab");
  };
  const handleUpload = async (image:any, type: string, index: number) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'PetBuddies')
    data.append('cloud_name', 'dsw2d7pli')
    if (type === "profile") {
      const result = await axios.post('https://api.cloudinary.com/v1_1/dsw2d7pli/image/upload', data)
      setImage(result.data.url);
    } else {
      const result = await axios.post('https://api.cloudinary.com/v1_1/dsw2d7pli/image/upload', data)
      if (route.params.service) {
        if (!pics[index]) {
          setPics(oldpics => [...oldpics, result.data.url])
        } else {
          setPics(oldpics => {
            return oldpics?.map((item, i) => {
              if (index === i) {
                return result.data.url
              } else {
                return item
              }
            })
          });
        }
      } else {
        setPics(oldpics => [...oldpics, result.data.url]);
      }
    }
  }

  const pickImage = async (type: string, index: number) => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      let newFile = { uri: result.uri, type: `test/${result.uri.split('.')[1]}`, name: `test.${result.uri.split('.')[1]}` }
      handleUpload(newFile, type, index)
    };
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <View style={styles.formImage}>
          <Text style={styles.labelImage}>Change profile pic</Text>
          <View>
            <Avatar
              rounded
              size="large"
              source={
                image !== undefined
                  ? { uri: image }
                  : user?.photo
                    ? { uri: `data:image/jpeg;base64,${user.photo}` }
                    : require("../../images/logo.png")
              }
              overlayContainerStyle={{ backgroundColor: "white" }}
              onPress={() => pickImage("profile", 0)}
            />
          </View>
        </View>
        {!route.params.service ? (<View
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
        </View>) : null}
        <Text style={styles.label}>Name</Text>
        <TextInput
          defaultValue={servicio?.name || ""}
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
            defaultValue={servicio?.description || ""}
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
          defaultValue={servicio && String(servicio?.phone) || ""}
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
          defaultValue={servicio?.pais || ""}
          onChangeText={(value) => handleChange("pais", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Province/state</Text>
        <TextInput
          defaultValue={servicio?.provincia || ""}
          onChangeText={(value) => handleChange("provincia", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>City</Text>
        <TextInput
          defaultValue={servicio?.zone || ""}
          onChangeText={(value) => handleChange("zone", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Address</Text>
        <TextInput
          defaultValue={servicio?.address || ""}
          onChangeText={(value) => handleChange("address", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Fee</Text>
        <TextInput
          defaultValue={servicio?.fee ? String(servicio?.fee) : ""}
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
          defaultValue={servicio?.workHours || ""}
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
          defaultValue={servicio?.workDays || ""}
          style={styles.input}
          onChangeText={(value) => handleChange("workDays", value)}
          maxLength={50}
          autoCapitalize="none"
          placeholder="E.g. : Monday to Friday"
        />
      </View>
      { (pics?.length === 0 && service === 'hotels') || route.params.service === "hotels" ?
        <View>
          <Text style={styles.label}>Allowed Pets</Text>
          <TextInput
            defaultValue={servicio && String(servicio?.allowedPets) || ""} //ARRAY
            style={styles.input}
            onChangeText={(value) => {
              let result = value.toLowerCase().trim().split(", ");
              return setData({ ...data, allowedPets: result });
            }}
            maxLength={50}
            autoCapitalize="none"
            placeholder="E.g. : Dogs, cats"
          />
        </View>
        : null
      }

      { (pics?.length === 0 && service === 'hotels') || route.params.service === "hotels" ?
        <View>
          <Text style={styles.label}>Requirements</Text>
          <TextInput
            defaultValue={servicio?.requirement || ""}
            style={styles.input}
            onChangeText={(value) => handleChange("requirement", value)}
            maxLength={50}
            autoCapitalize="none"
            placeholder="E.g. : Vaccines..."
          />
        </View>
        : null
      }

      { (pics?.length === 0 && service === 'hotels') || route.params.service === "hotels" ?
        <View>
          <Text style={styles.label}>Extras</Text>
          <TextInput
            defaultValue={servicio && String(servicio?.extras) || ""} //ARRAY
            style={styles.input}
            onChangeText={(value) => {
              let result = value.toLowerCase().trim().split(", ");
              return setData({ ...data, extras: result });
            }}
            maxLength={50}
            autoCapitalize="none"
            placeholder="E.g. : Spa, training..."
          />
        </View>
        : null
      }
      <Text style={styles.label}>Business photos</Text>
      <View
        style={{
          flex: 1,
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => pickImage("pic", 0)}>
          <Image
            style={{ width: 90, height: 90, borderRadius: 4 }}
            source={
              pics && pics[0]
                ? { uri: pics[0] } : (servicio?.adsPics[0] ? { uri: servicio?.adsPics[0] } : require("../../images/placeholder.jpg"))
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage("pic", 1)}>
          <Image
            style={{ width: 90, height: 90, borderRadius: 4 }}
            source={
              pics && pics[1]
                ? { uri: pics[1] } : (servicio?.adsPics[1] ? { uri: servicio?.adsPics[1] } : require("../../images/placeholder.jpg"))
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage("pic", 2)}>
          <Image
            style={{ width: 90, height: 90, borderRadius: 4 }}
            source={
              pics && pics[2]
                ? { uri: pics[2] } : (servicio?.adsPics[2] ? { uri: servicio?.adsPics[2] } : require("../../images/placeholder.jpg"))
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

export default ServiceForm;

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
    // textShadowColor: "#fff",
    // textShadowOffset: {
    //   width: 0.4,
    //   height: -1,
    // },
    // textShadowRadius: 1,
    fontWeight: 'bold' //agregado
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
    fontWeight: 'bold' //agregado
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
    width: 170,//agregado
    textAlign: 'center',//agregado
    fontWeight: 'bold'//agregado
    // textShadowColor: "#fff",
    // textShadowOffset: {
    //   width: 0.4,
    //   height: -1,
    // },
    // textShadowRadius: 1,
  },
  formImage: {
    borderColor: "#fff",
    alignItems: "center",
    marginBottom: 10,
  },
});
