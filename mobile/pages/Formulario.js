/**
 * Nome do Componente: Formulario
 *
 * Descrição Detalhada:
 *   Componente funcional React Native para gerenciar a criação e edição de tarefas em um sistema de lista de tarefas.
 *   Exibe um modal com inputs para o preenchimento de informações como título, data, hora, etiqueta e descrição da tarefa.
 *   Permite adicionar novas tarefas ou atualizar tarefas existentes com integração ao backend.
 *
 * Observações Pertinentes:
 *   . Utiliza os hooks `useState` e `useEffect` para gerenciar o estado dos campos do formulário e inicializar valores ao editar uma tarefa.
 *   . A comunicação com o backend é feita via `fetch` para enviar e atualizar os dados das tarefas.
 *   . Inclui validações para garantir que todos os campos obrigatórios estejam preenchidos antes do envio.
 *   . Exibe mensagens de erro específicas retornadas pelo backend, quando aplicável.
 *   . Integra o `DateTimePicker` para seleção de data e hora e o `Picker` para seleção de etiquetas.
 *
 * Estado:
 *   - `tarefaNome`: Armazena o título da tarefa.
 *   - `tarefaData`: Armazena a data da tarefa no formato YYYY-MM-DD.
 *   - `tarefaHorario`: Armazena o horário da tarefa no formato HH:mm.
 *   - `tarefaEtiqueta`: Armazena a etiqueta selecionada para a tarefa.
 *   - `tarefaDescricao`: Armazena a descrição da tarefa.
 *   - `date`: Objeto `Date` usado pelo `DateTimePicker` para gerenciar a seleção de data/hora.
 *   - `show`: Controla a exibição do `DateTimePicker`.
 *   - `mode`: Define o modo do `DateTimePicker` (data ou hora).
 *   - `mensagensErro`: Lista de mensagens de erro retornadas pelo backend.
 *   - `mostrarErros`: Controla a exibição das mensagens de erro no formulário.
 *
 * Funções:
 *   - `handleSubmit`: Envia os dados da tarefa para o backend para criar uma nova tarefa.
 *   - `handleUpdate`: Atualiza os dados da tarefa existente no backend.
 *   - `onChange`: Gerencia a seleção de data e hora no `DateTimePicker`.
 *   - `showDatePicker`: Exibe o seletor de data.
 *   - `showTimePicker`: Exibe o seletor de hora.
 *   - `formatDateToYMD`: Formata uma data no formato YYYY-MM-DD.
 *   - `formatTime`: Formata um horário no formato HH:mm.
 *
 * Estrutura JSX:
 *   - Modal que encapsula os inputs para nome, data, hora, etiqueta e descrição da tarefa.
 *   - Botões para salvar ou cancelar a operação.
 *   - Exibição opcional de mensagens de erro retornadas pelo backend.
 */

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

  {/*
    Nome da função: useEffect;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: [selectedTask];
    Retorno: Nenhum retorno explícito;
    Finalidade: Atualizar os valores dos campos do formulário com base na tarefa selecionada ou limpar os campos caso nenhuma tarefa esteja selecionada;
    Descrição/observações:
        - É chamado sempre que `selectedTask` é alterado;
        - Utilizado para preencher os inputs do formulário com os dados da tarefa sendo editada ou iniciar os inputs vazios para uma nova tarefa.
*/}

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

  {/*
    Nome da função: formatTime;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: date (Date);
    Retorno: String representando o horário no formato "HH:mm";
    Finalidade: Formatar o objeto `Date` recebido em uma string de horário no padrão brasileiro;
    Descrição/observações:
        - Utilizado para exibir horários formatados nos inputs e para enviar ao backend.
*/}

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  {/*
    Nome da função: formatDateToYMD;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: date (Date);
    Retorno: String representando a data no formato "YYYY-MM-DD";
    Finalidade: Converter o objeto `Date` recebido em uma string no formato esperado pelo backend;
    Descrição/observações:
        - É importante para padronizar o envio das datas ao backend e para exibição no frontend.
*/}

  const formatDateToYMD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  {/*
    Nome da função: onChange;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: event (Evento do DateTimePicker), selectedDate (Date);
    Retorno: Nenhum retorno explícito;
    Finalidade: Atualizar os valores de data ou horário com base na seleção feita pelo usuário no DateTimePicker;
    Descrição/observações:
        - Define o estado `tarefaData` ou `tarefaHorario` dependendo do modo atual ('date' ou 'time');
        - Atualiza o estado `date` com o valor selecionado.
*/}

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

  {/*
    Finalidade: Configurar o modo do DateTimePicker para 'date' e exibi-lo;
    Descrição/observações:
        - Acionado quando o usuário clica no botão de seleção de data.
*/}

  const showDatePicker = () => {
    setMode('date');
    setShow(true);
  };

  {/*
    Finalidade: Configurar o modo do DateTimePicker para 'time' e exibi-lo;
    Descrição/observações:
        - Acionado quando o usuário clica no botão de seleção de horário.
*/}

  const showTimePicker = () => {
    setMode('time');
    setShow(true);
  };

  {/*
    Nome da função: handleSubmit;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: Nenhum;
    Retorno: Nenhum retorno explícito;
    Finalidade: Enviar os dados da nova tarefa para o backend e tratar os possíveis erros de validação;
    Descrição/observações:
        - Verifica se todos os campos obrigatórios estão preenchidos antes do envio;
        - Faz uma requisição POST para criar uma nova tarefa;
        - Atualiza a lista de tarefas no frontend ao concluir com sucesso.
*/}

  const handleSubmit = async () => {
    setMostrarErros(true); // Ativa a exibição de erros ao tentar enviar
    if (!tarefaNome.trim() || !tarefaData || !tarefaHorario || !tarefaEtiqueta || !tarefaDescricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const resposta = await fetch('http://10.135.60.21:8085/receber-dados', {
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

{/*
    Nome da função: handleUpdate;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: Nenhum;
    Retorno: Nenhum retorno explícito;
    Finalidade: Atualizar os dados de uma tarefa existente no backend e tratar os possíveis erros de validação;
    Descrição/observações:
        - Verifica se todos os campos obrigatórios estão preenchidos antes do envio;
        - Faz uma requisição POST para atualizar uma tarefa existente;
        - Atualiza a lista de tarefas no frontend ao concluir com sucesso.
*/}

  const handleUpdate = async () => {
    if (!tarefaNome.trim() || !tarefaData || !tarefaHorario || !tarefaEtiqueta || !tarefaDescricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const resposta = await fetch('http://10.135.60.21:8085/receber-dados', {
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