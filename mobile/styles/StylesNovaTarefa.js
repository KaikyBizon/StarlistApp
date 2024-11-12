import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    // Estilo para o fundo da tela
    background: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    // Estilo para o título
    titulo: {
        fontSize: 45,
        color: '#fff100',
        fontFamily: 'Kanit_500Medium',
    },
    // Estilo para os campos de entrada de texto
    inputs: {
        backgroundColor: '#333',
        width: '100%',
        height: 50,
        borderRadius: 10,
        fontFamily: 'Kanit_500Medium',
        color: '#FFF88E',
    },
    // Estilo específico para campos de entrada de data
    inputsData: {
        backgroundColor: '#cecece',
        width: '45%',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
    },
    // Estilo para rótulos de texto
    label: {
        color: '#FFF88E',
        fontSize: 20,
        fontFamily: 'Kanit_500Medium',
        textAlign: 'left', // Alinha o texto da label à esquerda
        alignSelf: 'flex-start', // Garante que a label fique à esquerda do contêiner
        marginBottom: 5,
    },
    // Container para agrupar campos de entrada
    containerInputs: {
        marginTop: 80,
        width: '100%',
        alignItems: 'center',

    },
    // Estilo específico para os botões de data e hora
    buttonDateAndTime: {
        width: 192,
        marginHorizontal: 10,
        height: 50,
        backgroundColor: '#faed27',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },

    // Estilo para a seção de data da tarefa
    dataTarefa: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    // Estilo para rótulos de entrada de texto
    inputsLabel: {
        width: '90%', // Mantém a largura do input sem centralizar o conteúdo
        marginTop: 10,
        alignSelf: 'center', // Mantém o contêiner centralizado na tela
    },
    // Contêiner para alinhar os botões na mesma linha
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 15,
        alignSelf: 'center',
    },
    // Estilo para o botão de envio
    btnSubmit: {
        backgroundColor: '#faed27',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para o texto do botão de envio
    submitTxt: {
        fontSize: 14,
        fontFamily: 'Kanit_500Medium',
    },
    // Estilo para o botão de Cancelar
    btnCancel: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para o texto do botão de Cancelar
    cancelTxt: {
        fontSize: 14,
        fontFamily: 'Kanit_500Medium',
        color: '#222',
    },
    // Estilo para botões gerais
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
    // Estilo para o texto dos botões
    buttonText: {
        fontFamily: 'Kanit_500Medium',
        fontSize: 18,
    },
    // Estilo específico para seleção de tempo
    selectTime: {
        backgroundColor: '#faed27',
    },
    // Container para o picker (seletor)
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    // Estilo para o picker (seletor)
    picker: {
        height: 50,
        width: '100%',
        color:'#FFF88E'
    },

})

export default styles
