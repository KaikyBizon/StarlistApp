/**
 * Nome do Componente: KanBan
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que implementa uma interface Kanban para gerenciamento de tarefas baseadas em datas. Utiliza o 'react-native-calendars' para permitir a navegação e seleção de datas, e um seletor de data para escolha do dia. As tarefas são listadas e filtradas com base na data selecionada e no texto de busca.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar a data selecionada, exibição do seletor de data, e texto de busca.
 *   2. Carrega a fonte 'Kanit_500Medium' para o estilo do texto.
 *   3. Usa o 'moment' para manipulação de datas e formatação.
 *   4. O componente 'DateTimePicker' permite que o usuário selecione uma data.
 *   5. O estado 'filteredTarefas' é calculado com base na data selecionada e no texto de busca para exibir as tarefas relevantes.
 *
 * Estado:
 *   - date: Armazena a data selecionada pelo usuário.
 *   - showDatePicker: Controla a visibilidade do seletor de data.
 *   - searchText: Texto digitado pelo usuário para buscar tarefas.
 *
 * Funções:
 *   - showDatePickerHandler: Exibe o seletor de data.
 *   - onDateChange: Atualiza a data selecionada quando o usuário escolhe uma data no 'DateTimePicker'.
 *
 * Estrutura JSX:
 *   - Exibe um calendário e permite selecionar uma data.
 *   - Lista as tarefas do dia selecionado, com filtragem baseada no texto de busca.
 *   - Integra um componente de menu para navegação adicional na aplicação.
 *   - Mostra um seletor de data quando necessário.
 *
 * @returns {JSX.Element}
 */

import React, { useState } from 'react';
import { StatusBar, Animated, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localização em português
import styles from '../styles/StylesKanBan';
import MenuScreen from '../components/Menu';

moment.locale('pt-br'); // Configura moment para usar português

export default function KanBan() {
  // Carregamento da fonte Kanit_500Medium
  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  // Estado para a data selecionada
  const [date, setDate] = useState(new Date());
  // Estado para controle da exibição do seletor de data
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Estado para armazenar o texto de busca
  const [searchText, setSearchText] = useState('');


  // Lista de tarefas para diferentes datas
  const tarefas = [
    {
      date: '28/03/2024',
      items: [
        { id: '1', info: 'ESTUDAR QUÍMICA', hora: '14:00' },
        { id: '2', info: 'MAPA MENTAL', hora: '15:00' }
      ],
    },
    {
      date: '29/03/2024',
      items: [
        { id: '3', info: 'MÉDICO', hora: '18:00' },
        { id: '4', info: 'PASSEAR', hora: '20:00' }
      ],
    },
    {
      date: '01/04/2024',
      items: [
        { id: '5', info: 'REUNIÃO', hora: '09:00' }
      ],
    },
  ];

  // Condicional para evitar rendering enquanto a fonte não estiver carregada
  if (!fontLoaded) {
    return null;
  }

  {/*
        Nome da função: filteredTarefas;
        Autor: Kaiky;
        Data de criação: 05/24;
        Parametros de entrada: tarefas (array de objetos), searchText (string), date (data);
        Retorno: array de objetos filtrados;
        Finalidade: Filtrar tarefas baseadas em texto de busca e data;
        Descrição/observações:
            Esta função realiza duas etapas de filtragem sobre uma lista de tarefas:
            1. **Filtragem de Itens**: Para cada tarefa, ela cria um novo objeto onde apenas os itens cujo texto associado (`item.info`) contenha o texto de busca (`searchText`) são incluídos. A busca é feita de forma case-insensitive, garantindo que maiúsculas e minúsculas não afetem a correspondência.
            2. **Filtragem de Tarefas**: Em seguida, o array resultante de tarefas é filtrado para incluir apenas aquelas cujo array `items` não esteja vazio e cuja data seja igual à data formatada no formato 'DD/MM/YYYY'.
            Esse processo permite que apenas as tarefas relevantes sejam retornadas, considerando tanto o conteúdo dos itens quanto a data da tarefa, conforme especificado.
    */}
  const filteredTarefas = tarefas.map(tarefa => ({
    ...tarefa,
    items: tarefa.items.filter(item =>
      item.info.toLowerCase().includes(searchText.toLowerCase())
    )
  })).filter(tarefa => tarefa.items.length > 0 && tarefa.date === moment(date).format('DD/MM/YYYY'));

  // Função para mostrar o seletor de data
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // Callback para quando a data é alterada no DateTimePicker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.background}>
      {/* Componente MenuScreen para o menu da aplicação */}
      <MenuScreen searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.containerMenu}>
        {/* Botão para abrir o seletor de data */}
        <TouchableOpacity onPress={showDatePickerHandler}>
          <Feather size={32} name="calendar" />
        </TouchableOpacity>
        {/* Exibe a data formatada */}
        <Text style={styles.txtData}>{moment(date).format('DD [DE] MMMM [DE] YYYY').toUpperCase()}</Text>
      </View>
      {/* ScrollView para exibir as tarefas */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {/* Renderiza as tarefas filtradas */}
        {filteredTarefas.map(tarefa => (
          <View key={tarefa.date} style={styles.tarefa}>
            <View style={styles.tarefaData}>
              <Text style={styles.txtTarefa}>TAREFA</Text>
            </View>
            {tarefa.items.map(item => (
              <View key={item.id} style={styles.infoTarefa}>
                <View style={styles.detalheTarefa}>
                  <Text style={styles.txtInfo}>{item.info}</Text>
                </View>
                <View style={styles.barraVert} />
                <View style={styles.dataTarefa}>
                  <Text style={styles.txtInfo}>Hora</Text>
                  <Text style={styles.txtHora}>{item.hora}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      {/* Exibe o seletor de data se estiver ativo */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}
