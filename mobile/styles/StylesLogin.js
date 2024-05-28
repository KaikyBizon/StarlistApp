import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    blackground: {
        flex: 1,
        backgroundColor: '#9d9d9d',
        alignItems: 'center',
    },
    logo: {
        flex: 1,
        width: '100%'
    },
    container: {
        flex: 1,
        width: '90%',
    },
    inputs: {
        backgroundColor: '#CECECE',
        color: '#8F8E8E',
        marginBottom: 15,
        fontSize: 17,
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Kanit_500Medium',
    },
    btnSubmit: {
        backgroundColor: '#FAED27',
        marginBottom: 150,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        borderRadius: 6,
        color: '#CECECE',
        marginTop: 15,
    },
    submitTxt: {
        color: '#9d9d9d',
        fontSize: 18,
        fontFamily: 'Kanit_500Medium',
    },
    login: {
        color: '#CECECE',
        fontFamily: 'Kanit_500Medium',
    },
    containerError: {
        width: '100%',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: 15
    }
});