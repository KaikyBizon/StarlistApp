import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    PlanosBackground: {
        paddingTop: 8,
        backgroundColor: '#9D9D9D',
    },
    Background: {
        flex: 1,
        backgroundColor: "#9d9d9d",
        justifyContent: 'flex-start', // Alinha ao topo da tela
        alignItems: 'center', // Centraliza horizontalmente
        paddingTop: 20, // Espaçamento adicional no topo
    },
    PlanosLogo: {
        backgroundColor: "#9d9d9d",
        alignItems: "center",
        justifyContent: "center",

    },
    EscolhaPlano: {
        color: '#404040',
        fontSize: 17,
    },
    LogoPlanos: {
        width: 170,
    },
    PlanosTexto: {
        alignItems: "center",
        justifyContent: "center",
    },

    carrosel: {
        backgroundColor: '#726C6F',
        width: 350,
        height: 600,
        alignItems: "center",
        borderRadius: 15,


    },
    carroselHeader: {
        width: 100,
        height: 30,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFF100",
        backgroundColor: "#FFF100",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    titleHeaderPlanos: {
        color: "#494547",

    },
    carroselTitle: {
        marginTop: "10%",
    },
    titleCarrosel: {
        fontSize: 25,
        color: '#FFF100',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    carroselText: {
        width: 300,
        height: 250,
        marginTop: "10%",
    },
    textPlanos: {
        paddingBottom: 20,
        color: '#CECECE'

    },
    botaoCarrosel: {
        width: 200,
        marginTop: "35%",
    },
    CarroselButton: {
        backgroundColor: '#726C6F',
        height: 40,
        borderWidth: 2,
        borderColor: '#FFF100',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    CarroselTextoButton: {
        color: '#FFF100'
    },
    containerVoltar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
})
export default styles