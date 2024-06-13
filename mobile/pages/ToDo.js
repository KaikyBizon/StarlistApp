import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/StylesToDo';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import MenuScreen from '../components/Menu';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localização em português

moment.locale('pt-br'); // Configura moment para usar português

export default function ToDo({ navigation }) {
  // Carrega a fonte Kanit_500Medium usando o hook useFonts do Expo
  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  // Estados para o texto de busca, data selecionada e visibilidade do DateTimePicker
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Lista de tarefas com data e itens
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

  // Verifica se a fonte foi carregada, caso contrário retorna null para evitar renderização prematura
  if (!fontLoaded) {
    return null;
  }

  // Filtra as tarefas de acordo com o texto de busca e a data selecionada
  const filteredTarefas = tarefas.map(tarefa => ({
    ...tarefa,
    items: tarefa.items.filter(item =>
      item.info.toLowerCase().includes(searchText.toLowerCase())
    )
  })).filter(tarefa => tarefa.items.length > 0 && tarefa.date === moment(date).format('DD/MM/YYYY'));

  // Renderiza cada tarefa na lista
  const renderTarefa = ({ item }) => (
    <View style={styles.tarefa}>
      <View style={styles.tarefaData}>
        <Image style={styles.estrela} resizeMode='contain' source={require('../assets/images/estrela.png')} />
        <Text style={styles.txtTarefa}>{item.date}</Text>
      </View>
      {item.items.map(subItem => (
        <View key={subItem.id} style={styles.infoTarefa}>
          <Text style={styles.txtInfo}>{subItem.info}</Text>
          <Text style={styles.txtHora}>{subItem.hora}</Text>
        </View>
      ))}
    </View>
  );

  // Função para mostrar o DateTimePicker
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // Função chamada quando a data é alterada no DateTimePicker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.background}>
      {/* Componente Menu para busca */}
      <MenuScreen searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.containerMenu}>
        {/* Botão para abrir o DateTimePicker */}
        <TouchableOpacity onPress={showDatePickerHandler}>
          <Feather size={32} name="calendar" />
        </TouchableOpacity>
        {/* Mostra a data formatada */}
        <Text style={styles.txtData}>{moment(date).format('DD [DE] MMMM [DE] YYYY').toUpperCase()}</Text>
      </View>
      {/* Lista de tarefas filtradas */}
      <FlatList
        data={filteredTarefas}
        renderItem={renderTarefa}
        keyExtractor={(item) => item.date}
      />
      {/* DateTimePicker para selecionar a data */}
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
