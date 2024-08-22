import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    // Estilo para o componente principal
    background: {
        flex: 1, // Ocupa toda a tela
        backgroundColor: '#9d9d9d', // Cor de fundo cinza
        alignItems: 'center', // Alinha itens ao centro horizontalmente
        width: '100%', // Largura igual a 100% da tela
        height: '100%', // Altura igual a 100% da tela
    },
    // Estilo para ícones de menu
    menu: {
        width: 30, // Largura de 30
        height: 30 // Altura de 30
    },
    // Estilo para o contêiner do menu
    containerMenu: {
        flexDirection: 'row', // Itens alinhados horizontalmente
        alignItems: 'center', // Alinha itens ao centro verticalmente
        width: '90%', // Largura igual a 90% do contêiner pai
        height: '17%', // Altura igual a 17% do contêiner pai
    },
    // Estilo para texto de data
    txtData: {
        color: '#faed27', // Cor amarela
        fontSize: 25, // Tamanho da fonte de 25
        marginLeft: 15, // Margem esquerda de 15
        fontFamily: 'Kanit_500Medium', // Fonte Kanit com peso 500
    },
    // Estilo para contêiner de dados de tarefa
    tarefaData: {
        flexDirection: 'row', // Itens alinhados horizontalmente
        alignItems: 'center', // Alinha itens ao centro verticalmente
    },
    // Estilo para ícone de estrela
    estrela: {
        width: 20, // Largura de 20
        height: 20 // Altura de 20
    },
    // Estilo para texto de tarefa
    txtTarefa: {
        color: '#f6f1a6', // Cor branca
        fontSize: 20, // Tamanho da fonte de 20
        marginLeft: 10, // Margem esquerda de 10
        marginTop: 5, // Margem superior de 5
        marginBottom: 5, // Margem inferior de 5
        fontFamily: 'Kanit_500Medium', // Fonte Kanit com peso 500
    },
    // Estilo para texto de informação
    txtInfo: {
        fontSize: 15, // Tamanho da fonte de 15
        width: 200, // Largura de 200
        marginLeft: 30, // Margem esquerda de 30
        marginBottom: 10, // Margem inferior de 10
        fontFamily: 'Kanit_500Medium', // Fonte Kanit com peso 500
    },
    // Estilo para texto de hora
    txtHora: {
        fontSize: 15, // Tamanho da fonte de 15
        fontFamily: 'Kanit_500Medium', // Fonte Kanit com peso 500
    },
    // Estilo para contêiner de informações de tarefa
    infoTarefa: {
        flexDirection: 'row', // Itens alinhados horizontalmente
    },
    // Estilo para o contêiner principal
    container: {
        flex: 1, // Ocupa toda a tela
        width: '80%', // Largura igual a 80% da tela
    },
    // Estilo para o rodapé
    footer: {
        flexDirection: 'row', // Itens alinhados horizontalmente
        alignItems: 'center', // Alinha itens ao centro verticalmente
        justifyContent: 'space-between', // Espaço uniforme entre os itens
        width: '90%', // Largura igual a 90% do contêiner pai
        marginBottom: 10 // Margem inferior de 10
    },
    // Estilo para texto do rodapé
    txtRodape: {
        color: '#FAED27', // Cor amarela
        fontSize: 25, // Tamanho da fonte de 25
        fontFamily: 'Kanit_500Medium', // Fonte Kanit com peso 500
    },
    // Estilo para ícone de adição
    add: {
        width: 60, // Largura de 60
        height: 60 // Altura de 60
    },
    // Estilo para contêiner relacionado ao calendário
    goCalendario: {
        flexDirection: 'row', // Itens alinhados horizontalmente
        width: '55%', // Largura igual a 55% do contêiner pai
        justifyContent: 'space-around', // Espaço uniforme ao redor dos itens
        alignItems: 'center', // Alinha itens ao centro verticalmente
    },
    // Estilo para ícone de calendário
    iconeCalendario: {
        width: 40, // Largura de 40
        height: 40, // Altura de 40
    },
    // Estilo para o card de tarefa
    card: {
        minWidth: '90%',
        maxWidth: '90%',
        backgroundColor: '#c1c1c1',
        borderRadius: 8,
        padding: 16,
        marginBottom: 25,
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 10,
        alignSelf: 'center',
    },
    // Estilo para o cabeçalho do card (título)
    cardHeader: {
        marginBottom: 10,
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    etiqueta: {
        width: 15, // Largura do quadrado da etiqueta
        height: 10, // Altura do quadrado da etiqueta
        borderRadius: 5, // Para deixar o quadrado com bordas arredondadas, se desejar
        marginRight: 8, // Espaço entre a etiqueta e o título
        color: '#333', // Cor do texto da etiqueta
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5, // Pode ser ajustado para um retângulo sem bordas arredondadas
        marginLeft: 10, // Espaço entre a etiqueta e o título

    },
    // Estilo para o corpo do card (descrição)
    cardBody: {
        marginBottom: 12,
        alignItems: 'center',
    },
    cardDescription: {
        fontSize: 16,
        color: '#696969',
    },
    // Estilo para o rodapé do card (data, hora, ícones)
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardFooterText: {
        fontSize: 14,
        color: '#696969',
    },
    // Estilo para os ícones no rodapé
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50, // Altura do contêiner para alinhar ícones verticalmente
    },
    icon: {
        marginBottom: 8,
    },
});