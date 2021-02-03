import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { Divider, Icon } from "react-native-elements";
import SpaCard from "./SpaCard/spaCard";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { useAppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { getHairdressers } from "../../redux/Hairdressers/actions";
import styles from "./styles";
import { getData } from "../../AsyncStorage/index";
import { getOwnerFavGroomers } from "../../redux/owner/actions";

function BeautySpaScreen() {
  const [id, setId] = useState("");
  const [icon, setIcon] = React.useState<ModalChecks>({ walkers: true });
  const [render, setRender] = useState<any>(null);
  const [checked, setChecked] = React.useState<string | boolean>(false);

  interface ModalChecks {
    [key: string]: boolean;
  }

  const retrieveStorage = async () => {
    const user: string = await getData();
    setId(user);
  };

  const peluquerias = useSelector(
    (state: RootState) => state.peluqueros.peluquerias
  );

  const dispatch = useAppDispatch();

  const handleIcon = (name: string) => {
    setIcon({
      [name]: true,
    });
  };

  React.useEffect(() => {
    retrieveStorage();
    dispatch(getHairdressers());
    dispatch(getOwnerFavGroomers(id));
    setRender(peluquerias);
  }, [dispatch]);

  return (
    <SafeAreaView>
      <Divider />
      <View style={styles.viewIcons}>
        <Icon
          name="walking"
          type="font-awesome-5"
          color={icon?.walkers ? "#fc5185" : "grey"}
        />
        <Icon
          name="star"
          type="font-awesome"
          color={icon?.star ? "#f8dc81" : "grey"}
          onPress={() => {
            handleIcon("star");
            setRender(() => {
              let newState = [...peluquerias];
              return newState.sort((a, b) => b.reviews - a.reviews);
            });
            setChecked(false);
          }}
        />
        <Icon
          name="heart"
          type="font-awesome"
          // color='red'
          color={icon?.heart ? "#ef4f4f" : "grey"}
        />
        <Icon
          name="map-marker-alt"
          type="font-awesome-5"
          // color='#00af91'
          color={icon?.house ? "#008891" : "grey"}
        />
        {/* <Icon
                    name='globe'
                    type='font-awesome-5'
                    color='#51c2d5'
                    onPress={() => alert('all')}
                /> */}
      </View>
      <Divider />
      <ScrollView style={{ marginTop: 20, marginBottom: 60 }}>
        {render !== null &&
          render.map((item: any) => (
            <SpaCard
              key={item._id}
              id={item._id}
              peluqueria={item}
              userId={id}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default BeautySpaScreen;
