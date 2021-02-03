import * as React from "react";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import DetailsSpaCard from "./../DetailsSpaCard/DeatailSpaCard";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { Icon, Card, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_900Black_Italic,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_300Light_Italic,
  NunitoSans_300Light,
} from "@expo-google-fonts/nunito-sans";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../../redux/store';
import { getData } from '../../../AsyncStorage/index';
import { getOwnerFavGroomers } from "../../../redux/owner/actions";
import axios from 'axios';

function SpaCard(props: any) {
  // const renderItem = (item: any) => {
  //   return (
  //     <View style={styles.itemList}>
  //       <Text style={styles.textList}>{item.item}</Text>
  //     </View>
  //   );
  // };

  /* muestra o cierra el modal */

  // useEffect (() => {
  //   console.log (userFavGroomers, 'fav groomers');
  //   const found = userFavGroomers.find (groomer => groomer._id == props.id);
  //   if (!found) setChecked (true);
  // }, [])

  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState (false);

  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

  const userFavGroomers = useSelector((state: RootState) => state.user.userFavGroomers);

  useEffect (() => {
    const found = userFavGroomers && userFavGroomers.find (peluqueria => peluqueria._id == props.id);
    if (found) setChecked (true);
  }, [])

  const navigation = useNavigation();
  let [fonts] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_900Black_Italic,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_300Light_Italic,
    NunitoSans_300Light,
  });

  const dispatch = useAppDispatch ();

  if (!fonts) return <Icon name="spinner" reverse type="font-awesome-5" />;

  return (
    <Card containerStyle={styles.container}>
      <TouchableOpacity style={styles.cardContainer} onPress={()=> setModalVisible(!modalVisible)}>
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
              uri: `${props.peluqueria.photo[0]}`,
            }}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{props.peluqueria.name}</Text>
          </View>
        </View>
        <View>
          <Card.Divider />
          <Text style={{ fontFamily: "NunitoSans_600SemiBold", fontSize: 20 }}>{props.peluqueria.description}</Text>
          <View style={styles.workZone}>
            <Icon
              style={styles.icon}
              name="map-marker-alt"
              type="font-awesome-5"
              size={20}
              color="#fc5185"
            />
            <Text style={{ textTransform: 'capitalize', fontWeight: 'bold', marginRight: 20 }}>{props.peluqueria.localidad}</Text>
          </View>
        </View>
        <View style={styles.cardHeaderRate}>
          <Text style={{ marginRight: 5, fontSize: 15 }}>{props.peluqueria.reviews}</Text>
          <Icon
            name="star-o"
            type="font-awesome"
            size={18}
            color="green"
            underlayColor="red"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.fav}>
        <CheckBox
          uncheckedIcon={
            <Icon
              raised
              name="heart-o"
              type="font-awesome"
              size={12}
              color="black"
            />
          }
          checkedIcon={
            <Icon
              raised
              name="heart"
              type="font-awesome"
              size={12}
              color={"red"}
            />
          } 
          checked={checked}
          onPress={async () => {
            if (!checked) {
              const result = await axios.patch(`/groomer/${props.userId}/favourites/${props.id}`);
              dispatch(getOwnerFavGroomers(props.userId));
              return setChecked(true);
            } else {
              const result = await axios.delete(`/groomer/${props.userId}/favourites/${props.id}`);
              dispatch(getOwnerFavGroomers(props.userId));
              return setChecked(false);
            }
          }} />
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("se cierra el Modal.");
        }}
      >
        <DetailsSpaCard
          modalStatusChange={modalStatusChange}
          data={props.peluqueria}
        />
      </Modal>
      </View>
    </Card>
  );
}

export default SpaCard;
