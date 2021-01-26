import React from 'react';
import { styles } from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon, CheckBox, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { walker } from '../../NavigationConfig/types';

interface Props {
    walker: walker,
    userFavorites: walker[]
}

const WalkerCard: React.FC<Props> = ({ walker, userFavorites }) => {
    const [checked, setChecked] = React.useState<boolean>(false);
    const navigation = useNavigation();

    React.useEffect(() => {
        userFavorites.map(u => {
            if(u._id === walker._id) {
                setChecked(true);
            };
        });
    }, [userFavorites]);

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.cardHeaderContainer}>
                <View style={styles.cardHeaderMain}>
                    <Text style={styles.headerTitle}>
                        {`${walker.name} ${walker.lastname}`}
                    </Text>
                </View>
                <CheckBox
                    uncheckedIcon={
                        <Icon raised name='heart-o' type='font-awesome' size={13} color='black' />
                    }
                    checkedIcon={
                        <Icon raised name='heart' type='font-awesome' size={13} color={'red'} />
                    }
                    checked={checked}
                    onPress={async () => {
                        if (!checked) {
                            const result = await axios.patch(`http://localhost:3001/owners/600ae1c984ce6400985f4f7a/favorites`, { walkerId: walker._id })
                            return setChecked(true)
                        } else {
                            const result =
                                await axios.delete(`http://localhost:3001/owners/600ae1c984ce6400985f4f7a/favorites/` + walker._id)
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
                            uri: `${walker.photo}`,
                        }}
                        onPress={() => console.log("works")}
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
                        <Text style={{ textAlign: "justify", height: '60%' }}>{walker.description}</Text>
                        <Divider/>
                        <Text style={{ marginTop: 5, fontWeight: 'bold' }}> {walker?.workZone.map(item => `${item} `.toUpperCase())}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.cardHeaderRate}>
                <Icon name='star-o' type='font-awesome' size={15} color='green' underlayColor="red" />
                <Text>3.7</Text>
            </View>
        </Card>
    )
}


export default WalkerCard;
