import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Estilo para o fundo dos planos
    PlanosBackground: {
        paddingTop: 8,
        backgroundColor: '#1e1e1e',
    },
    // Estilo para o fundo principal
    Background: {
        flex: 1,
        backgroundColor: "#9d9d9d",
        justifyContent: 'flex-start', // Alinha ao topo da tela
        alignItems: 'center', // Centraliza horizontalmente
        paddingTop: 20, // Espaçamento adicional no topo
    },
    // Estilo para o logo dos planos
    PlanosLogo: {
        backgroundColor: "#1e1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    // Estilo para o texto "Escolha seu plano"
    EscolhaPlano: {
        color: '#faed27',
        fontSize: 17,
        fontFamily: 'Kanit_500Medium',
    },
    // Estilo para a imagem do logo dos planos
    LogoPlanos: {
        width: 170,
    },
    // Estilo para o texto dos planos
    PlanosTexto: {
        alignItems: "center",
        justifyContent: "center",
    },
    // Estilo para o contêiner do carrossel
    carrosel: {
        backgroundColor: '#333',
        width: 350,
        height: 600,
        alignItems: "center",
        borderRadius: 15,
    },
    // Estilo para o cabeçalho do carrossel
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
    // Estilo para o título do cabeçalho do carrossel
    titleHeaderPlanos: {
        color: "#494547",
        fontFamily: 'Kanit_500Medium',
    },
    // Estilo para o contêiner do título do carrossel
    carroselTitle: {
        marginTop: "10%",
    },
    // Estilo para o título do carrossel
    titleCarrosel: {
        fontSize: 25,
        color: '#FFF100',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Kanit_500Medium',
    },
    // Estilo para o texto do carrossel
    carroselText: {
        width: 300,
        height: 250,
        marginTop: "10%",
    },
    // Estilo para o texto dos planos
    textPlanos: {
        paddingBottom: 20,
        color: '#FFF88E',
        fontFamily: 'Kanit_500Medium',
    },
    // Estilo para o botão do carrossel
    botaoCarrosel: {
        width: 200,
        marginTop: "35%",
    },
    // Estilo para o botão do carrossel
    CarroselButton: {
        backgroundColor: '#333',
        height: 40,
        borderWidth: 2,
        borderColor: '#FFF100',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    // Estilo para o texto do botão do carrossel
    CarroselTextoButton: {
        color: '#FFF100',
        fontFamily: 'Kanit_500Medium',
    },
    // Estilo para o contêiner de voltar
    containerVoltar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
});

export default styles;
