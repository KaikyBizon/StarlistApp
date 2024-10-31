import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/StylesToDo';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import MenuScreen from '../components/Menu';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localização em português
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

moment.locale('pt-br');// Configura moment para usar português

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
  const isFocused = useIsFocused(); // Verifica se a tela está focada

  // Estados para as tarefas buscadas no banco, data selecionada e visibilidade do DateTimePicker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [mensagensErro, setMensagensErro] = useState([]);
  const [dataToCatchTarefas, setDataToCatchTarefas] = useState(route.params?.selectedDate);


  useEffect(() => {
    setDataToCatchTarefas(route.params?.selectedDate);
  });

  // Função para buscar tarefas do servidor
  const fetchTarefas = async () => {
    const usuarioId = await AsyncStorage.getItem('ID');
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

        // Verifica se a nova tarefa já existe na lista para evitar duplicação
        const tarefaExistente = tarefas.find(
          (tarefa) => tarefa.titulo === novaTarefa.titulo && tarefa.data === novaTarefa.data && tarefa.horario === novaTarefa.horario
        );
        fetchTarefas()
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

  // Função chamada quando a data é alterada no DateTimePicker
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
                  body: JSON.stringify({ dados: id, acao: 'excluirTarefa' }),
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


  return (
    <View style={styles.background}>
      {/* Componente Menu para busca */}
      <MenuScreen />
      {/* Mostra o DateTimePicker e a data formatada */}
      <View style={styles.containerMenu}>
        <TouchableOpacity onPress={showDatePickerHandler}>
          <Feather size={32} name="calendar" />
        </TouchableOpacity>
        {/* Mostra a data formatada */}
        <Text style={styles.txtData}>{moment(date).format('DD [DE] MMMM [DE] YYYY').toUpperCase()}</Text>
      </View>

      {/* DateTimePicker para selecionar a data */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Lista de tarefas */}
      {tarefas && tarefas.length > 0 ? (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => `${item.id}`}  // Usando apenas o ID como chave
          renderItem={({ item }) => {
            // Garantindo que todas as propriedades estejam acessíveis
            const { id, titulo = 'Título não informado', descricao = '', data = '', horario = '', etiqueta = 'Nenhuma' } = item;

            // Exibindo valores padrão caso estejam faltando
            const tituloExibido = titulo || 'Título não informado';
            const dataExibida = data && data !== '0000-00-00' ? data : 'Data não informada';
            const horarioExibido = horario && horario !== '00:00' ? horario : 'Horário não informado';

            // Definindo a cor da etiqueta com base no valor
            const corEtiqueta = etiqueta === 'Importante' ? 'red' :
              etiqueta === 'Pendência' ? 'orange' :
                etiqueta === 'Reunião' ? 'blue' :
                  'transparent';

            return (
              <View style={styles.card} key={id}>
                {/* Cabeçalho do card */}
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{tituloExibido}</Text>
                  <View style={[styles.etiqueta, { backgroundColor: corEtiqueta }]} />
                </View>

                {/* Corpo do card - descrição */}
                <View style={styles.cardBody}>
                  <Text style={styles.cardDescription}>
                    {descricao && descricao.trim().length > 0
                      ? descricao
                      : 'Aqui vai a descrição da tarefa, se houver.'}
                  </Text>
                </View>

                {/* Rodapé do card */}
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardFooterText}>{dataExibida}</Text>
                    <Text style={styles.cardFooterText}>{horarioExibido}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.editar}>
                      <Feather name="edit" size={24} color="#4682B4" style={styles.icon} onPress={() => navigation.navigate('NOVA TAREFA')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => excluirTarefa(id)}>
                      <Feather name="trash-2" size={24} color="#FF6347" style={styles.icon} />
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


      <StatusBar style="auto" />
    </View>
  );
}