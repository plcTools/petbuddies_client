import React, { useState } from "react";
import { styles } from "../../WalkerCard/styles";
import { hotel } from "../../../NavigationConfig/types";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, Image, Icon, CheckBox, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_900Black_Italic,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_300Light_Italic,
  NunitoSans_300Light,
} from "@expo-google-fonts/nunito-sans";

import { useAppDispatch, RootState } from "../../../redux/store";
import { getOwnerFavHotels } from "../../../redux/owner/actions";
import { getData } from "../../../AsyncStorage/index";

interface Props {
  hotel: hotel;
  userFavHotels: hotel[];
}
const HotelCard: React.FC<Props> = ({ hotel, userFavHotels }): JSX.Element => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [id, setId] = React.useState<string>("");

  const retrieveStorage = async () => {
    const user: string = await getData();
    setId(user);
  };

  React.useEffect(() => {
    retrieveStorage();
    userFavHotels?.map((u) => {
      if (u._id === hotel._id) {
        setChecked(true);
      }
    });
  }, [userFavHotels]);

  const navigation = useNavigation();
  let [fonts] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_900Black_Italic,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_300Light_Italic,
    NunitoSans_300Light,
  });

  /* Para Mostrar las reviews, Get a reviews
    y posteriormente se pasan por props a los childs */

  const [reviews, setReviews] = useState({});
  React.useEffect(() => {
    axios
      .get(`/reviews/Hotel/${hotel._id}`)
      .then((reviewsData) => {
        const sum = reviewsData.data
          .map((e: any) => e.rating)
          .reduce((a: any, c: any) => a + c, 0);
        const prom = Number (String (sum / reviewsData.data.length).slice (0,3));
        setReviews({ review: reviewsData.data, prom })
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <Card containerStyle={styles.container}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate("HotelProfile", { id: hotel._id, reviews })
        }
      >
        <View style={styles.cardHeader}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 4,
              marginRight: 10,
              marginTop: 3,
              marginBottom: 7,
            }}
            source={{
              uri: `${hotel.logo}`,
            }}
          />

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{`${hotel.name}`}</Text>

            <Text style={styles.text}>
              <Text style={styles.pricing}>${hotel.fee}</Text>
              <Text style={{ fontFamily: "NunitoSans_400Regular" }}>
                /night
              </Text>
            </Text>
          </View>
        </View>

        <View>
          <Card.Divider />
          <Text style={{ fontFamily: "NunitoSans_600SemiBold", fontSize: 20 }}>
            {hotel.description}
          </Text>
          <View style={styles.workZone}>
            <Icon
              style={styles.icon}
              name="map-marker-alt"
              type="font-awesome-5"
              size={20}
              color="#fc5185"
            />

            <Text
              style={{
                textTransform: "capitalize",
                marginLeft: 6,
                fontFamily: "NunitoSans_600SemiBold",
              }}
            >
              {hotel.zone}
            </Text>
          </View>

          <View style={styles.cardHeaderRate}>
            <Text style={{ marginRight: 5, fontSize: 15 }}>
              {reviews.prom > 0 && reviews.prom}
            </Text>
            <Icon
              name={(reviews.prom && "star") || "star-o"}
              type="font-awesome"
              size={18}
              color="green"
              underlayColor="red"
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.fav}>
        <CheckBox
          uncheckedIcon={
            <Icon
              raised
              name="heart-o"
              type="font-awesome"
              size={15}
              color="black"
            />
          }
          checkedIcon={
            <Icon
              raised
              name="heart"
              type="font-awesome"
              size={15}
              color={"red"}
            />
          }
          checked={checked}
          onPress={async () => {
            if (!checked) {
              const result = await axios.patch(
                `/owners/${id}/favoritesHotels`,
                { hotelId: hotel._id }
              );
              dispatch(getOwnerFavHotels(id));
              return setChecked(true);
            } else {
              const result = await axios.delete(
                `/owners/${id}/favoritesHotels/` + hotel._id
              );
              dispatch(getOwnerFavHotels(id));
              return setChecked(false);
            }
          }}
        />
      </View>
    </Card>
  );
};

export default HotelCard;
