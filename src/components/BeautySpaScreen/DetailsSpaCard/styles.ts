import { StyleSheet } from "react-native";
import { StatusBar, Dimensions } from "react-native";

// width: Dimensions.get('window').width,
// height: Dimensions.get('window').height,
export const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    height: "100%",
    backgroundColor: "rgba(110, 129, 129, 0.98)",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    maxHeight: 150,
    marginBottom: 15,
    width: "100%",
    height: 100,
  },

  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "rgba(110,110,150, 0.8)",
    justifyContent: "center",
    borderRadius: 20,
    height: 40,
    width: 90,
    elevation: 5,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  bodyContainer: {
    marginTop: 1,
    height: "60%",
    width: "100%",
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 20,
  },

  alignC: {
    textAlign: "center",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 50,
  },
});
