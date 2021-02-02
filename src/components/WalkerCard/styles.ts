import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    shadowColor: "#000",
    opacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    overflow: "hidden",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderRadius: 8,
    height: "auto",
    position: "relative",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: 'capitalize'
  },
  fav: {
    position: "absolute",
    right: -30,
    top: -30,
  },
  cardHeaderRate: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    right: -4,
    bottom: -4,
  },
  cardContainer: {
    width: "100%",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
  },
  price: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  workZone: {
    width: "80%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  icon: {
    flex: 0,
    flexBasis: 4,
  },
  text: {
    width: 85
  },
  infoContainer: {
    maxWidth: "84%",
    marginTop: 4,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 30,
  },
  btnText: {
    fontSize: 12,
  },
  pricing: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008891",
  },
});
