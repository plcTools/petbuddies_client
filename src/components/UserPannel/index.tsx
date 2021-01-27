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
                source={{uri: 'https://avatars2.githubusercontent.com/u/70122640?s=460&u=b6ee1cc045afec1cd97d12d10725552b4734138f&v=4'}}
                overlayContainerStyle={{backgroundColor: 'orange'}}
                onPress={() => alert("ir a editar perfil")}
                />
                <ListItem.Content>
                    <ListItem.Title>Macarena Montes de Oca</ListItem.Title>
                    <ListItem.Subtitle>Miami, Florida</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <Icon raised name='paw'type='fontisto' size={10}/>
                <ListItem.Content>
                <ListItem.Title>My Pets</ListItem.Title>
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
                <Icon raised name='sign-out'type='font-awesome' size={10}/>
                <ListItem.Content>
                <ListItem.Title>Logout</ListItem.Title>
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

