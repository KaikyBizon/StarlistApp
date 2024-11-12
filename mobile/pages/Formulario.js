import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/StylesFormulario.js';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

function Formulario({ modalVisible, setModalVisible, userId, listaId }) {
  const [tarefaNome, setTarefaNome] = useState('');
  const [tarefaData, setTarefaData] = useState('');
  const [tarefaHorario, setTarefaHorario] = useState('');
  const [tarefaEtiqueta, setTarefaEtiqueta] = useState('');
  const [tarefaDescricao, setTarefaDescricao] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [refresh, setRefresh] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateToYMD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (mode === 'date') {
        setTarefaData(formatDateToYMD(selectedDate));
      } else {
        setTarefaHorario(formatTime(selectedDate));
      }
      setDate(selectedDate);
    }
  };

  const handleAddTask = async () => {
    if (!tarefaNome.trim() || !tarefaDescricao || !tarefaData || !tarefaHorario || !tarefaEtiqueta ) {
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
        setTarefaNome('');
        setTarefaData('');
        setTarefaHorario('');
        setTarefaEtiqueta('');
        setTarefaDescricao('');
        setModalVisible(false); // Fechar o modal após adicionar a tarefa
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };
  

  return (
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
          {/* Data e Hora */}
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
            <TouchableOpacity onPress={handleAddTask} style={styles.btnSalvar}>
              <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancelar}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default Formulario;
