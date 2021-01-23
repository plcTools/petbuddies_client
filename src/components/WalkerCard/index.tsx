import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Avatar, Button, Icon } from 'react-native-elements';
import { RouteStackParamList } from '../NavigationConfig/types'
import {Walker} from '../../redux/reducers/walker/types'
import {useSelector} from 'react-redux'


const WalkerCard = ({ navigation }: RouteStackParamList<'WalkerCard'>) => {
    interface RootState {
        paseadores: {walkers: Walker[]}
        
    }
    const walkers = useSelector((state: RootState) => state.paseadores.walkers)
    return (
        <View>
            <Card>
                <View style={styles.cardHeaderContainer}>
                    <View style={styles.cardHeaderMain}>
                        <Text style={styles.headerTitle}>Manuel Bolla Agrelo</Text>
                    </View>
                    <Icon style={styles.rateStar} raised name='heart-o' type='font-awesome' size={13} color='black' />

                </View>
                <Card.Divider />

                <View style={styles.cardContainer}>
                    <View>
                        <Avatar
                            rounded
                            size='large'
                            activeOpacity={0.7}
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/70901898?s=460&u=a89f8bf6f3748b70deece72b25314881d3818d09&v=4',
                            }}
                            onPress={() => console.log("works")}
                            title='Manuel Bolla Agrelo'
                        />
                        <View style={styles.btnContainer}>
                            <Button
                                title="+ info"
                                style={styles.btn}
                                titleStyle={styles.btnText}
<<<<<<< HEAD
                                onPress={() => navigation.navigate('WalkerProfile')}
=======
                                onPress={() => console.log(walkers[0].firstName)}
>>>>>>> master
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.infoContainer}>
                            <Text>Lives in: San isidro</Text>
                            <Text>Works at: Olivos</Text>
                            <Text>Usually walks 4 dogs per run</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardHeaderRate}>
                    <Icon name='star-o' type='font-awesome' size={15} color='green' />
                    <Text>3.7</Text>
                </View>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    cardHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    cardHeaderMain: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    cardHeaderRate: {
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    rateStar: {
        marginRight: 10
    },
    cardContainer: {
        flexDirection: "row",
    },
    infoContainer: {
        width: 200,
        marginLeft: 20,
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: 'center'
    },
    btn: {
        width: 50,
        height: 30,
    },
    btnText: {
        fontSize: 12
    },
});

export default WalkerCard;