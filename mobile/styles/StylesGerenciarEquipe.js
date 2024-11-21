import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        padding: 15,
    },
    scrollView: {
        flex: 1,
    },
    memberContainer: {
        marginBottom: 20,  // Espaço entre os membros
        padding: 10,       // Espaço interno ao redor do texto
        backgroundColor: '#878787', // Cor de fundo cinza claro
        borderRadius: 8,   // Bordas arredondadas para um visual mais suave
    },
    memberInfo: {
        flexDirection: 'row', // Alinhar a imagem e o nome horizontalmente
        alignItems: 'center', // Centralizar verticalmente
    },
    profileImage: {
        width: 50,  // Tamanho da imagem
        height: 50, // Tamanho da imagem
        borderRadius: 25,  // Imagem arredondada
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10, // Espaçamento entre a imagem e o nome
    },
    memberRole: {
        fontSize: 16,
        color: 'yellow',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#FF4C4C', // Cor de fundo do botão (vermelho)
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,  // Bordas arredondadas
        alignItems: 'center', // Alinhar texto centralizado no botão
        width: 'auto',
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 15,
        backgroundColor: '#FAED27',
        padding: 15,
        paddingHorizontal: 25,
        borderRadius: 15,  // Botão arredondado
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // Sombra para dar destaque ao botão
    },
    addButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Estilo para o modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    },
    modalContainer: {
        backgroundColor: '#919191',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    closeButton: {
        backgroundColor: '#6C757D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    searchButton: {
        backgroundColor: '#000000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

export default styles