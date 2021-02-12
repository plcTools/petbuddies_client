import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    height: dimensions.height - 45,
    width: dimensions.width - 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  upView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  publishBtn: {
    color: "#c98c70",
    fontSize: 15,
  },
  userView: {
    width: '100%',
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10
  },
  name: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  textInput: {
    width: "100%",
    fontSize: 20,
    marginTop: 25
  },
  ratingView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center'
  }
});

export default styles;
