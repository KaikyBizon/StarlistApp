import React, { useState, useEffect } from 'react';
import styles from '../styles/StylesKanBan.js';
import { View, TextInput, TouchableOpacity, Alert, ScrollView, Text, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../components/Menu';
import Formulario from './Formulario.js';

function Kanban() {
  const [inputValue, setInputValue] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [tarefasPorCategoria, setTarefasPorCategoria] = useState({});
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [listaId, setListaId] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [listaParaExcluir, setListaParaExcluir] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [listaParaEditar, setListaParaEditar] = useState(null); // Estado para armazenar a lista a ser editada
  const [novoNomeLista, setNovoNomeLista] = useState(''); // Estado para o novo nome da lista
  const [editModalVisible, setEditModalVisible] = useState(false); // Novo estado para o modal de edição
  const [selectedTask, setSelectedTask] = useState(null);

  // Mover a função fetchCategoriasETarefas para fora do useEffect
  const fetchCategoriasETarefas = async () => {
    const usuario_id = await AsyncStorage.getItem('ID');
    console.log(usuario_id)
    setUserId(usuario_id);

    try {
      const resposta = await fetch(`http://10.135.60.23:8085/lista/${usuario_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const categoriasResultado = await resposta.json();
      console.log("Resultado:", categoriasResultado);

      if (resposta.ok) {
        setCategorias(categoriasResultado);

        const tarefasPromises = categoriasResultado.map(async (categoria) => {
          const tarefas = await fetchTarefasParaCategoria(categoria.id);
          return { [categoria.id]: tarefas };
        });

        const tarefasArray = await Promise.all(tarefasPromises);
        const tarefasMap = tarefasArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setTarefasPorCategoria(tarefasMap);
      } else {
        console.error('Erro ao buscar categorias:', categoriasResultado.mensagens_erro);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchCategoriasETarefas();
  }, [refresh]);

  const fetchTarefasParaCategoria = async (categoriaId) => {
    try {
      const resposta = await fetch(`http://10.135.60.23:8085/tarefas/${categoriaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        return resultado;
      } else {
        console.error('Erro ao buscar tarefas:', resultado.mensagens_erro);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      return [];
    }
  };

  const handleSubmit = async () => {
    console.log('usuario1:', userId)
    if (!inputValue.trim()) {
      Alert.alert('Erro', 'O nome da lista não pode estar vazio');
      return;
    }

    try {
      const resposta = await fetch('http://10.135.60.23:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acao: 'criar_lista',
          dados: {
            usuario_id: userId,
            nome: inputValue
          }
        }),
      });

      const resultado = (await resposta.json()).listaCriada;

      if (!resposta.ok || resultado.mensagens_erro) {
        Alert.alert('Erro', resultado.mensagens_erro);
      } else {
        setInputValue('');
        fetchCategoriasETarefas();
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };


  const confirmarExclusao = async () => {
    try {
      const resposta = await fetch(`http://10.135.60.23:8085/lista/${listaParaExcluir}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (resposta.ok) {
        // Filtra as categorias removendo a lista excluída
        setCategorias(categorias.filter(categoria => categoria.id !== listaParaExcluir));

        // Atualiza o estado das tarefas por categoria
        const novoTarefasPorCategoria = { ...tarefasPorCategoria };
        delete novoTarefasPorCategoria[listaParaExcluir];
        setTarefasPorCategoria(novoTarefasPorCategoria);

        Alert.alert('Sucesso', 'Lista excluída com sucesso!');
      } else {
        console.error('Erro ao excluir lista');
        Alert.alert('Erro', 'Não foi possível excluir a lista. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir lista:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a lista.');
    } finally {
      // Fecha o modal e redefine o estado de exclusão
      setConfirmDeleteModalVisible(false);
      setListaParaExcluir(null);
    }
  };

  const handleEditList = async () => {
    if (!novoNomeLista.trim()) {
      Alert.alert('Erro', 'O nome da lista não pode estar vazio');
      return;
    }

    try {
      const resposta = await fetch('http://10.135.60.23:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acao: 'editar_nome_lista',
          dados: {
            id: listaParaEditar, // ID da lista a ser editada
            nomeEditando: novoNomeLista // Novo nome da lista
          }
        }),
      });

      const resultado = (await resposta.json()).listaCriada;

      if (!resposta.ok || resultado.mensagens_erro) {
        Alert.alert('Erro', resultado.mensagens_erro);
      } else {
        fetchCategoriasETarefas(); // Atualiza a lista de categorias e tarefas
        setEditModalVisible(false); // Fecha o modal de edição
        setListaParaEditar(null); // Limpa o estado da lista a ser editada
        setNovoNomeLista(''); // Limpa o novo nome da lista
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task); // Define a tarefa selecionada
    setModalVisible(true);  // Abre o modal de edição
  };

  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da lista"
          placeholderTextColor="#FFF88E"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.btnAdcList}>
          <Text style={styles.btnText}>Adicionar lista</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        {categorias.map((categoria) => (
          <View key={categoria.id} style={styles.categoriaContainer}>
            <View style={styles.categoriaLista}>
              <Text style={styles.tituloLista}>{categoria.nome}</Text>
              <TouchableOpacity onPress={() => {
                setNovoNomeLista(categoria.nome); // Configura o novo nome da lista
                setListaParaEditar(categoria.id); // Define a lista a ser editada
                setEditModalVisible(true); // Abre o modal de edição
              }}>
                <Image source={require('../assets/images/editar_lista.png')} style={styles.editarLista} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.tarefasContainer}>
              {tarefasPorCategoria[categoria.id] && tarefasPorCategoria[categoria.id].map((tarefa, index) => (
                <View key={index} style={styles.tarefaItem}>
                  <View style={styles.editarDeleteTask}>
                    <Text style={styles.tituloTarefa}>{tarefa.titulo}</Text>
                    <TouchableOpacity onPress={() => handleEditTask(tarefa)}>
                      <Image source={require('../assets/images/editar_lista.png')} style={styles.editarTask} />
                    </TouchableOpacity>
                    <Image source={require('../assets/images/lixeira.png')} style={styles.excluirTask} />
                  </View>
                  <Text style={styles.dataHora}>Data: {tarefa.data}</Text>
                  <Text style={styles.dataHora}>Hora: {tarefa.horario}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.btnContainer}>
            <TouchableOpacity
                style={styles.btnAdicionarTarefa}
                onPress={() => {
                  setListaId(categoria.id);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.btnText}>Nova tarefa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setListaParaExcluir(categoria.id); // Define a lista a ser excluída
                  setConfirmDeleteModalVisible(true); // Abre o modal de confirmação
                }}
              >
                <Image source={require('../assets/images/lixeira.png')} style={styles.excluirLista} />
              </TouchableOpacity>
            </View>
          </View>

        ))}
      </ScrollView>

      {/* Modal de exclusão de lista completa*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={() => setConfirmDeleteModalVisible(false)}
      >
        <View style={styles.modalExcluirLista}>
          <View style={styles.modalDeleteList}>
            <Text style={styles.modalTextList}>Deseja mesmo excluir a lista e suas tarefas?</Text>
            <View style={styles.buttonDeleteList}>
              <TouchableOpacity onPress={confirmarExclusao} style={styles.btnDelete}>
                <Text style={styles.btnTextExcluirList}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirmDeleteModalVisible(false)} style={styles.btnFechar}>
                <Text style={styles.btnTextExcluirList}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Edição nome da lista*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainerList}>
          <View style={styles.modalContenList}>
            <Text style={styles.modalTitleList}>Editar Nome da Lista</Text>
            <TextInput
              style={styles.inputModalList}
              placeholder="Novo nome da lista"
              value={novoNomeLista}
              onChangeText={setNovoNomeLista}
            />
            <View style={styles.modalButtonsList}>
              <TouchableOpacity onPress={handleEditList} style={styles.btnConfirmList}>
                <Text style={styles.btnTextList}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.btnCancelList}>
                <Text style={styles.btnTextList}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Formulario
        visible={modalVisible}
        listaId={listaId}
        setModalVisible={setModalVisible}
        refresh={refresh}
        setRefresh={setRefresh}
        userId={userId} // Passando userId para o Formulario
      />
    </View>
  );
}

export default Kanban;