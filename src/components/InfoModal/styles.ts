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
      height: dimensions.height - 100,
      width: dimensions.width - 20,
      backgroundColor: "#fff",
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
      height: 50,
  },
  textTitle: {
      fontSize: 25,
      fontWeight: "bold",
      color: '#000',
      marginLeft: 15
  },
  closeButton: {
      backgroundColor: "#c98c70",
      justifyContent: "center",
      borderRadius: 70,
      height: 40,
      width: 40,
      elevation: 1,
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
      color: '#000'
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
    marginTop: 120,
    padding: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5
  }
});




















