import React from 'react';
import { styles } from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

interface Props {
    walker: {
        _id: string;
        name: string;
        lastname: string;
        avatar: string;
        fee: number;
        description: string;
        workZone: string[];
        countDogs: string;
    },
}
    const WalkerCard: React.FC<Props> = ({walker}) => {
    const [ checked, setChecked ] = React.useState<boolean>(false);
    const navigation = useNavigation();

    return (
        <View>
            <Card>
                <View style={styles.cardHeaderContainer}>
                    <View style={styles.cardHeaderMain}>
                        <Text style={styles.headerTitle}>
                            {`${walker.name} ${walker.lastname}`}
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
                        onPress={async () => {
                            if(!checked) {
                                const result  =await axios.patch(`https://henry-petbuddies.herokuapp.com//owners/600ae1c984ce6400985f4f7a/favorites`, {walkerId: walker._id})
                                return setChecked(true)
                            } else {
                                const result =
                                await axios.delete(`https://henry-petbuddies.herokuapp.com/owners/600ae1c984ce6400985f4f7a/favorites/` + walker._id)
                                return setChecked(false)
                            }
                           
                        }}
                    />
                </View>
                <Card.Divider />
                <TouchableOpacity 
                    style={styles.cardContainer}
                    onPress={() => navigation.navigate('WalkerProfile', { id: walker._id })}
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
                            title={`${walker.name} ${walker.lastname}`}
                        />
                        <View style={styles.btnContainer}>
                            <Text style={styles.text}>
                                <Text style={styles.pricing}>
                                    ${walker.fee}</Text><Text>/walk 
                                    </Text>
                                </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.infoContainer}>
                            <Text>{walker.description}</Text>
                            <Text>I mainly work in {walker?.workZone.map(item=> `${item} ` )}</Text>
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
