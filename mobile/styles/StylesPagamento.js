import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#9d9d9d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    containerVoltar: {
        position: 'absolute',
        top: 30,
        left: 10,
    },
    btnVoltar: {
        backgroundColor: '#9d9d9d',
        borderRadius: 25,
        padding: 5,
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        width: '80%',
        backgroundColor: '#696969',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    metodoPagamento: {
        marginBottom: 20,
    },
    txtInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#c9c9c9',
        textAlign: 'center',
    },
    btnEscolha: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    btnMetodo: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    btnMetodoSelected: {
        backgroundColor: '#faed27',
    },
    txtBotao: {
        fontSize: 16,
        color: '#696969',
    },
    codigoQr: {
        alignItems: 'center',
    },
    infoPagamento: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c9c9c9',
    },
    codigoPix: {
        fontSize: 18,
        marginVertical: 10,
        color: '#fff',
    },
    infoQr: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c9c9c9',
    },
    imagemQr: {
        marginVertical: 10,
    },
    code: {
        width: 200,
        height: 200,
    },
    btnPagar: {
        marginTop: 20,
        backgroundColor: '#faed27',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    txtPagar: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#696969',
    },
    dadosCartao: {
        marginTop: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLinha: {
        flex: 1,
        marginHorizontal: 5,
    },
    inputMeio: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default styles;
