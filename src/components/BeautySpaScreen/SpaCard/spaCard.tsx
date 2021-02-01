import * as React from 'react';
import { useState } from 'react';
import { styles } from './styles'

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,

} from 'react-native';
import { Icon } from 'react-native-elements';

const DATA = [
  {
    id: '3',
    title: 'Hair Cut',
  },
  {
    id: '2',
    title: 'Nails Cut',
  },
  {
    id: '1',
    title: 'Bubble bath',
  },
];

function SpaCard(props: any) {

  const renderItem = (item: any) => {
    return (
      <View style={styles.itemList}>
        <Text style={styles.textList}>{item.item.title}</Text>
      </View>
    )
  };

  console.log ('Fotos: ', props.peluqueria.photos)

  return (
      <SafeAreaView /* screen */ style={styles.screen}>
        <View /* containerAll */ style={styles.containerAll}>
          <View /* headersContainer */ style={styles.headersContainer}>
            <View /* left */>
              <View /* titleContainer */>
                <Text style={styles.textTitle}>{props.peluqueria.name}</Text>
              </View>
            </View>
            <View /* right */>
              <View /* buttonContainer */>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.textButton}>Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View /* detailsConatiner */ style={styles.detailsContainer}>
            <View /* left */>
              <View /* photoContainer */>
                <Image
                  style={styles.photo}
                  source={{
                    uri: props.peluqueria.photo [0],
                  }}></Image>
              </View>
            </View>

            <View /* Right */ style={{ width: '45%' }}>
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
          <View
          /* footerContainer */ style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View /* left */>
              <View /* timesInfo */ style={{ alignItems: 'center', marginTop:10 }}>
                <Text style={{ fontWeight: 'bold' }}>Schedule</Text>
                <Text>{props.peluqueria.workDays}</Text>
                <Text>{props.peluqueria.workHours}</Text>
              </View>
              <View /* buttonContainer */></View>
            </View>
            <View /* right */ style={{ alignItems: 'center' }}>
              <View /* Ubicacion */ style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Location</Text>
                <Text>{props.peluqueria.address}</Text>
              </View>
              <View /* reviews */ style={{flexDirection:'row',justifyContent:'space-around',width:100, marginTop:10}}>
                <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
                <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
                <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
}

export default SpaCard;