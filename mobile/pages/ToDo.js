import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, FlatList, Alert, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/StylesToDo';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import MenuScreen from '../components/Menu';
import { Feather } from '@expo/vector-icons';
import Formulario from './Formulario.js';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localização em português
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

moment.locale('pt-br'); // Configura moment para usar português

/**
 * Nome do Componente: ToDo
 *
 * Descrição Detalhada:
 *   Componente principal para a lista de tarefas. Permite a filtragem das tarefas por texto de busca
 *   e data selecionada, além de exibir um calendário para seleção da data. Utiliza o componente
 *   'DateTimePicker' para escolher a data e o formato de data localizado em português.
 *
 * Estados:
 *   - searchText: Texto de busca para filtrar as tarefas por palavra-chave.
 *   - date: Data selecionada para filtrar as tarefas por dia.
 *   - showDatePicker: Controla a visibilidade do componente 'DateTimePicker'.
 *
 * Funções:
 *   - showDatePickerHandler: Mostra o 'DateTimePicker' ao ser chamado.
 *   - onDateChange: Atualiza a data selecionada quando o usuário escolhe uma nova data no 'DateTimePicker'.
 *
 * @param {object} navigation - Objeto de navegação para redirecionamento entre telas.
 * @returns {JSX.Element}
 */

export default function ToDo({ navigation, route }) {
  const [fontLoaded] = useFonts({ Kanit_500Medium });
  const isFocused = useIsFocused();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [mensagensErro, setMensagensErro] = useState([]);
  const [userId, setUserId] = useState(null);
  const [dataToCatchTarefas, setDataToCatchTarefas] = useState(route.params?.selectedDate);
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal de edição
  const [statusModalVisible, setStatusModalVisible] = useState(false); // Estado do modal de status
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa selecionada para edição
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // Estado do status selecionado

  useEffect(() => {
    setDataToCatchTarefas(route.params?.selectedDate);
  });
  // Função para buscar tarefas do servidor
  const fetchTarefas = async () => {
    const usuarioId = await AsyncStorage.getItem('ID');
    setUserId(usuarioId)
    try {
      const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acao: "carregar_tarefas", dados: { usuarioId, dataToCatchTarefas } }),
      });
      const resultado = (await resposta.json()).dados_tarefa;
      if (resposta.ok) {
        // Atualiza a estrutura para incluir o ID
        const tarefasRecebidas = resultado;
        const tarefasAtualizadas = tarefasRecebidas.map(tarefa => ({
          titulo: tarefa[0],
          etiqueta: tarefa[1],
          descricao: tarefa[2],
          data: tarefa[3],
          horario: tarefa[4],
          id: tarefa[5],
        }));
        setTarefas(tarefasAtualizadas);
        setFilteredTasks(tarefasAtualizadas);
      } else {
        console.error('Erro no servidor:', resultado.mensagens_erro);
        setMensagensErro(resultado.mensagens_erro || ['Erro ao obter mensagens de erro.']);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setMensagensErro(['Erro ao buscar dados.']);
    }
  };

  useEffect(() => {
    if (dataToCatchTarefas) {
      fetchTarefas();
    }
  }, [dataToCatchTarefas]);

  useEffect(() => {
    if (isFocused) {
      if (route.params?.selectedDate) {
        const selectedDate = new Date(route.params.selectedDate);
        selectedDate.setMinutes(selectedDate.getMinutes() + selectedDate.getTimezoneOffset());
        setDate(selectedDate);
      }
      // Função se houver uma nova tarefa passada como parâmetro
      if (route.params?.novaTarefa) {
        const novaTarefa = route.params.novaTarefa;
        fetchTarefas();
      }
    }
  }, [isFocused, route.params?.selectedDate, route.params?.novaTarefa]);

  useEffect(() => {
    if (isFocused) {
      if (route.params?.selectedDate) {
        const selectedDate = new Date(route.params.selectedDate);
        selectedDate.setMinutes(selectedDate.getMinutes() + selectedDate.getTimezoneOffset());
        setDate(selectedDate);

        // Filtra as tarefas já salvas com base na data selecionada
        const tarefasFiltradas = tarefas.filter(tarefa => moment(tarefa.data).isSame(selectedDate, 'day'));
        setFilteredTasks(tarefasFiltradas);
      }
    }
  }, [isFocused, route.params?.selectedDate, tarefas]);

  // Função para mostrar o DateTimePicker
  const showDatePickerHandler = () => setShowDatePicker(true);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // Função para excluir tarefa
  const excluirTarefa = async (id) => {
    try {
      // Solicita confirmação ao usuário
      Alert.alert(
        'Confirmação',
        'Você tem certeza que deseja excluir esta tarefa?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            onPress: async () => {
              try {
                const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ dados: { tarefaId: id }, acao: 'excluirTarefa' }),
                });
                if (resposta.ok) {
                  Alert.alert('Sucesso', 'Tarefa excluída com sucesso');
                  // Atualiza a lista de tarefas após exclusão
                  const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
                  setTarefas(novasTarefas);
                  // Atualiza o filtro das tarefas
                  const tarefasFiltradas = novasTarefas.filter(tarefa => moment(tarefa.data).isSame(date, 'day'));
                  setFilteredTasks(tarefasFiltradas);
                } else {
                  console.error('Erro ao excluir tarefa:', await resposta.text());
                }
              } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao solicitar confirmação de exclusão:', error);
    }
  };

  const openEditModal = (task) => {
    const formatDate = (date) => {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    };
    setSelectedTask({
      ...task,
      data: task.data ? formatDate(task.data) : ''
    });
    setEditedTitle(task.titulo);
    setEditedDescription(task.descricao);
    setModalVisible(true);
  };

  // Disparar a função fetchCategoriasETarefas toda vez que a variável 'refresh' for alterada;
  const handleAddNewTask = () => {
    setSelectedTask(null);
    setModalVisible(true);
  };

  const saveEdit = async () => {
    if (!editedTitle) {
      Alert.alert('Erro', 'O título não pode estar vazio.');
      return;
    }

    const response = await fetch('http://10.135.60.24:8085/receber-dados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acao: 'editarTarefa', dados: { id: selectedTask.id, titulo: editedTitle, descricao: editedDescription } }),
    });

    if (response.ok) {
      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso');
      const updatedTasks = tarefas.map(task =>
        task.id === selectedTask.id ? { ...task, titulo: editedTitle, descricao: editedDescription } : task
      );
      setTarefas(updatedTasks);
      setFilteredTasks(updatedTasks.filter(task => moment(task.data).isSame(date, 'day')));
      setModalVisible(false);
    } else {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  // Função para abrir o modal de status
  const openStatusModal = (task) => {
    if (task) {
      setSelectedTask(task); // Defina a tarefa selecionada
      setStatusModalVisible(true);
    } else {
      console.error('Nenhuma tarefa foi passada para selecionar o status.');
    }
  };
  // Função para fechar o modal de status
  const closeStatusModal = () => {
    setStatusModalVisible(false);
  };

  // Função para selecionar o status e atualizar no servidor
  const selectStatus = async (status) => {
    setSelectedStatus(status); // Atualiza o estado do status localmente
    setStatusModalVisible(false); // Fecha o modal de status

    if (!selectedTask) {
      console.error('Nenhum status selecionada.');
      return;
    }
    console.log(status)
    try {
      // Envia o status atualizado para o servidor
      const response = await fetch('http://10.135.60.24:8085/receber-dados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acao: 'atualizar_status_tarefa', // Ação para atualizar o status
          dados: {
            id: selectedTask.id,
            status: status, // O novo status selecionado
          },
        }),
      });

      const resultado = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Status da tarefa atualizado com sucesso');

        // Atualiza a tarefa com o novo status localmente
        const updatedTasks = tarefas.map((task) =>
          task.id === selectedTask.id ? { ...task, status: status } : task
        );

        setTarefas(updatedTasks);
        setFilteredTasks(updatedTasks.filter((task) => moment(task.data).isSame(date, 'day')));
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o status da tarefa.');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      Alert.alert('Erro', 'Erro ao atualizar status. Tente novamente.');
    }
  };


  return (
    <View style={styles.background}>
      <MenuScreen />
      <View style={styles.containerMenu}>
        <Text style={styles.txtData}>{moment(date).format('DD [DE] MMMM [DE] YYYY').toUpperCase()}</Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {tarefas && tarefas.length > 0 ? (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => {
            const { id, titulo = 'Título não informado', descricao = '', data = '', horario = '', etiqueta = 'Nenhuma' } = item;

            const corEtiqueta = etiqueta === 'Importante' ? 'red' :
              etiqueta === 'Pendência' ? 'orange' :
                etiqueta === 'Reunião' ? 'blue' :
                  'transparent';

            return (
              <View style={styles.card} key={id}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{titulo}</Text>
                  <View style={[styles.etiqueta, { backgroundColor: corEtiqueta }]} />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardDescription}>
                    {descricao && descricao.trim().length > 0
                      ? descricao
                      : 'Aqui vai a descrição da tarefa, se houver.'}
                  </Text>
                </View>
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardFooterText}>{data || 'Data não informada'}</Text>
                    <Text style={styles.cardFooterText}>{horario || 'Horário não informado'}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.editar} onPress={() => openEditModal(item)}>
                      <Feather name="edit" size={24} color="#faed27" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => excluirTarefa(id)}>
                      <Feather name="trash-2" size={24} color="#FF6347" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openStatusModal}>
                      <Feather name="more-vertical" size={24} color="black" style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text>Nenhuma tarefa encontrada</Text>
      )}

      {/* Modal de Status */}
      <Modal visible={statusModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Status</Text>
            <TouchableOpacity onPress={() => selectStatus('Em andamento')}>
              <Text style={[styles.modalText, styles.statusButton]}>Em andamento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectStatus('Finalizado')}>
              <Text style={[styles.modalText, styles.statusButton]}>Finalizado</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectStatus('Pausada')}>
              <Text style={[styles.modalText, styles.statusButton]}>Pausada</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeStatusModal} style={styles.button}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />


      <View style={styles.containerbtn}>
        <TouchableOpacity
          style={styles.btnAdicionarTarefa}
          onPress={handleAddNewTask}
        >
          <Text style={styles.btnText}>Nova tarefa</Text>
        </TouchableOpacity>
      </View>

      <Formulario
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        userId={userId}
        selectedTask={selectedTask}
        refreshTasks={fetchTarefas}
      />
    </View>
  );
}
