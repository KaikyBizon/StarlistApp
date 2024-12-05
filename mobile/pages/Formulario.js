import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/StylesFormulario.js';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

function Formulario({ modalVisible, onRequestClose, userId, listaId, selectedTask, refreshTasks }) {
  const [tarefaNome, setTarefaNome] = useState('');
  const [tarefaData, setTarefaData] = useState('');
  const [tarefaHorario, setTarefaHorario] = useState('');
  const [tarefaEtiqueta, setTarefaEtiqueta] = useState('');
  const [tarefaDescricao, setTarefaDescricao] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [refresh, setRefresh] = useState(false);
  const [mensagensErro, setMensagensErro] = useState([]); // Armazena as mensagens de erro retornadas do backend
  const [mostrarErros, setMostrarErros] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTarefaNome(selectedTask.titulo || '');
      setTarefaData(selectedTask.data ? formatDateToYMD(new Date(selectedTask.data)) : formatDateToYMD(new Date()));
      setTarefaHorario(selectedTask.horario || formatTime(new Date()));
      setTarefaEtiqueta(selectedTask.etiqueta || '');
      setTarefaDescricao(selectedTask.descricao || '');
    } else {
      setTarefaNome('');
      setTarefaData('');
      setTarefaHorario('');
      setTarefaEtiqueta('');
      setTarefaDescricao('');
    }
  }, [selectedTask]);

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

  const showDatePicker = () => {
    setMode('date');
    setShow(true);
  };

  const showTimePicker = () => {
    setMode('time');
    setShow(true);
  };

  const handleSubmit = async () => {
    setMostrarErros(true); // Ativa a exibição de erros ao tentar enviar
    if (!tarefaNome.trim() || !tarefaData || !tarefaHorario || !tarefaEtiqueta || !tarefaDescricao) {
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

      if (!resposta.ok || resultado.dados_tarefa.error) {
        const mensagensErro = resultado.dados_tarefa.mensagens_erro
          .map((erro, index) => `Erro ${index + 1}: ${erro.mensagem || JSON.stringify(erro)}`)
          .join('\n');

        Alert.alert('Erro', mensagensErro);
        setMensagensErro(resultado.dados_tarefa.mensagens_erro);
      } else {
        Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
        setTarefaNome('');
        setTarefaData('');
        setTarefaHorario('');
        setTarefaEtiqueta('');
        setTarefaDescricao('');
        onRequestClose();
        refreshTasks();
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro', 'Não foi possível criar a tarefa.');
    }
  };

  const handleUpdate = async () => {
    if (!tarefaNome.trim() || !tarefaData || !tarefaHorario || !tarefaEtiqueta || !tarefaDescricao) {
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
          acao: 'editar_tarefa',
          dados: {
            id: selectedTask.id,
            titulo: tarefaNome,
            descricao: tarefaDescricao,
            data: tarefaData,
            horario: tarefaHorario,
            etiqueta: tarefaEtiqueta,
            lista_id: listaId,
            usuario_id: userId,
          },
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok || resultado.dados_tarefa.error) {
        const mensagensErro = resultado.dados_tarefa.mensagens_erro
          .map((erro, index) => `Erro ${index + 1}: ${erro.mensagem || JSON.stringify(erro)}`)
          .join('\n');

        Alert.alert('Erro', mensagensErro);
        setMensagensErro(resultado.dados_tarefa.mensagens_erro);
      } else {
        Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
        onRequestClose();
        refreshTasks();
        setRefresh((prevState) => !prevState);
      }

    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
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
                onPress={showDatePicker}
                style={styles.buttonDateAndTime}
              >
                <Text style={styles.buttonText}>Data: {tarefaData || 'Selecionar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showTimePicker}
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
            <TouchableOpacity
              style={styles.btnSalvar}
              onPress={selectedTask ? handleUpdate : handleSubmit}
            >
              <Text style={styles.btnText}>
                {selectedTask ? 'Alterar Tarefa' : 'Adicionar Tarefa'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRequestClose} style={styles.btnCancelar}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          {mostrarErros && mensagensErro.length > 0 && (
            <View style={styles.errorContainer}>
              {mensagensErro.map((erro, index) => (
                <Text key={index} style={styles.errorMessage}>{erro.mensagem}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default Formulario;