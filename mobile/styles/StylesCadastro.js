import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#9d9d9d",
        alignItems: "center",
        justifyContent: "center",
    },
    inputs: {
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: "#cecece",
        borderRadius: 10,
        height: 50,
        width: 380,
        padding: 10,
        marginBottom: 8,
        fontFamily: 'Kanit_500Medium',
    },
    containerLogo: {
        width: 380,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        flex: 0,
        width: 300,
        height: 200,
        marginRight: 25,
    },
    btnSubmit: {
        backgroundColor: "#faed27",
        height: 70,
        width: 380,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    label: {
        color: "#ffffff",
        marginBottom: 1,
        fontFamily: 'Kanit_500Medium',
    },
    submitTxt: {
        color: "#8f8e8e",
        fontSize: 18,
        fontFamily: 'Kanit_500Medium',
    },
    temconta: {
        fontFamily: 'Kanit_500Medium',
        fontSize: 17,
        marginBottom: 2,
    },
    facalogin: {
        color: "#191919",
        textDecorationLine: 'underline',
    },
})

export default styles