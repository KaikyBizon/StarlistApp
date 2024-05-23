import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#faed27',
    },
    containerVoltar: {
        width: '20%',
        height: '15%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    btnVoltar: {
        backgroundColor: '#9d9d9d',
        borderRadius: 25,
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: '#f7f7f7',
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    btnEscolha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    codigoQr: {
        alignItems: 'center',
    },
    infoPagamento: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    codigoPix: {
        fontSize: 18,
        marginVertical: 10,
    },
    infoQr: {
        fontSize: 16,
        fontWeight: 'bold',
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
