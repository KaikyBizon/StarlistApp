import React, { useState, useEffect } from 'react';
import styles from '../styles/StylesKanBan.js';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Text, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../components/Menu';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

function Kanban() {
  const [inputValue, setInputValue] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [tarefasPorCategoria, setTarefasPorCategoria] = useState({});
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefaNome, setTarefaNome] = useState('');
  const [tarefaData, setTarefaData] = useState('');
  const [tarefaHorario, setTarefaHorario] = useState('');
  const [tarefaEtiqueta, setTarefaEtiqueta] = useState('');
  const [tarefaDescricao, setTarefaDescricao] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [listaId, setListaId] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [listaParaExcluir, setListaParaExcluir] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (mode === 'date') {
        setTarefaData(formatDate(selectedDate));
      } else {
        setTarefaHorario(formatTime(selectedDate));
      }
      setDate(selectedDate);
    }
  };
  

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

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
    console.log('usuario1:',userId)
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
          dados:{
            usuario_id: userId,
            nome: inputValue}
        }),
      });

      const resultado = (await resposta.json()).listaCriada;

      if (!resposta.ok || resultado.mensagens_erro) {
        Alert.alert('Erro', resultado.mensagens_erro);
      } else {
        setInputValue('');
        fetchCategoriasETarefas(); // Agora isso funciona
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleAddTask = async () => {
    if (!tarefaNome.trim() || !tarefaData || !tarefaHorario || !tarefaEtiqueta) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const resposta = await fetch('http://10.135.60.23:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acao: 'criar_tarefa',
          dados: {
            titulo: tarefaNome,
            descricao: tarefaDescricao,
            data: tarefaData,
            horario: tarefaHorario,
            etiqueta: tarefaEtiqueta,
            lista_id: listaId,
            usuario_id: userId,
          }
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok || resultado.mensagens_erro) {
        Alert.alert('Erro', resultado.mensagens_erro);
      } else {
        Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
        // Limpar os campos após adicionar a tarefa
        setTarefaNome('');
        setTarefaData('');
        setTarefaHorario('');
        setTarefaEtiqueta('');
        setTarefaDescricao('');
        setModalVisible(false);
        setRefresh(!refresh); // Atualiza a lista de tarefas
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

  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da lista"
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
            <Text style={styles.tituloLista}>{categoria.nome}</Text>
            <ScrollView style={styles.tarefasContainer}>
              {tarefasPorCategoria[categoria.id] && tarefasPorCategoria[categoria.id].map((tarefa, index) => (
                <View key={index} style={styles.tarefaItem}>
                  <Text style={styles.tituloTarefa}>{tarefa.titulo}</Text>
                  <Text style={styles.dataHora}>Data: {tarefa.data}</Text>
                  <Text style={styles.dataHora}>Hora: {tarefa.horario}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnAdicionarTarefa}
                onPress={() => {
                  setListaId(categoria.id); // Resgata o ID da lista
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}

      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.inputModal}
              placeholder="Nome da Tarefa"
              placeholderTextColor="#FFF88E"
              value={tarefaNome}
              onChangeText={setTarefaNome}
            />
            <View style={styles.dataTarefa}>
              <View style={styles.dateTimeContainer}>
                <TouchableOpacity
                  onPress={() => showMode("date")}
                  style={styles.buttonDateAndTime}
                >
                  <Text style={styles.buttonText}>Data: {tarefaData || 'Selecionar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => showMode("time")}
                  style={styles.buttonDateAndTime}
                >
                  <Text style={styles.buttonText}>Hora: {tarefaHorario || 'Selecionar'}</Text>
                </TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tarefaEtiqueta}
                style={styles.inputPicker}
                onValueChange={(itemValue) => setTarefaEtiqueta(itemValue)}
              >
                <Picker.Item label="Selecione uma etiqueta" value="" style={styles.etiqueta} />
                <Picker.Item label="Trabalho" value="Trabalho" />
                <Picker.Item label="Pessoal" value="Pessoal" />
                <Picker.Item label="Estudo" value="Estudo" />
              </Picker>
            </View>
            <TextInput
              style={styles.inputModal}
              placeholder="Descrição da Tarefa"
              placeholderTextColor="#FFF88E"
              value={tarefaDescricao}
              onChangeText={setTarefaDescricao}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleAddTask}
                style={styles.btnSalvar}
              >
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.btnCancelar}
              >
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

    </View>
  );
}

export default Kanban;