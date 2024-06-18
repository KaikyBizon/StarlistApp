import React, { useState } from 'react';
import { StatusBar, PanResponder, Animated, View, ScrollView, TouchableOpacity, Text } from 'react-native';
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

  // Filtra as tarefas com base na data selecionada e no texto de busca
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
        {...panResponder.panHandlers} // Adiciona gestos ao ScrollView
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
