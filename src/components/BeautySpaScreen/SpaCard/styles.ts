import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 15,
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
  cardContainer: {
    width: "100%",
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  text: {
    width: 85,
  },
  icon: {
    flex: 0,
    flexBasis: 4,
  },
  cardHeaderRate: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    right: -4,
    bottom: -4,
  },
  workZone: {
    width: "80%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  fav: {
    position: "absolute",
    right: -20,
    top: -20,
  },
});
