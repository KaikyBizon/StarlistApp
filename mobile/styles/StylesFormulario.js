import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  // Adicione esta linha para centralizar horizontalmente
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#222',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: 300, // Defina uma largura fixa
        height: 300, // Defina uma altura fixa
    },
    inputModal: {
        width: '100%',
        backgroundColor: '#555',
        color: '#FFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    dataTarefa: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 10,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonDateAndTime: {
        flex: 1,
        height: 40,
        borderColor: '#FFF88E',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
        marginRight: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Alinha os botões à esquerda
        width: '100%',
    },
    btnSalvar: {
        backgroundColor: '#FAED27',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        width: 130,
        alignItems: 'center',
    },
    btnCancelar: {
        backgroundColor: '#dc3545',
        borderRadius: 5,
        padding: 10,
    },
    // Container para o picker (seletor)
    pickerContainer: {
        borderWidth: 1,
        backgroundColor: '#555',
        borderColor: '#555',
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        width: 260,
        height: 45,
        marginBottom: 11, // Adiciona a distância entre o picker e o próximo campo
    },
    inputPicker: {
        width: '100%',
    },
    etiqueta: {
        color: '#FFF88E',
    },
    buttonText: {
        color: '#FFF88E',
    },
    btnNovaTarefa: {
        backgroundColor: '#333',
        height: 60,
    },
})
export default styles