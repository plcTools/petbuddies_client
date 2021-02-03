import * as React from "react";
import { useState } from "react";
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
import { Icon } from "react-native-elements";

function SpaCard(props: any) {
  const renderItem = (item: any) => {
    return (
      <View style={styles.itemList}>
        <Text style={styles.textList}>{item.item}</Text>
      </View>
    );
  };

  /* muestra o cierra el modal */
  const [modalVisible, setModalVisible] = useState(false);
  const modalStatusChange = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View /* containerAll */ style={styles.containerAll}>
      <View /* headersContainer */ style={styles.headersContainer}>
        <View /* left */>
          <View /* titleContainer */>
            <Text style={styles.textTitle}>{props.peluqueria.name}</Text>
          </View>
        </View>

        <View /* rightHeaders */>
          <View /* buttonContainer */>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textButton}>Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View /* detailsConatiner */ style={styles.detailsContainer}>
        <View /* leftDetails */>
          <View style={{ height: "100%", width: "100%" }} /* photoContainer */>
            <Image
              style={styles.photo}
              source={{
                uri: props.peluqueria.photo[0],
              }}
            ></Image>
          </View>
        </View>

        <View /* RightDetails */ style={{ width: "45%" }}>
          <View /* servicesContainer */>
            <View /* title */ style={styles.titleListContainer}>
              <Text style={styles.textTitleList}>Services</Text>
            </View>

            <View /* list */>
              <FlatList
                data={props.peluqueria.services}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </View>

      <View /* footerContainer */ style={styles.footerContainer}>
        <View /* leftFooter */>
          <View /* timesInfo */ style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Schedule</Text>
            <Text>{props.peluqueria.workDays}</Text>
            <Text>{props.peluqueria.workHours}</Text>
          </View>
        </View>

        <View /* rightFooter */ style={{ alignItems: "center", marginTop: 10 }}>
          <View /* Ubicacion */ style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Location</Text>
            <Text>{props.peluqueria.localidad}</Text>
          </View>

          <View /* reviews */ style={styles.reviewsContainer}>
            <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
            <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
            <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
          </View>
        </View>
      </View>
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
  );
}

export default SpaCard;
