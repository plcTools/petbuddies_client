import {  StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    text: {
        marginTop: 10
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
    pricing: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "blue",
    }
});