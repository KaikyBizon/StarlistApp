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
    inputsLogin: {
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
        color: '#ffffff',
        fontFamily: 'Kanit_500Medium',
    },
    containerError: {
        width: '100%',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#696969',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        borderRadius: 12,
        padding: 10,
        elevation: 2,
    },
    buttonCancel: {
        backgroundColor: '#f44336',
        marginRight: 10,
    },
    buttonReset: {
        backgroundColor: '#faed27',
    },
    textStyle: {
        color: '#696969',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textStyleCancelar: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#cecece',
    },
    inputs: {
        backgroundColor: '#CECECE',
        color: '#8F8E8E',
        marginBottom: 15,
        fontSize: 17,
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Kanit_500Medium',
        width: 280,
    },
    forgotPassword: {
        color: '#696969'
    },
    
});