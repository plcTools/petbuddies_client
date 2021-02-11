import React from "react";
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
import { useSelector } from "react-redux";
import { tema } from "../../../Theme/theme";

interface Props {
  hotel: hotel;
  userFavHotels: hotel[];
}
const HotelCard: React.FC<Props> = ({ hotel, userFavHotels }): JSX.Element => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [id, setId] = React.useState<string>("");
  const theme = useSelector((state) => state.user.theme);
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

  /*  if (!fonts) return null; */

  //<Icon name="spinner" reverse type="font-awesome-5" />;

  return (
    <Card
      containerStyle={[
        styles.container,
        !theme && tema.darkContainer,
        !theme && { borderColor: "rgba(256,256,256,0.4)", borderWidth: 1 },
      ]}
    >
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("HotelProfile", { id: hotel._id })}
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
            <Text
              style={[styles.headerTitle, !theme && tema.darkText]}
            >{`${hotel.name}`}</Text>

            <Text style={styles.text}>
              <Text style={styles.pricing}>${hotel.fee}</Text>
              <Text
                style={[
                  { fontFamily: "NunitoSans_400Regular" },
                  !theme && tema.darkText,
                ]}
              >
                /night
              </Text>
            </Text>
          </View>
        </View>

        <View>
          <Card.Divider />
          <Text
            style={[
              { fontFamily: "NunitoSans_600SemiBold", fontSize: 20 },
              !theme && tema.darkText,
            ]}
          >
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
              style={[
                {
                  textTransform: "capitalize",
                  marginLeft: 6,
                  fontFamily: "NunitoSans_600SemiBold",
                },
                !theme && tema.darkText,
              ]}
            >
              {hotel.zone}
            </Text>
          </View>

          <View style={styles.cardHeaderRate}>
            <Text
              style={[
                { marginRight: 5, fontSize: 15 },
                !theme && tema.darkText,
              ]}
            >
              {hotel.rating}
            </Text>
            <Icon
              name="star-o"
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
              name="heart-o"
              type="font-awesome"
              size={19}
              color={!theme ? "white" : "black"}
            />
          }
          checkedIcon={
            <Icon
              name="heart"
              type="font-awesome"
              size={19}
              color={"#E13E50"}
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
