import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getOwner } from '../../redux/owner/actions';
import {View, StyleSheet} from 'react-native';
import {ListItem, Avatar,  Icon   } from 'react-native-elements'
import {RouteStackParamList} from '../../NavigationConfig/types';
import { getData } from '../../AsyncStorage/index';
import {  RootState } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserPannel =({navigation}: RouteStackParamList<'UserPannel'>)=> {

    const retrieveStorage = async () =>{
        const id = await getData()
        dispatch(getOwner(id))
    }
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.user.owner)
    // const { name, lastname, photo, email } = owner[0]

    useEffect(()=>{
        retrieveStorage();
    },[]);   

   const logout = async ( ) =>{
        try {
          await AsyncStorage.removeItem('@id')
          navigation.navigate('LoginScreen')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <View>
            <ListItem bottomDivider style={{paddingTop: 40}}
>
                <Avatar /* onPress debería poder modificar la foto de perfil*/ 
                rounded
                size="large"
                source={{uri: `${user?.photo}`}}
                overlayContainerStyle={{backgroundColor: 'orange'}}
                onPress={() => alert("ir a editar perfil")}
                />
                <ListItem.Content>
                    <ListItem.Title>{user?.name} {user?.lastname}</ListItem.Title>
                    <ListItem.Subtitle>{user?.zona} </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            
            <ListItem bottomDivider >
                <Icon raised name='user-cog'type='font-awesome-5' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Account</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='blind'type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Walks</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='envelope-o'type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Messages</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='heart' color = 'red' type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Favorites</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='phone'type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Help</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='user-plus'type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Invite a friend</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>  
             <ListItem bottomDivider>
                <Icon raised name='cog'type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Settings</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='sign-out'type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title onPress={()=> logout()}>Logout</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
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
export default UserPannel;

