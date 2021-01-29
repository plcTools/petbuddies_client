import React from 'react';
import { styles } from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon, CheckBox, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { 
    useFonts, 
    NunitoSans_400Regular, 
    NunitoSans_900Black_Italic, 
    NunitoSans_600SemiBold_Italic, 
    NunitoSans_600SemiBold, 
    NunitoSans_300Light_Italic,
    NunitoSans_300Light
} from '@expo-google-fonts/nunito-sans';
import { walker } from '../../NavigationConfig/types';
import { useAppDispatch, RootState } from '../../redux/store';
import { getUserFavorites } from '../../redux/owner/actions';


interface Props {
    walker: walker,
    userFavorites: walker[]
}

const WalkerCard: React.FC<Props> = ({ walker, userFavorites }) => {
    const [checked, setChecked] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    const navigation = useNavigation();
    let [fonts] = useFonts({
        NunitoSans_400Regular,
        NunitoSans_900Black_Italic,
        NunitoSans_600SemiBold_Italic,
        NunitoSans_600SemiBold,
        NunitoSans_300Light_Italic,
        NunitoSans_300Light
    })

    React.useEffect(() => {
        userFavorites?.map(u => {
            if(u._id === walker._id) {
                setChecked(true);
            };
        });

    }, [userFavorites]);

    if(!fonts) return <Icon name='spinner' reverse type='font-awesome-5'/>

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
                            const result = await axios.patch(`http://192.168.43.55:3001/owners/600ae1c984ce6400985f4f7a/favorites`, { walkerId: walker._id })
                            dispatch(getUserFavorites("600ae1c984ce6400985f4f7a"))
                            return setChecked(true)
                        } else {
                            const result = await axios.delete(`http://192.168.43.55:3001/owners/600ae1c984ce6400985f4f7a/favorites/` + walker._id)
                            dispatch(getUserFavorites("600ae1c984ce6400985f4f7a"))
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
                    />
                    <View style={styles.btnContainer}>
                        <Text style={styles.text}>
                            <Text style={styles.pricing}>
                                ${walker.fee}</Text><Text style={{fontFamily:'NunitoSans_400Regular'}}>/walk
                                    </Text>
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.infoContainer}>
                        <Text style={{ textAlign: "justify", fontFamily: 'NunitoSans_400Regular'}}>{walker.description}</Text>
                        <Divider/>
                        <View>
                        {
                            walker.workZone?.map((z, i) => (
                                // <Text key={i} style={{textTransform: 'capitalize', fontWeight: 'bold', marginRight: 20}}>{z}</Text>
                                <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 10}}>
                                    <Icon 
                                        name='map-marker-alt'
                                        type='font-awesome-5'
                                        size={10}
                                        color='#fc5185'
                                    />
                                    <Text style={{textTransform: 'capitalize', marginLeft: 10, fontFamily: 'NunitoSans_600SemiBold_Italic'}}>{z}</Text>
                                </View>
                            ))
                        }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.cardHeaderRate}>
                <Text style={{marginRight: 5}}>{walker.rating}</Text>
                <Icon name='star-o' type='font-awesome' size={15} color='green' underlayColor="red" />
            </View>
        </Card>
    )
}


export default WalkerCard;
