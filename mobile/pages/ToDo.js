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

export default function ToDo({ navigation }) {
  // Carrega a fonte Kanit_500Medium usando o hook useFonts do Expo
  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  // Estados para as tarefas buscadas no banco, data selecionada e visibilidade do DateTimePicker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [mensagensErro, setMensagensErro] = useState([]);

  // Função para buscar tarefas do servidor
  const fetchTarefas = async () => {
    const usuarioId = await AsyncStorage.getItem('ID');

    try {
      const resposta = await fetch('http://10.135.60.15:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario_id: usuarioId })
      });
      const resultado = await resposta.json();

      if (resposta.ok) {
        const tarefasRecebidas = resultado.dados_processados.dados_tarefa;

        // Atualiza a estrutura para incluir o ID
        const tarefasAtualizadas = tarefasRecebidas.map(tarefa => ({
          titulo: tarefa[0],
          etiqueta: tarefa[1],
          descricao: tarefa[2],
          data: tarefa[3],
          horario: tarefa[4],
          id: tarefa[3],
        }));

        const tarefasOrdenadas = ordenarTarefas(tarefasAtualizadas);
        setTarefas(tarefasOrdenadas);
        setFilteredTasks(tarefasOrdenadas);
      } else {
        console.error('Erro no servidor:', resultado.mensagens_erro);
        setMensagensErro(resultado.mensagens_erro || ['Erro ao obter mensagens de erro.']);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setMensagensErro(['Erro ao buscar dados.']);
    }
  };

  //Função para ordenar tarefas de acordo com a data mais próxima
  const ordenarTarefas = (tarefas) => {
    return tarefas.sort((a, b) => {
      const dataDateA = new Date(a.data);
      const dataDateB = new Date(b.data);

      if (dataDateA.getTime() !== dataDateB.getTime()) {
        return dataDateA - dataDateB;
      }

      if (a.horario && b.horario) {
        const [horaA, minutoA] = a.horario.split(':').map(Number);
        const [horaB, minutoB] = b.horario.split(':').map(Number);
        const tempoA = horaA * 60 + minutoA;
        const tempoB = horaB * 60 + minutoB;

        return tempoA - tempoB;
      }

      return (a.horario ? 0 : 1) - (b.horario ? 0 : 1);
    });
  };

  //Renderiza as tarefas do backend
  useEffect(() => {
    fetchTarefas();
  }, []);

  // Função para mostrar o DateTimePicker
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // Função chamada quando a data é alterada no DateTimePicker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    // Filtra as tarefas com base na data selecionada
    const tarefasFiltradas = tarefas.filter(tarefa => moment(tarefa.data).isSame(currentDate, 'day'));
    setFilteredTasks(tarefasFiltradas);
  };

  // Função para excluir tarefa
  const excluirTarefa = async (id) => {
    try {
      const resposta = await fetch(`http://10.135.60.15:8085/receber-dados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, acao: 'excluirTarefa' })
      });

      if (resposta.ok) {
        Alert.alert('Sucesso', 'Tarefa excluída com sucesso');
        // Atualiza a lista de tarefas após exclusão
        const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefas(novasTarefas);
        setFilteredTasks(novasTarefas);
      } else {
        console.error('Erro ao excluir tarefa:', await resposta.text());
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <View style={styles.background}>
      {/* Componente Menu para busca */}
      <MenuScreen />

      {/* Mostra o DateTimePicker e a data formatada */}
      <View style={styles.containerMenu}>
        {/* Botão para abrir o DateTimePicker */}
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
      {filteredTasks && filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const { id, titulo, data, horario, etiqueta = 'Nenhuma' } = item;
            const tituloExibido = titulo || 'Título não informado';
            const dataExibida = data && data !== '0000-00-00' ? data : 'Data não informada';
            const horarioExibido = horario && horario !== '00:00' ? horario : 'Horário não informado';

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
                    {item.descricao && item.descricao.trim().length > 0
                      ? item.descricao
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
                    <TouchableOpacity>
                      <Feather name="edit" size={24} color="#4682B4" style={styles.icon} />
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

      <StatusBar style="auto"/>
    </View>
  );
}
