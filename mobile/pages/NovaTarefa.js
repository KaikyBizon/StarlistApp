import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import styles from '../styles/StylesNovaTarefa.js';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import MenuScreen from '../components/Menu.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NovaTarefa({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

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

    const [dadosTask, setDadosTask] = useState({
        titulo: '',
        data: formatDate(new Date()),
        hora: formatTime(new Date()),
        etiqueta: '',
        descricao: '',
    });

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
                            <Picker.Item label="Importante" value="Importatne" />
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
