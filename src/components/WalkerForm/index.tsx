import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Platform  } from "react-native";
import { Avatar  } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../AsyncStorage";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { getOwner } from "../../redux/owner/actions";
import { getWalkers } from "../../redux/walker/actions";
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
interface State {
  name?: string;
  lastname?: string;
  description?: string;
  cellphone?: number;
  dni?: number;
  fee?: number;
  workZone?: string[];
  workHours?: string;
  zona?: string;
  role?: string;
  photo?:string;
}

const WalkerForm = ({ navigation }: RouteStackParamList<"WalkerForm">) => {
  const [data, setData] = useState<State>();
  const [id, setId] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const storage = firebase.storage() 

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const dispatch = useDispatch();
  const user = useSelector((state:any /* : RootState */ ) => state.user.owner);

  const dataStore = async () => {
    const idData = await getData();
    setId(idData);
    dispatch(getOwner(idData));
  };

  useEffect(() => {
    dataStore();
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  
  const handleSubmit = async () => {
      if(image){
        await uploadImage(image, `profile-${id}`);
      }
      axios.put(`/walkers/${id}`, data);
      navigation.navigate("Tab");
      dispatch(getOwner(id));
      dispatch(getWalkers());
  };

  const pickImage = async (type: string) => {
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if( type === 'profile'){
        setImage(result.uri);
      }   
    };
  }

  const uploadImage = async (uri:any, imageName:any) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = await storage.ref().child('images/' + imageName);
      // const url =  storage.refFromURL(`gs://${ref.bucket}/images/${imageName}`)
      await ref.put(blob);
        ref.getDownloadURL()
        .then(function onSuccess(urlImg) {
          axios.put(`/walkers/${id}`, {photo: urlImg});
        })
        .catch(function onError(err) {
          console.log("Error occured..." + err);
        })
    }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
      <View style={styles.formImage}>
        <Text style={styles.labelImage}>Upload / change profile pic</Text>
        <View>
        <Avatar
          rounded
          size="large"
          source={(image !== null ? {uri: image} : ( user?.photo ? {uri: user?.photo} : require("../../images/logo.png"))) }
          overlayContainerStyle={{ backgroundColor: "white" }}
          onPress={() => pickImage('profile')}
          />
          </View>
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
        <Text style={styles.label}>Lastname</Text>
        <TextInput
          defaultValue={user?.lastname || ""}
          onChangeText={(value) => handleChange("lastname", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      {user?.role === "Owner" ? null : 
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
      }
      {user?.role === "Owner" ? null :
      <View>
        <Text style={styles.label}>Cellphone</Text>
        <TextInput
          defaultValue={String(user?.cellphone) || undefined ? "" : ""}
          onChangeText={(value) => handleChange("cellphone", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="phone-pad"
          />
      </View>
      }
      {user?.role === "Owner" ? null :
      <View>
        <Text style={styles.label}>DNI</Text>
        <TextInput
          defaultValue={String(user?.dni) || undefined ? "" : ""}
          onChangeText={(value) => handleChange("dni", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="number-pad"
          />
      </View>
      }
      <View>
        <Text style={styles.label}>City</Text>
        <TextInput
          defaultValue={user?.zona || ""}
          onChangeText={(value) => handleChange("zona", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      {user?.role === "Owner" ? null :
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
      }
      {user?.role === "Owner" ? null :
      <View>
        <Text style={styles.label}>Work Zone</Text>
        <TextInput
          defaultValue={String(user?.workZone) || undefined ? "" : ""}
          onChangeText={(value) => {
            let result = value.toLowerCase().trim().split(", ");
            return setData({ ...data, workZone: result });
          }}
          style={styles.input}
          placeholder="E.g Caballito, Palermo"
          maxLength={50}
          autoCapitalize="none"
          />
      </View>
      }
      {user?.role === "Owner" ? null :
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
      }
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
    alignItems: 'center',
    marginBottom: 10,
  },
});
