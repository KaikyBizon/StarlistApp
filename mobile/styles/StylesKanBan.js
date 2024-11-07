import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#222',
    color: '#FAED27',
    borderRadius: 5,
    borderColor: '#faed27',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  btnAdcList: {
    backgroundColor: '#faed27',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 15,
    color: '#222',
  },
  categoriaContainer: {
    marginRight: 16,
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    width: 245,
  },
  tarefasContainer: {
    flexDirection: 'column',
  },
  tituloLista: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#faed27',
    marginBottom: 5,
  },
  tarefaItem: {
    padding: 8,
    backgroundColor: '#222',
    borderRadius: 4,
    marginBottom: 10,
  },
  tituloTarefa: {
    fontSize: 16,
    color: '#FDF9B4',
  },
  dataHora: {
    fontSize: 12,
    color: 'gray',
  },
  btnAdicionarTarefa: {
    backgroundColor: '#faed27',
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Espaço entre os botões
  },
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
    width: 70,
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
  excluirLista: {
    width: 30, // Largura da imagem da lixeira
    height: 30, // Altura da imagem da lixeira
  },
  modalExcluirLista: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalDeleteList: {
    backgroundColor: '#222', // Define a cor de fundo do modal
    padding: 20,
    borderRadius: 8,
    width: '80%', // Torna o modal responsivo na largura
    maxWidth: 400, // Define uma largura máxima
    alignItems: 'center',
  },
  buttonDeleteList: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaço entre os botões
    width: '100%', // Garante que os botões ocupem a largura total do modal
    paddingHorizontal: 10,
  },
  btnDelete: {
    backgroundColor: '#faed27',
    padding: 12,
    borderRadius: 5,
    width: '45%', // Ajusta para garantir espaço uniforme
    alignItems: 'center',
    marginRight: 5,
  },
  btnFechar: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    marginLeft: 5,
  },
  modalTextList: {
    fontSize: 16,
    color: '#FFF88E',
    marginBottom: 20,
    textAlign: 'center',
  },
  btnTextExcluirList: {
    color: '#222',
    fontSize: 14,
  },
  modalText: {
    fontSize: 18,
    color: '#FFF88E',
    marginBottom: 20,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha verticalmente os botões
    justifyContent: 'space-between', // Espaço entre os botões
    marginTop: 10, // Adiciona um espaço acima se necessário
  },
  categoriaLista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8, // ajuste conforme necessário
    width: '100%', // para ocupar toda a largura disponível
  },
  editarLista: {
    width: 24, // ajuste o tamanho conforme necessário
    height: 24,
    marginLeft: 8,
    alignSelf: 'flex-end',
  },
  modalContainerList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentList: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitleList: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputModalList: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 5,
  },
  modalButtonsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnConfirmList: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  btnCancelList: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  btnTextList: {
    color: 'white',
    fontWeight: 'bold',
  },
  editarTask: {
    width: 20,
    height: 20,
    marginLeft: 10, // Espaço entre os ícones
  },
  excluirTask: {
    width: 20,
    height: 20,
    marginLeft: 10, // Espaço entre os ícones
  },
  tarefaRow: {
    flexDirection: 'row', // Alinha os elementos na horizontal
    justifyContent: 'space-between', // Distribui o espaço entre os itens
    alignItems: 'center', // Alinha verticalmente os itens
  },
  editarDeleteTask: {
    flexDirection: 'row', // Coloca os ícones lado a lado
    alignItems: 'center', // Alinha os ícones verticalmente
  },
  modalContainerList: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido para o modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContenList: {
    width: '80%',
    padding: 20,
    backgroundColor: '#333', // Cor de fundo do modal
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center',
  },
  modalTitleList: {
    fontSize: 16,
    marginBottom: 15,
    color: '#999',
  },
  inputModalList: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtonsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnConfirmList: {
    backgroundColor: '#FAED27', // Cor de fundo para o botão de confirmar
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  btnCancelList: {
    backgroundColor: '#F44336', // Cor de fundo para o botão de cancelar
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  btnTextList: {
    color: '#222',
    fontWeight: 'bold',
  },
});
export default styles;