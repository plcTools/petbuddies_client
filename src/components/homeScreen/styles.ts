import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        width: '100%',
        flex: 1
        },
    cards: {
        width: '92%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#3fc1c9',
    },
    viewIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    cardIcons: {
        alignItems: 'center'
    },
    icons: {
        color: '#fc5185'
    }
});