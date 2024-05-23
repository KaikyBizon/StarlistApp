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
  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  if (!fontLoaded) {
    return null;
  }

  const filteredTarefas = tarefas.map(tarefa => ({
    ...tarefa,
    items: tarefa.items.filter(item => 
      item.info.toLowerCase().includes(searchText.toLowerCase())
    )
  })).filter(tarefa => tarefa.items.length > 0 && tarefa.date === moment(date).format('DD/MM/YYYY'));

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

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.background}>
      <MenuScreen searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.containerMenu}>
        <TouchableOpacity onPress={showDatePickerHandler}>
          <Feather size={32} name="calendar"/>
        </TouchableOpacity>
        <Text style={styles.txtData}>{moment(date).format('DD [DE] MMMM [DE] YYYY').toUpperCase()}</Text>
      </View>
      <FlatList
        data={filteredTarefas}
        renderItem={renderTarefa}
        keyExtractor={(item) => item.date}
      />
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
