import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Avatar, Card, Icon, Button, Divider } from 'react-native-elements'
import {RouteStackParamList} from '../../NavigationConfig/types'


const UserPannel =({navigation}: RouteStackParamList<'UserPannel'>)=> {
    
    return (
        <View>
            <ListItem bottomDivider>
                <Avatar /* onPress debería poder modificar la foto de perfil*/ 
                rounded
                size="large"
                title='MM'
                overlayContainerStyle={{backgroundColor: 'orange'}}
                onPress={() => alert("ir a editar perfil")}
                />
                <ListItem.Content>
                    <ListItem.Title>Macarena Montes de Oca</ListItem.Title>
                    <ListItem.Subtitle>La Plata, Buenos Aires</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='paw'type='fontisto' size={20}/>
                <ListItem.Content>
                <ListItem.Title>Mis Mascotas</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='blind'type='font-awesome' size={20}/>
                <ListItem.Content>
                <ListItem.Title>Paseos</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='envelope-o'type='font-awesome' size={20}/>
                <ListItem.Content>
                <ListItem.Title>Mensajes</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='heart' color = 'red' type='font-awesome' size={20}/>
                <ListItem.Content>
                <ListItem.Title>Favoritos</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='phone'type='font-awesome' size={20}/>
                <ListItem.Content>
                <ListItem.Title>Ayuda en línea</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='user-plus'type='font-awesome' size={20}/>
                <ListItem.Content>
                <ListItem.Title>Invitá a un amigo</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='sign-out'type='font-awesome' size={20}/>
                <ListItem.Content>
                <ListItem.Title>Cerrar sesión</ListItem.Title>
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

