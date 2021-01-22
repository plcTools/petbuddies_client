import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        borderTopColor: '#e3e3e3 1 solid' 
    },
    cards: {
        backgroundColor: 'red',
        width: '70%',
        minHeight: '10vh',
        marginBottom: 20,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        textDecorationLine: 'underline',
        textAlign: 'left',
        marginBottom: 25
    },
    footer: {
        backgroundColor: '#3e3e3e',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icons: {
        color: '#ffffff',
        resizeMode: 'contain',
        flex: 1
    }
});