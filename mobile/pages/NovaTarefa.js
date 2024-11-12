/*
Nome do componente: NovaTarefa;
Autor: Kaiky;
Data de criação: 24/10;
Finalidade: Este componente é responsável por fornecer a interface para a criação de uma nova tarefa dentro do aplicativo.
Descrição/observações:
    O componente `NovaTarefa` utiliza hooks do React, especificamente `useState`, para gerenciar os estados relacionados à nova tarefa, como:
    - `titulo`: armazena o título da tarefa.
    - `data`: armazena a data selecionada.
    - `horario`: armazena o horário selecionado.
    - `etiqueta`: armazena a etiqueta escolhida para a tarefa.
    - `descricao`: armazena a descrição da tarefa.
    - `mensagemErro`: gerencia mensagens de erro que podem surgir durante a validação ou o envio dos dados.

    O componente contém funções para:
    - `formatarData`: formata a data selecionada para um padrão legível.
    - `formatarHora`: formata o horário selecionado para um padrão legível.
    - `adicionarTarefa`: é a função principal que gerencia a lógica de validação e envio dos dados da tarefa para o backend, utilizando `fetch`. Ela também trata a resposta do servidor, exibindo mensagens de erro ou redirecionando o usuário após uma criação bem-sucedida.

    A estrutura JSX do componente consiste em:
    - Campos de entrada (`input`) para o título, data, horário, etiqueta e descrição da tarefa, permitindo que o usuário insira todas as informações necessárias.
    - Um `DateTimePicker` para facilitar a seleção de data e horário.
    - Um botão que, ao ser clicado, aciona a função `adicionarTarefa`, disparando o processo de validação e envio.

    O componente também faz uso do `AsyncStorage` para recuperar o ID do usuário, garantindo que as tarefas sejam associadas corretamente ao usuário que as cria. 
    A validação é aplicada em cada campo para garantir que os dados inseridos sejam válidos antes de permitir o envio.
*/

import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import styles from '../styles/StylesNovaTarefa.js';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import MenuScreen from '../components/Menu.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NovaTarefa({ navigation, onTarefaSalva }) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    //Constante para recarregar a página após criar uma nova tarefa
    const [refresh, setRefresh] = useState(false)

    {/*
    Nome da função: formatDate;
    Autor: Kaiky;
    Data de criação: 10/24;
    Parâmetros de entrada: date (Date);
    Retorno: Data formatada no padrão 'dd/mm/yyyy';
    Finalidade: Formatar uma data para o formato brasileiro 'dia/mês/ano';
    Descrição/observações:
        Esta função recebe um objeto de data (`Date`) e o formata para o padrão brasileiro de exibição de data, onde o dia e o mês são sempre exibidos com dois dígitos e o ano é exibido com quatro dígitos. 
        É útil para garantir que as datas exibidas ao usuário estejam no formato correto.
    */}
    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    {/*
    Nome da função: formatTime;
    Autor: 
    Data de criação: 
    Parâmetros de entrada: date (Date);
    Retorno: Hora formatada no padrão 'HH:mm';
    Finalidade: Formatar uma hora para o formato brasileiro 'hora:minuto';
    Descrição/observações:
        Esta função recebe um objeto de data (`Date`) e o formata para o padrão brasileiro  de exibição de hora, onde a hora e o minuto são sempre exibidos com dois dígitos. 
        É útil para garantir que as horas exibidas ao usuário estejam no formato correto e sejam facilmente compreensíveis.
    */}
    const formatTime = (date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    {/*
    Nome da função: fetchUserId (dentro do useEffect);
    Autor: 
    Data de criação: 
    Parâmetros de entrada: Nenhum;
    Retorno: Atualiza o estado de `dadosTask` com o ID do usuário;
    Finalidade: Buscar o ID do usuário armazenado no `AsyncStorage` e atualizá-lo no estado da tarefa;
    Descrição/observações:
        Esta função é executada dentro do hook `useEffect` quando o componente é montado. Ela tenta recuperar o ID do usuário armazenado no `AsyncStorage`. 
        Se o ID for encontrado, ele é adicionado ao estado da tarefa (`dadosTask`) através da função `setDadosTask`. 
        Caso ocorra um erro ao buscar o ID, ele é registrado no console. O uso de `AsyncStorage` permite manter informações persistentes entre sessões de uso.
    */}
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userId = await AsyncStorage.getItem('ID');
                if (userId) {
                    setDadosTask((prevValues) => ({
                        ...prevValues,
                        usuario_id: userId
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar o ID do usuário do AsyncStorage", error);
            }
        };

        fetchUserId();
    }, []);

    //Constante que armazena os valores inseridos nos inputs
    const [dadosTask, setDadosTask] = useState({
        acao: 'criar_tarefa',
        titulo: '',
        data: formatDate(new Date()),
        horario: formatTime(new Date()),
        etiqueta: '',
        descricao: '',
        usuario_id: ''
    });

    //Constante para armazenar mensagens de erro
    const [mensagens_erro, setMensagensErro] = useState([])

    {/*
    Nome da função: handleChange;
    Autor: Kaiky;
    Data de criação: 10/24;
    Parâmetros de entrada: name (string), value (any);
    Retorno: Atualiza o estado `dadosTask` com o novo valor;
    Finalidade: Atualizar dinamicamente os valores dos campos relacionados à nova tarefa;
    Descrição/observações:
        Esta função recebe o nome de um campo e o valor correspondente, e atualiza o estado `dadosTask` de forma imutável. 
        O novo estado mantém todos os valores anteriores e substitui apenas o campo correspondente ao nome fornecido. 
        Isso permite que os dados da tarefa sejam atualizados conforme o usuário faz modificações nos inputs da interface.
    */}
    const handleChange = (name, value) => {
        setDadosTask((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    {/*
    Nome da função: onChange;
    Autor: 
    Data de criação: 
    Parâmetros de entrada: event (Event), selectedDate (Date);
    Retorno: Atualiza a data ou o horário no estado da tarefa;
    Finalidade: Atualizar a data ou horário da tarefa ao selecionar uma nova data/hora;
    Descrição/observações:
        Esta função é chamada quando o usuário seleciona uma data ou horário em um DateTimePicker. 
        Se uma nova data for escolhida (`selectedDate`), ela é usada como a nova data; caso contrário, a data atual é mantida. 
        A função então oculta o DateTimePicker, atualiza o estado `date` com a data/hora selecionada, e chama `handleChange` para atualizar o campo relevante (`data` ou `horario`) com a data ou horário formatado. 
        A formatação é feita com as funções `formatDate` ou `formatTime`, dependendo do modo (`date` ou `time`).
    */}
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        handleChange(mode === 'date' ? 'data' : 'horario', mode === 'date' ? formatDate(currentDate) : formatTime(currentDate));
    };

    {/*
    Nome da função: convertDateToISO;
    Autor: 
    Data de criação: 
    Parâmetros de entrada: date (string);
    Retorno: Data no formato ISO (yyyy-mm-dd);
    Finalidade: Converter uma data do formato 'dd/mm/yyyy' para o formato ISO 'yyyy-mm-dd';
    Descrição/observações:
        Esta função recebe uma data no formato 'dia/mês/ano' (dd/mm/yyyy) e a converte para o formato ISO 'ano-mês-dia' (yyyy-mm-dd). 
        A conversão é feita separando a string da data original em dia, mês e ano, e retornando a nova string no formato ISO. 
        Esta função é útil para garantir que as datas estejam no formato adequado para serem enviadas ao backend.
    */}
    const convertDateToISO = (date) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };

    {/*
    Nome da função: handleSubmit;
    Autor: Kaiky;
    Data de criação: 10/24;
    Parâmetros de entrada: e (Event);
    Retorno: Redireciona o usuário ou exibe mensagens de erro;
    Finalidade: Enviar os dados da nova tarefa para o servidor e gerenciar o fluxo de criação da tarefa;
    Descrição/observações:
        Esta função é chamada ao submeter o formulário de criação de uma nova tarefa. 
        Ela gera um ID único usando um timestamp (`Date.now()`), converte a data para o formato ISO usando a função `convertDateToISO`, e agrupa os valores da tarefa em um objeto.
        A função faz uma requisição HTTP POST para enviar os dados da tarefa ao servidor. Se houver erros na resposta, as mensagens de erro são armazenadas e exibidas. 
        Caso a criação seja bem-sucedida, a função redefine os valores do formulário, recarrega a página (atualizando a lista de tarefas), e redireciona o usuário para a tela "TO DO" com a nova tarefa selecionada.
        Um pequeno atraso de 300ms é adicionado para garantir que os dados estejam prontos antes do redirecionamento.
    */}
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gerar um ID único para a tarefa
        const uniqueId = Date.now(); // Usando timestamp para garantir que o ID seja único

        const valuesTask = {
            ...dadosTask,
            data: convertDateToISO(dadosTask.data),
            id: uniqueId, // Adicionar ID único
        };

        try {
            const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'criar_tarefa', dados: valuesTask }),
            });

            const resultado = await resposta.json();

            if (resultado.mensagens_erro) {
                setMensagensErro(resultado.mensagens_erro);
            } else {
                setShow(false);
                setDadosTask({
                    titulo: '',
                    descricao: '',
                    data: formatDate(new Date()),
                    horario: formatTime(new Date()),
                    etiqueta: '',
                    usuario_id: dadosTask.usuario_id,
                });
                setRefresh(!refresh); // Recarrega a página após inserir uma tarefa

                if (onTarefaSalva) {
                    onTarefaSalva();
                }

                // Adiciona um pequeno atraso para garantir que os dados estejam prontos
                setTimeout(() => {
                    navigation.navigate('TO DO', {
                        selectedDate: valuesTask.data,
                        novaTarefa: valuesTask,
                    });
                }, 300); // 300ms de atraso
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };



    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const [fontLoaded] = useFonts({
        Kanit_500Medium,
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <MenuScreen />
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>NOVA TAREFA</Text>
            </View>
            <View style={styles.containerInputs}>
                <View style={styles.inputsLabel}>
                    <Text style={styles.label}>TÍTULO:</Text>
                    <TextInput
                        style={styles.inputs}
                        autoCorrect={false}
                        onChangeText={(text) => handleChange('titulo', text)}
                        paddingHorizontal={10}
                    />
                </View>
                <View style={styles.dataTarefa}>
                    <TouchableOpacity
                        onPress={() => showMode("date")}
                        style={styles.buttonDateAndTime}
                    >
                        <Text style={styles.buttonText}>{dadosTask.data}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showMode("time")}
                        style={styles.buttonDateAndTime}
                    >
                        <Text style={styles.buttonText}>{dadosTask.horario}</Text>
                    </TouchableOpacity>
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
                <View style={styles.inputsLabel}>
                    <Text style={styles.label}>ETIQUETA:</Text>
                    <View style={[styles.inputs, styles.pickerContainer]}>
                        <Picker
                            selectedValue={dadosTask.etiqueta}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue) => handleChange('etiqueta', itemValue)}
                        >
                            <Picker.Item label="Selecione uma etiqueta" value="" />
                            <Picker.Item label="Importante" value="Importante" />
                            <Picker.Item label="Pendência" value="Pendência" />
                            <Picker.Item label="Reunião" value="Reunião" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inputsLabel}>
                    <Text style={styles.label}>DESCRIÇÃO:</Text>
                    <TextInput
                        style={styles.inputs}
                        autoCorrect={false}
                        onChangeText={(text) => handleChange('descricao', text)}
                        paddingHorizontal={10}
                        multiline={true}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                        <Text style={styles.submitTxt}>SALVAR TAREFA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel}>
                        <Text style={styles.cancelTxt}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style='auto' />
        </KeyboardAvoidingView>
    );
}