import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getData } from "../../AsyncStorage";
import { RouteStackParamList } from "../../NavigationConfig/types";

interface State {
  name?: string;
  lastname?: string;
  description?: string;
  cellphone?: number;
  dni?: number;
  fee?: number;
  workZone?: string[];
  workHours?: string;
}

const WalkerForm = ({ navigation }: RouteStackParamList<"WalkerForm">) => {
  const [data, setData] = useState<State>();
  const [id, setId] = useState<string>("");
  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const dataStore = async () => {
    const idData = await getData();
    setId(idData);
  };

  useEffect(() => {
    dataStore();
    return () => {
      dataStore();
    };
  }, []);

  const handleSubmit = () => {
    axios.put(`/walkers/${id}`, data);
    navigation.navigate("Tab");
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>Name</Text>
        <TextInput
          onChangeText={(value) => handleChange("name", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text>Lastname</Text>
        <TextInput
          onChangeText={(value) => handleChange("lastname", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text>Description</Text>
        <TextInput
          onChangeText={(value) => handleChange("description", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text>Cellphone</Text>
        <TextInput
          onChangeText={(value) => handleChange("cellphone", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="phone-pad"
        />
      </View>

      <View>
        <Text>DNI</Text>
        <TextInput
          onChangeText={(value) => handleChange("dni", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
      </View>

      <View>
        <Text>Fee</Text>
        <TextInput
          onChangeText={(value) => handleChange("fee", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text>Work Zone</Text>
        <TextInput
          onChangeText={(value) => handleChange("workZone", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text>Work hours</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange("workHours", value)}
          maxLength={50}
          autoCapitalize="none"
          placeholder="E.g. : 14 to 18hs"
        />
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
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#c98c70",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    height: 20,
    borderBottomColor: "#456672",
    borderBottomWidth: 2,
    marginBottom: 10,
  },
});
