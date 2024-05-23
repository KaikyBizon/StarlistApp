import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#9d9d9d',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    titulo: {
        fontSize: 45,
        color: '#fff100',
        fontFamily: 'Kanit_500Medium',
    },
    inputs: {
        backgroundColor: '#cecece',
        width: '90%',
        height: 50,
        borderRadius: 10,
        fontFamily: 'Kanit_500Medium',
    },
    inputsData: {
        backgroundColor: '#cecece',
        width: '45%',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
    },
    label: {
        color: '#cecece',
        fontSize: 20,
        fontFamily: 'Kanit_500Medium',
    },
    containerInputs: {
        marginTop: 80,
        width: '100%',
        alignItems: 'center',
    },
    dataTarefa: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    inputsLabel: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    btnSubmit: {
        backgroundColor: '#faed27',
        marginTop: 15,
        borderRadius: 10,
        padding: 20,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitTxt: {
        fontSize: 20,
        fontFamily: 'Kanit_500Medium',
    },
    button: {
        height: 50,
        backgroundColor: '#faed27',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 190,
    },
    buttonText: {
        fontFamily: 'Kanit_500Medium',
    },
    selectTime: {
        backgroundColor: '#faed27',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
    },
})

export default styles