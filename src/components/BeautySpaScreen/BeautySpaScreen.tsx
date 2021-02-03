import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import SpaCard from './SpaCard/spaCard';
import { RouteStackParamList } from '../../NavigationConfig/types';
import { useAppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getHairdressers } from '../../redux/Hairdressers/actions';
import styles from './styles';
import { getData } from '../../AsyncStorage/index';
import { getOwnerFavGroomers } from "../../redux/owner/actions";

function BeautySpaScreen() {

    const [id, setId] = useState ('');
    const [icon, setIcon] = React.useState<ModalChecks>({ peluquerias: true });
    const [state, setState] = useState<any> (null);
    const [checked, setChecked] = React.useState<string | boolean>(false);
    const [check, setCheck] = React.useState<boolean>(false);

    interface ModalChecks {
        [key: string]: boolean;
    }

    const retrieveStorage = async () => {
        const user: string = await getData()
        setId(user)
    }

    const peluquerias = useSelector((state: RootState) => state.peluqueros.peluquerias);
    const userFavGroomers = useSelector(
        (state: RootState) => state.user.userFavGroomers
      );

      console.log(userFavGroomers)

    const dispatch = useAppDispatch ();

    const handleIcon = (name: string) => {
        setIcon({
          [name]: true,
        });
      };

    React.useEffect(() => {
        retrieveStorage();
        if(Object.keys(peluquerias).length === 0) {
            dispatch(getHairdressers());
        }
        dispatch(getOwnerFavGroomers(id));
        setState (peluquerias);   
    }, [dispatch, peluquerias])


    const renderComponent = (arr: any) => {
        return (
          <SafeAreaView
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <FlatList
              data={arr}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return <SpaCard id={item._id} peluqueria={item} userId={id}/>;
              }}
            />
          </SafeAreaView>
        );
      };

    return (
        <SafeAreaView>
            <Divider />
            <View style={styles.viewIcons}>
                <Icon
                    name='list-ul'
                    type='font-awesome-5'
                    color={icon?.walkers ? "#fc5185" : "grey"}
                    onPress={() => {
                        setState(peluquerias);
                        setChecked(false);
                        handleIcon("peluquerias");
                      }}
                />
                <Icon
                    name='star'
                    type='font-awesome'
                    color={icon?.star ? '#f8dc81' : 'grey'}
                    onPress={() => {
                        handleIcon("star");
                        setState(() => {
                          let newState = [...peluquerias];
                          return newState.sort((a, b) => b.reviews - a.reviews);
                        });
                        setChecked(false);
                      }}
                />
                <Icon
                    name='heart'
                    type='font-awesome'
                    // color='red'
                    color={icon?.heart ? '#ef4f4f' : 'grey'}
                    onPress={() => {
                        setState(userFavGroomers);
                        setChecked(false);
                        handleIcon("heart");
                      }}
                />
                <Icon
                    name='map-marker-alt'
                    type='font-awesome-5'
                    // color='#00af91'
                    color={icon?.house ? '#008891' : 'grey'}
                    onPress={() => {
                        setCheck(!check);
                        setChecked(false);
                        handleIcon("house");
                      }}
                />
                {/* <Icon
                    name='globe'
                    type='font-awesome-5'
                    color='#51c2d5'
                    onPress={() => alert('all')}
                /> */}
            </View>
            <Divider />
            <ScrollView style={{marginTop: 20, marginBottom: 60}}>
                <View /* style={styles.container} */>{renderComponent(state)}</View>
               {/*  {state !== null && state.map((item: any) => <SpaCard id={item._id} peluqueria={item} userId={id} />)} */}
            </ScrollView>
        </SafeAreaView >
    )
}

export default BeautySpaScreen;