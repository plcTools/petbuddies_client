import React from 'react';
import { styles } from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Image, Icon, CheckBox, Divider } from 'react-native-elements';
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

const WalkerCard: React.FC<Props> = ({ walker, userFavorites }): JSX.Element => {
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
            if (u._id === walker._id) {
                setChecked(true);
            };
        });

    }, [userFavorites]);

    if (!fonts) return <Icon name='spinner' reverse type='font-awesome-5' />

    return (
        <Card containerStyle={styles.container}>

            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate('WalkerProfile', { id: walker._id })}
            >
                <View style={styles.cardHeader} >

                    <Image
                        style={{ height: 100, width: 100, borderRadius: 4, marginRight: 10, marginTop: 3, marginBottom: 7 }}
                        source={{
                            uri: `${walker.photo}`,
                        }}
                    />


                    <View style={styles.headerContainer}>

                        <Text style={styles.headerTitle}>
                            {`${walker.name} ${walker.lastname}`}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.pricing}>
                                ${walker.fee}</Text><Text style={{ fontFamily: 'NunitoSans_400Regular' }}>/walk
                                    </Text>
                        </Text>

                    </View>



                </View>

                <View>

                    < Card.Divider />
                    <Text style={{ fontFamily: 'NunitoSans_600SemiBold', fontSize: 20 }}>{walker.description}</Text>
                    <View style={styles.workZone} >
                        <Icon
                            style={styles.icon}
                            name='map-marker-alt'
                            type='font-awesome-5'
                            size={20}
                            color='#fc5185'
                        />
                        {
                            walker.workZone?.map((z, i) => (
                                // <Text key={i} style={{textTransform: 'capitalize', fontWeight: 'bold', marginRight: 20}}>{z}</Text>

                                <Text key={i} style={{ textTransform: 'capitalize', marginLeft: 6, fontFamily: 'NunitoSans_600SemiBold' }}>{z}</Text>

                            ))
                        }
                    </View>


                    <View style={styles.cardHeaderRate}>
                        <Text style={{ marginRight: 5, fontSize: 15 }}>{walker.rating}</Text>
                        <Icon name='star-o' type='font-awesome' size={18} color='green' underlayColor="red" />
                    </View>

                </View>
            </TouchableOpacity>

            <View style={styles.fav}>
                <CheckBox
                    uncheckedIcon={
                        <Icon raised name='heart-o' type='font-awesome' size={12} color='black' />
                    }
                    checkedIcon={
                        <Icon raised name='heart' type='font-awesome' size={12} color={'red'} />
                    }
                    checked={checked}
                    onPress={async () => {
                        if (!checked) {
                            const result = await axios.patch(`/owners/600ae1c984ce6400985f4f7a/favorites`, { walkerId: walker._id })
                            dispatch(getUserFavorites("600ae1c984ce6400985f4f7a"))
                            return setChecked(true)
                        } else {
                            const result = await axios.delete(`/owners/600ae1c984ce6400985f4f7a/favorites/` + walker._id)
                            dispatch(getUserFavorites("600ae1c984ce6400985f4f7a"))
                            return setChecked(false)
                        }

                    }}
                />
            </View>


        </Card >
    )
}


export default WalkerCard;
