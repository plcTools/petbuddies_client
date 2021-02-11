import { StyleSheet } from "react-native";
import { StatusBar, Dimensions } from "react-native";
import { withTheme } from "react-native-elements";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const styles = StyleSheet.create({
  containerAll: {
    marginVertical: "50%",
    marginHorizontal: 19,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    maxHeight: "100%",
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  headersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },

  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -15,
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 15,
  },
  closeButton: {
    justifyContent: "center",
    width: 15,
    height: 15,
    position: "absolute",
    right: 2,
    top: 2,
  },
  button: {
    backgroundColor: "#c75643",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
    width: 200,
    elevation: 1,
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
  },
  bodyContainer: {
    marginTop: 1,
    width: "100%",
  },
  socialRow: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    padding: 5,
    borderRadius: 15,
  },
  ratingText: {
    color: "white",
    fontSize: 13.5,
    textAlign: "center",
    marginLeft: 14,
    margin: 10,
    backgroundColor: "gray",
    padding: 3,
    borderRadius: 5,
  },

  dataContainer: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  dataLeft: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginBottom: 10,

  },

  dataright: {
    justifyContent: "center",
    alignItems: "center",
  },

  textData: {
    fontSize: 16,
    padding: 0,
    color: "rgba(0,0,0,0.7)",
  },

  mapContainer: {
    alignItems: "center",
    padding: 1,
    marginTop: 15,
  },

  map: {
    width: "100%",
    height: "90%",
  },

  alignC: {
    textAlign: "center",
  },

  footerContainer: {
    padding: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
