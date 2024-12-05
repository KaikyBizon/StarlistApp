import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Estilo de fundo para a tela principal
    background: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para o logo
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    // Container para o botão de voltar
    containerVoltar: {
        position: 'absolute',
        top: 30,
        left: 10,
    },
    // Estilo para o botão de voltar
    btnVoltar: {
        backgroundColor: '#222',
        borderRadius: 25,
        padding: 5,
    },
    // Estilo para o container de fundo
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    // Container principal para os conteúdos
    container: {
        width: '80%',
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    // Estilo para o método de pagamento
    metodoPagamento: {
        marginBottom: 20,
    },
    // Estilo para textos informativos
    txtInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#c9c9c9',
        textAlign: 'center',
    },
    // Estilo para o container de escolha de botão
    btnEscolha: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    // Estilo para o botão de método de pagamento
    btnMetodo: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    // Estilo para o botão de método de pagamento selecionado
    btnMetodoSelected: {
        backgroundColor: '#faed27',
    },
    // Estilo para o texto do botão
    txtBotao: {
        fontSize: 16,
        color: '#696969',
    },
    // Estilo para o container do código QR
    codigoQr: {
        alignItems: 'center',
    },
    // Estilo para informações de pagamento
    infoPagamento: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c9c9c9',
    },
    // Estilo para o código PIX
    codigoPix: {
        fontSize: 18,
        marginVertical: 10,
        color: '#fff',
    },
    // Estilo para informações de QR
    infoQr: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c9c9c9',
    },
    // Estilo para a imagem do código QR
    imagemQr: {
        marginVertical: 10,
    },
    // Estilo para a imagem do código QR
    code: {
        width: 200,
        height: 200,
    },
    // Estilo para o botão de pagar
    btnPagar: {
        marginTop: 20,
        backgroundColor: '#faed27',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    // Estilo para o texto do botão de pagar
    txtPagar: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#696969',
    },
    // Estilo para o container dos dados do cartão
    dadosCartao: {
        marginTop: 20,
    },
    // Estilo para os campos de entrada
    input: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color:'#FFF88E',   
     },
    // Estilo para a linha de inputs
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // Estilo para os inputs dentro da linha
    inputLinha: {
        flex: 1,
        marginHorizontal: 5,
        color:"black"
    },
    // Estilo para o input no meio da linha
    inputMeio: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
        color:"#FFF88E",
    },


    btnVerificacao: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderWidth: 1,
        backgroundColor: '#faed27'
    },
    txtVerificacao: {
        color: 'black', // Cor do texto
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
