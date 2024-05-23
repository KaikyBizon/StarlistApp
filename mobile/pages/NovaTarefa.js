import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import styles from '../styles/StylesNovaTarefa.js'
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import MenuScreen from '../components/Menu.js';

export default function NovaTarefa({ navigation }) {
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date')

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

    const [formValues, setFormValues] = useState({
        titulo: '',
        data: formatDate(date),
        hora: formatTime(date),
        etiqueta: '',
        descricao: ''
    })

    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formValues)
        /*e.preventDefault();
    
        try {
          const resposta = await fetch('http://localhost:5000/receber-dados', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
          });
    
          const resultado = await resposta.json();
    
          if (resultado.erro) {
            // Exibe mensagens de erro no console.log ou em algum local visível
            console.error('Erro no servidor:', resultado.mensagens);
    
            // Atualiza o estado com as mensagens de erro para exibição no formulário
            setMensagensErro(resultado.mensagens);
          } else {
            window.alert("Cadastro realizado")
            navigation.navigate('CALENDÁRIO')
          }
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
        }*/
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        handleChange(mode === 'date' ? 'data' : 'hora', mode === 'date' ? formatDate(currentDate) : formatTime(currentDate));
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
                    <TextInput style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('titulo', text)} paddingHorizontal={10} />
                </View>
                <View style={styles.dataTarefa}>
                    <TouchableOpacity
                        onPress={() => showMode("date")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{formValues.data}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showMode("time")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{formValues.hora}</Text>
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
                            selectedValue={formValues.etiqueta}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue) => handleChange('etiqueta', itemValue)}
                        >
                            <Picker.Item label="Trabalho" value="Trabalho" />
                            <Picker.Item label="Estudo" value="Estudo" />
                            <Picker.Item label="Pessoal" value="Pessoal" />
                            <Picker.Item label="Outro" value="Outro" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inputsLabel}>
                    <Text style={styles.label}>DESCRIÇÃO</Text>
                    <TextInput style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('descricao', text)} paddingHorizontal={10} multiline={true} />
                </View>

                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                    <Text style={styles.submitTxt} >SALVAR TAREFA</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </KeyboardAvoidingView >

    )
}