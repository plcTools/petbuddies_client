import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    flex: 1,
  },
  container: {
    /*  alignItems: "center",
      flex: 1, */
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 15,
    borderRadius: 15,
    width: "90%",
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 30,
  },
  indicatorTab: {
    backgroundColor: "transparent",
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    padding: 5,
    borderRadius: 15,
  },
  messageRow: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 15,
    backgroundColor: "#456672",
    borderRadius: 10,
    padding: 8,
  },
  tabBar: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    borderRadius: 5,
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-around",
    paddingBottom: 2,
  },
  tabLabelNumber: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  tabLabelText: {
    color: "#fff",
    fontSize: 22.5,
    fontWeight: "600",
    textAlign: "center",
    width: 100, //Agregado
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  descriptionRow: {
    width: "80%",
    marginBottom: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userBioText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  userDescriptionText: {
    color: "#000",
    fontSize: 15,
    marginLeft: 25,
    textTransform: "capitalize",
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
  messageText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 5,
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  userRow: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});
