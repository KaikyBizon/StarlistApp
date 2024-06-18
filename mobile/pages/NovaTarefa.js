// Importa componentes necessários
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import styles from '../styles/StylesNovaTarefa.js';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import MenuScreen from '../components/Menu.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Nome do Componente: NovaTarefa
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que permite ao usuário criar uma nova tarefa.
 *   Utiliza hooks do React para gerenciar o estado dos campos do formulário, incluindo título,
 *   data, hora, etiqueta e descrição da tarefa.
 *   Permite seleção de data e hora utilizando o componente DateTimePicker do React Native.
 *   Ao salvar a tarefa, os dados são armazenados localmente utilizando AsyncStorage.
 *
 * Observações Pertinentes:
 *   1. Utiliza os hooks 'useState' para gerenciar o estado dos campos do formulário.
 *   2. O método 'handleChange' é utilizado para atualizar o estado conforme o usuário digita nos campos.
 *   3. Utiliza o componente DateTimePicker para seleção de data e hora.
 *   4. Utiliza AsyncStorage para armazenar os dados localmente no dispositivo.
 *
 * Estado:
 *   - date: Armazena a data selecionada pelo usuário.
 *   - show: Controla a visibilidade do componente DateTimePicker.
 *   - mode: Indica se o DateTimePicker está configurado para data ou hora.
 *   - dadosTask: Armazena os dados da tarefa, incluindo título, data, hora, etiqueta e descrição.
 *
 * Funções:
 *   - handleChange: Atualiza o estado dos campos do formulário conforme o usuário digita.
 *   - onChange: Atualiza o estado de data ou hora conforme o usuário seleciona no DateTimePicker.
 *   - showMode: Controla a visibilidade do DateTimePicker para data ou hora.
 *   - formatDate: Formata a data para exibição no formato 'dd/MM/yyyy'.
 *   - formatTime: Formata a hora para exibição no formato 'HH:mm'.
 *
 * Componentes Importados:
 *   - StatusBar: Componente do Expo para controlar a barra de status do aplicativo.
 *   - useState, useEffect: Hooks do React para gerenciamento de estado e efeitos.
 *   - Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity: Componentes essenciais do React Native para interface.
 *   - DateTimePicker: Componente do React Native para seleção de data e hora.
 *   - Picker: Componente do React Native para seleção de itens em lista suspensa.
 *   - MenuScreen: Componente customizado para exibir o menu do aplicativo.
 *   - AsyncStorage: API do React Native para armazenamento local de dados.
 *
 * Estilos:
 *   - Utiliza estilos definidos em '../styles/StylesNovaTarefa.js' para estilização dos componentes.
 *
 * @returns {JSX.Element} Retorna o JSX que representa o formulário de criação de nova tarefa.
 */


// Função principal do componente NovaTarefa
export default function NovaTarefa({ navigation }) {
    // Estados para gerenciar data, visibilidade do seletor de data/hora e modo (data ou hora)
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    // Formata data para exibição
    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Formata hora para exibição
    const formatTime = (date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Estado inicial para os dados da tarefa
    const [dadosTask, setDadosTask] = useState({
        titulo: '',
        data: formatDate(new Date()),
        hora: formatTime(new Date()),
        etiqueta: '',
        descricao: '',
    });

    // Atualiza os dados da tarefa com os valores dos campos de entrada
    const handleChange = (name, value) => {
        setDadosTask((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Lida com mudanças no seletor de data/hora
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        handleChange(mode === 'date' ? 'data' : 'hora', mode === 'date' ? formatDate(currentDate) : formatTime(currentDate));
    };

    // Mostra o seletor de data ou hora
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    // Carrega a fonte Kanit
    const [fontLoaded] = useFonts({
        Kanit_500Medium,
    });

    // Retorna null se a fonte ainda não estiver carregada
    if (!fontLoaded) {
        return null;
    }

    // Renderiza o componente
    return (
        <KeyboardAvoidingView style={styles.background}>
            <MenuScreen />
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>NOVA TAREFA</Text>
            </View>
            <View style={styles.containerInputs}>
                <View style={styles.inputsLabel}>
                    <Text style={styles.label}>TÍTULO</Text>
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
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{dadosTask.data}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showMode("time")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{dadosTask.hora}</Text>
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
                    <Text style={styles.label}>ETIQUETA</Text>
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
                    <Text style={styles.label}>DESCRIÇÃO</Text>
                    <TextInput
                        style={styles.inputs}
                        autoCorrect={false}
                        onChangeText={(text) => handleChange('descricao', text)}
                        paddingHorizontal={10}
                        multiline={true}
                    />
                </View>

                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={styles.submitTxt}>SALVAR TAREFA</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </KeyboardAvoidingView>
    );
}
