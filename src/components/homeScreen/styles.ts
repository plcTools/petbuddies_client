import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 60,
        width: '100%',
        flex: 1
    },
    cards: {
        width: '92%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#456672',
    },
    scroll: {
        height: '50%',
        width: '100%',
        margin: 20,
        alignSelf: 'center',
        padding: 20,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'lightblue',
        resizeMode: 'center'
    },
    scrollView: {
        alignItems: 'center',
        // width: '100%',
        // backgroundColor: 'blue'
        // marginBottom: 20,
        // borderRadius: 10,
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    icons: {
        color: '#ffffff',
        resizeMode: 'contain',
    }
});