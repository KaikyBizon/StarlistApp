import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    // Estilo para o fundo da tela
    background: {
        flex: 1,
        backgroundColor: '#9d9d9d',
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
        backgroundColor: '#cecece',
        width: '90%',
        height: 50,
        borderRadius: 10,
        fontFamily: 'Kanit_500Medium',
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
        color: '#cecece',
        fontSize: 20,
        fontFamily: 'Kanit_500Medium',
    },
    // Container para agrupar campos de entrada
    containerInputs: {
        marginTop: 80,
        width: '100%',
        alignItems: 'center',
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
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    // Estilo para o botão de envio
    btnSubmit: {
        backgroundColor: '#faed27',
        marginTop: 15,
        borderRadius: 10,
        padding: 20,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para o texto do botão de envio
    submitTxt: {
        fontSize: 20,
        fontFamily: 'Kanit_500Medium',
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
    },
    // Estilo específico para seleção de tempo
    selectTime: {
        backgroundColor: '#faed27',
    },
    // Container para o picker (seletor)
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    // Estilo para o picker (seletor)
    picker: {
        height: 50,
        width: '100%',
    },
})

export default styles
