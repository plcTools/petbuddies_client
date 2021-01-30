import {  StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius:5,
        marginBottom: 10,
        height: 250,
    },
    cardHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        height: 40
    },
    cardHeaderMain: {
        width: '80%'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    cardHeaderRate: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cardContainer: {
        flexDirection: "row",
    },
    text: {
        marginTop: 10,
        width: 90 //No estaba
    },
    infoContainer: {
        justifyContent: "space-between",
        width: 190,
        marginLeft: 20,
        height: 150
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
    pricing: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "blue",
    }
});