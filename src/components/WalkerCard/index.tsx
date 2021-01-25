import React from 'react';
import { styles } from './styles';
import { View, Text } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import { RouteStackParamList } from '../../NavigationConfig/types'
/* import { Walker } from '../../redux/reducers/walker/types'
import { useSelector } from 'react-redux' */
import { walkers } from './data'

const WalkerCard = ({ navigation }: RouteStackParamList<'WalkerCard'>) => {
    /* interface RootState {
        paseadores: { walkers: Walker[] }

    }
    const walkers = useSelector((state: RootState) => state.paseadores.walkers) */

    console.log(walkers)
    return (
        <View>
            {walkers ? walkers.map(walker => {
                return(<Card>
                <View style={styles.cardHeaderContainer}>
                    <View style={styles.cardHeaderMain}>
                        <Text style={styles.headerTitle}>
                            {walker.name}
                        </Text>
                    </View>
                    <Icon style={styles.rateStar} raised name='heart-o' type='font-awesome' size={13} color='black'
                        onPress={() => navigation.navigate('WalkerProfile', {id: walker.id})}/>
                </View>
                <Card.Divider />
                <View style={styles.cardContainer}>
                    <View>
                        <Avatar
                            rounded
                            size='large'
                            activeOpacity={0.7}
                            source={{
                                uri: `${walker.avatar}`,
                            }}
                            onPress={() => console.log("works")}
                            title={walker.name}
                        />
                        <View style={styles.btnContainer}>
                            <Text style={styles.text}>
                                <Text style={styles.pricing}>
                                    {walker.price}</Text><Text>/walk 
                                    </Text>
                                </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.infoContainer}>
                            <Text>{walker.description}</Text>
                            <Text>I mainly work in {walker.workZone}</Text>
                            <Text>I walk {walker.countDogs} dogs per run</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardHeaderRate}>
                    <Icon name='star-o' type='font-awesome' size={20} color='green' underlayColor="red"/>
                    <Text>3.7</Text>
                </View>
            </Card>)
            })
        : <Text>No walkers</Text>}   
        </View>
    )
}


export default WalkerCard;
