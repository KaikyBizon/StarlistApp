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
  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchText, setSearchText] = useState(''); // Estado para armazenar o texto de busca

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // Aqui podemos simplesmente monitorar ou usar os valores de gestureState diretamente
    },
    onPanResponderRelease: (event, gestureState) => {
      // Ajusta a data baseada no deslocamento horizontal (dx)
      if (gestureState.dx > 120) { // Deslizar para a esquerda
        setDate(moment(date).subtract(1, 'days').toDate());
      } else if (gestureState.dx < -120) { // Deslizar para a direita
        setDate(moment(date).add(1, 'days').toDate());
      }
    },
  });

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
          <Feather size={32} name="calendar" />
        </TouchableOpacity>
        <Text style={styles.txtData}>{moment(date).format('DD [DE] MMMM [DE] YYYY').toUpperCase()}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        {...panResponder.panHandlers}
      >
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
