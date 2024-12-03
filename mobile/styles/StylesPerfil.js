import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Container principal da tela de perfil
    containerProfile: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1e1e1e',
    },

    // Container para informações do perfil
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    // Estilo para o container das informações do perfil
    profileInfo: {
        alignItems: 'center',
    },

    // Estilo para o nome do usuário
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff556', 
        fontFamily: 'Kanit_500Medium',
    },

    // Estilo para o ID do usuário
    userId: {
        fontSize: 16,
        marginTop: 5,
        color: '#fff556',
        fontFamily: 'Kanit_500Medium',
    },

    // Estilo para o campo de entrada de texto no perfil
    textinputPerfil: {
        height: 40,
        borderColor: '#1e1e1e',
        borderWidth: 1,
        marginTop: 0,
        marginBottom: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor:'#333',
        color: '#f9e79f',  
        fontFamily: 'Kanit_500Medium',
    },

    // Container para os botões
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    // Estilo para o botão de deletar
    buttonDelete: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'red',
    },

    // Estilo para o botão de salvar
    buttonSalvar: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#faed27',
    },

    // Estilo para o texto do botão de deletar
    buttonTextDelete: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Kanit_500Medium',
    },

    // Estilo para o texto do botão de salvar
    buttonTextSalvar: {
        color: '#404040',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Kanit_500Medium',
    },

    // Estilo para o botão de sair
    buttonSair: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: '#404040',
    },

    // Estilo para o texto do botão de sair
    buttonTextSair: {
        color: '#ffeb3b',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Kanit_500Medium',
    },

    // Estilo para a label dos inputs
    inputPerfil: {
        color: '#fff556', 
        fontFamily: 'Kanit_500Medium',
    },

    // Estilo para a view dos inputs do perfil
    viewInputPerfil: {
        marginTop: 0,
    }
});

export default styles;