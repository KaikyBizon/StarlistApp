import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    blackground: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
    },
    logo: {
        flex: 1,
        width: '100%'
    },
    container: {
        flex: 1,
        width: '90%',
    },
    inputsLogin: {
        backgroundColor: '#333',
        color: '#FFF88E',
        marginBottom: 15,
        fontSize: 15,
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Kanit_500Medium',
    },
    btnSubmit: {
        backgroundColor: '#FAED27',
        marginBottom: 150,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        borderRadius: 6,
        color: '#CECECE',
        marginTop: 15,
    },
    submitTxt: {
        color: '#333',
        fontSize: 18,
        fontFamily: 'Kanit_500Medium',
    },
    login: {
        color: '#FFEB3B',
        fontFamily: 'Kanit_500Medium',
    },
    containerError: {
        width: '100%',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: '#333',
        borderRadius: 20,
        padding: 15,       // Diminui o padding para reduzir o espaço interno
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300,        // Diminui a largura do modal
        height: 315,       // Diminui a altura do modal
    },
    modalError: {
        backgroundColor: '#333',
        borderRadius: 20,
        padding: 15,       // Diminui o padding para reduzir o espaço interno
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 225,        // Diminui a largura do modal
        height: 170,       // Diminui a altura do modal
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 6,
        elevation: 2,
        width: 100,  // Defina uma largura maior
        height: 50,  // Defina uma altura maior
    },
    buttonCancel: {
        backgroundColor: '#f44336',
        marginRight: 10,
        width: 122, // Aumente a largura específica para o botão "Cancelar"
        height: 45, // Aumente a altura específica para o botão "Cancelar"
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonReset: {
        backgroundColor: '#faed27',
        width: 122,  // Aumente a largura específica para o botão "Redefinir"
        height: 45,  // Aumente a altura específica para o botão "Redefinir"
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: '#333',
        textAlign: 'center',
        justifyContent: 'center',  // Centraliza o conteúdo verticalmente
        alignItems: 'center',      // Centraliza o conteúdo horizontalmente
    },
    textStyleCancelar: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',  // Centraliza o conteúdo verticalmente
        alignItems: 'center',      // Centraliza o conteúdo horizontalmente
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    inputs: {
        backgroundColor: '#424242',
        color: '#FFF88E',
        marginBottom: 15,
        fontSize: 13,       // Aumenta o tamanho da fonte
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FFE98F",
        padding: 8,        // Aumenta o padding para dar mais espaço interno
        fontFamily: 'Kanit_500Medium',
        width: 250,         // Aumenta a largura do input
        height: 45,         // Aumenta a altura do input
    },
    forgotPassword: {
        color: '#FFE98F'
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color:'#FFEB3B'
      },
      modalErrorText: {
        marginBottom: 10,
        textAlign: 'center',
        color: '#FFF176',
      },
      closeButton: {
        backgroundColor: '#616161',
        borderRadius: 9,
        padding: 8,
        elevation: 2,
      },
      
    
});