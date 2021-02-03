import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../AsyncStorage";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { getOwner } from "../../redux/owner/actions";
import { getWalkers } from "../../redux/walker/actions";
import { RootState } from "../../redux/store";

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
}

const WalkerForm = ({ navigation }: RouteStackParamList<"WalkerForm">) => {
  const [data, setData] = useState<State>();
  const [id, setId] = useState<string>("");

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
  }, []);

  const handleSubmit = () => {
    axios.put(`/walkers/${id}`, data);
    navigation.navigate("Tab");
    dispatch(getOwner(id));
    return dispatch(getWalkers());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
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
});
