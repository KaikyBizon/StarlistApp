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

    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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

    const handleChange = (name, value) => {
        setDadosTask((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        handleChange(mode === 'date' ? 'data' : 'horario', mode === 'date' ? formatDate(currentDate) : formatTime(currentDate));
    };

    const convertDateToISO = (date) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        navigation.navigate('TO DO')
        e.preventDefault();

        const valuesTask = {
            ...dadosTask,
            data: convertDateToISO(dadosTask.data),
        };

        try {
            const resposta = await fetch('http://10.135.60.19:8085/receber-dados', {
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
                setRefresh(!refresh) //Recarrega a página após inserir uma tarefa
                if (onTarefaSalva) {
                    onTarefaSalva();
                }
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
                    <Text style={styles.submitTxt} onPress={handleSubmit}>SALVAR TAREFA</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </KeyboardAvoidingView>
    );
}
