import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/StylesToDo';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import MenuScreen from '../components/Menu';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      const usuarioId = await AsyncStorage.getItem('ID');
      console.log(usuarioId)
      try {
        const resposta = await fetch('http://10.135.60.7:8085/receber-dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario_id: usuarioId })
        });
        const resultado = (await resposta.json()).dados_processados.dados_tarefa;
        console.log(resultado)

        if (resposta.ok) {
          setTarefas(resultado);
        } else {
          console.error('Erro no servidor:', resultado.mensagens_erro);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchTarefas();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const filteredTarefas = (tarefas && tarefas.length > 0) ? tarefas : [];

  const filteredData = filteredTarefas.map(tarefa => ({
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
          <Feather size={32} name="calendar" />
        </TouchableOpacity>
        <Text style={styles.txtData}>{moment(date).format('DD [DE] MMMM [DE] YYYY').toUpperCase()}</Text>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderTarefa}
        keyExtractor={(item) => item.date}
        ListEmptyComponent={<Text style={styles.txtInfo}>Nenhuma tarefa encontrada para essa data.</Text>}
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
