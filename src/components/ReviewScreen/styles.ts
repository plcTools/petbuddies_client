import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerAll: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  headers: {
    padding: 20,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  body: {
    width: "100%",
  },
  review: {
    padding: 10,
  },
  title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5
  },
  ratingView: {
      padding: 25,
      paddingBottom: 0
  },
  divider: {
      backgroundColor: '#e7e7e7',
      width: '90%',
      borderRadius: 50,
      marginTop: 10
  },
  secondLine: {
    fontSize: 13,
    color: '#a3a3a3',
    marginBottom: 5
  },
  imageView: {
      flexDirection: 'row',
      alignItems: 'center',
  }
});

export default styles;
