import { StyleSheet } from "react-native";
import { StatusBar, Dimensions } from "react-native";
import { withTheme } from "react-native-elements";

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export const styles = StyleSheet.create({
  containerAll: {
      margin: 10,
      alignItems: "center",
      height: dimensions.height - 20,
      width: dimensions.width - 20,
      backgroundColor: "rgba(150, 150, 129, 0.98)",
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
      height: 'auto',
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
      color: 'whitesmoke',
  },
  closeButton: {
      backgroundColor: "rgba(255,115,160, 0.99)",
      justifyContent: "center",
      borderRadius: 100,
      height: 35,
      width: 35,
      elevation: 1,
  },
  button: {
      backgroundColor: "rgba(180,170,150, 0.9)",
      justifyContent: "center",
      borderRadius: 5,
      height: 40,
      width: 90,
      elevation: 1,
  },
  textButton: {
      textAlign: "center",
      color: "white",
      fontSize: 15,
  },
  bodyContainer: {
      marginTop: 1,
      height: "60%",
      width: "100%",
  },

  dataContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      padding: 50
  },
  dataLeft: {
      justifyContent: 'center',
      alignItems: "center",
      height: 100,
      color: 'white'
  },

  dataright: {
      justifyContent: 'center',
      alignItems: "center",
      height: 100,
  },

  textData: {
      fontSize: 12,
      padding: 0,
      color: 'white'
  },

  mapContainer: {
      alignItems: "center",
      padding: 1,
      marginTop: 15,
  },

  map: {
      width: "100%",
      height: "90%"
  },

  alignC: {
      textAlign: "center",
  },

  footerContainer: {
      marginTop:100,
      padding: 1,
  },
});
