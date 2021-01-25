import React from 'react';
import { styles } from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon, CheckBox } from 'react-native-elements';
import { RouteStackParamList } from '../../NavigationConfig/types'
import { useNavigation } from '@react-navigation/native';
/* import { Walker } from '../../redux/reducers/walker/types'
import { useSelector } from 'react-redux' */
import { walkers } from './data'

interface Props {
    walker: {
        id: number;
        name: string;
        avatar: string;
        price: string;
        description: string;
        workZone: string;
        countDogs: string;
    },
    /* navigation: RouteStackParamList<'WalkerCard'> */
}

// type Props = RouteStackParamList<'WalkerCard'>;

// const WalkerCard = ({walker}: Walker, { navigation, route }: RouteStackParamList<'WalkerCard'> ) => {
    const WalkerCard: React.FC<Props> = ({walker}) => {
    const [ checked, setChecked ] = React.useState<boolean>(false);
    const navigation = useNavigation();

    return (
        <View>
            <Card>
                <View style={styles.cardHeaderContainer}>
                    <View style={styles.cardHeaderMain}>
                        <Text style={styles.headerTitle}>
                            {walker.name}
                        </Text>
                    </View>
                    <CheckBox 
                        uncheckedIcon={
                            <Icon style={styles.rateStar} raised name='heart-o' type='font-awesome' size={13} color='black' />
                        }
                        checkedIcon={
                            <Icon style={styles.rateStar} raised name='heart' type='font-awesome' size={13} color={'red'} />
                        }
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                    />
                </View>
                <Card.Divider />
                <TouchableOpacity 
                    style={styles.cardContainer}
                    onPress={() => navigation.navigate('WalkerProfile', { id: walker.id })}
                >
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
                </TouchableOpacity>
                <View style={styles.cardHeaderRate}>
                    <Icon name='star-o' type='font-awesome' size={20} color='green' underlayColor="red"/>
                    <Text>3.7</Text>
                </View>
            </Card>
        </View>
    )
}


export default WalkerCard;
