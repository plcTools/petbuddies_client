import * as React from 'react';
import { useState } from 'react';
import {styles} from './styles'

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

const Item = ({ title }) => (
  <View style={styles.itemList}>
    <Text style={styles.textList}>{title}</Text>
  </View>
);

function SpaCard() {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <SafeAreaView /* screen */ style={styles.screen}>
      <View /* containerAll */ style={styles.containerAll}>
        <View /* headersContainer */ style={styles.headersContainer}>
          <View /* left */>
            <View /* titleContainer */>
              <Text style={styles.textTitle}>Spa Perruno</Text>
            </View /* titleContainer */>
          </View /* left */>
          <View /* right */>
            <View /* buttonContainer */>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Info</Text>
              </TouchableOpacity>
            </View /* Button Container */>
          </View /* right */>
        </View /* headersContainer */>
        <View /* detailsConatiner */ style={styles.detailsContainer}>
          <View /* left */>
            <View /* photoContainer */>
              <Image
                style={styles.photo}
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1611173622933-91942d394b04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                }}></Image>
            </View /* photoContainer */>
          </View /* left */>

          <View /* Right */ style={{ width: '45%' }}>
            <View /* servicesContainer */>
              <View /* title */ style={styles.titleListContainer}>
                <Text style={styles.textTitleList}>Services</Text>
              </View /* title */>
              <View /* list */>
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View /* list */>
            </View /* servicesContainer */>
          </View /* Right */>
        </View /* detailsContainer */>
        <View
          /* footerContainer */ style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View /* left */>
            <View /* timesInfo */ style={{ textAlign: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Schedule</Text>
              <Text>Monday to Friday</Text>
              <Text>8hs at 22hs</Text>
            </View /* timesInfo */>
            <View /* buttonContainer */></View /* Button Conatiner */>
          </View /* left */>
          <View /* right */ style={{ alignItems: 'center' }}>
            <View /* Ubicacion */ style={{ textAlign: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Location</Text>
              <Text>Urquiza Village</Text>
            </View /* Ubicacion */>
            <View /* reviews */>
              <Icon name="paw" type="font-awesome" size={25} color="#c98c70" />
            </View /* reviews */>
          </View /* right */>
        </View /* footerContainer */>
      </View /* containerAll */>
    </SafeAreaView /* screen */>
  );
}

export default SpaCard;