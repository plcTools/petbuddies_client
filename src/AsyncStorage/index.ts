import AsyncStorage from "@react-native-async-storage/async-storage";

//Esta funcion guarda en el local storage trucho
export const storeData = async (value: string) => {
  try {
    const jsonParser = JSON.stringify(value);
    await AsyncStorage.setItem("@id", jsonParser);
  } catch (error) {
    // saving error
    console.log(error);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@id");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
