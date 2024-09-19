import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/StylesCadastroEmpresarial.js';

// Função para formatar o CNPJ
const formatCNPJ = (cnpj) => {
    // Remove qualquer caractere não numérico
    cnpj = cnpj.replace(/\D/g, '');

    // Aplica a formatação
    if (cnpj.length <= 2) return cnpj;
    if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
    if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
    if (cnpj.length <= 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
};

export default function CadastroEmpresarial({ navigation }) {
    const [formValues, setFormValues] = useState({
        cnpj: '',
        nomeEquipe: '',
        numeroParticipantes: '',
        cargo: '',
    });

    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [mensagensErro, setMensagensErro] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formValues,
        };

        try {
            const resposta = await fetch('http://192.168.137.1:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'cadastro_empresarial', dados: dataToSend }),
            });

            const resultado = (await resposta.json()).dadosCadastro;
            console.log('Raw response:', resultado.mensagens_erro);

            if (resultado.dadosCadastro?.error) {
                const mensagens = resultado.dadosCadastro.mensagens_erro.map((erro) => {
                    return Object.values(erro).filter(msg => typeof msg === 'string').join();
                });

                setMensagensErro(mensagens);
                setModalVisible(true); // Exibe o modal com as mensagens de erro
            } else {
                navigation.navigate("Login");
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo} source={require('../assets/images/logo_starlistMobile.png')} resizeMode='contain' />
            </View>

            <View style={styles.containerInputs}>
                <Text style={styles.label}>CNPJ</Text>
                <TextInput
                    style={styles.inputs}
                    keyboardType="numeric"
                    maxLength={18} // Tamanho máximo com formatação
                    autoCorrect={false}
                    onChangeText={(text) => handleChange('cnpj', text)}
                    placeholder='CNPJ'
                    placeholderTextColor="#2F4F4F"
                    value={formatCNPJ(formValues.cnpj)}
                />

                <Text style={styles.label}>NOME DA EQUIPE</Text>
                <TextInput
                    style={styles.inputs}
                    autoCorrect={false}
                    maxLength={40}
                    onChangeText={(text) => handleChange('nomeEquipe', text)}
                    placeholder='Nome da Equipe'
                    placeholderTextColor="#2F4F4F"
                    value={formValues.nomeEquipe}
                />

                <Text style={styles.label}>NÚMERO DE PARTICIPANTES</Text>
                <TextInput
                    style={styles.inputs}
                    keyboardType="numeric"
                    maxLength={7}
                    autoCorrect={false}
                    onChangeText={(text) => {
                        // input só aceitará números
                        const numericText = text.replace(/[^0-9]/g, '');
                        handleChange('numeroParticipantes', numericText);
                    }}
                    placeholder='Número de Participantes'
                    placeholderTextColor="#2F4F4F"
                    value={formValues.numeroParticipantes}
                />
                <Text style={styles.label}>CARGO</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={formValues.cargo}
                        onValueChange={(itemValue) => handleChange('cargo', itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Escolha um cargo..." value="" />
                        <Picker.Item label="Líder" value="Líder" />
                        <Picker.Item label="Colaborador" value="Colaborador" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                    <Text style={styles.submitTxt}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Erros no cadastro:</Text>
                    {mensagensErro.map((mensagem, index) => (
                        <Text key={index} style={styles.modalErrorText}>{mensagem}</Text>
                    ))}
                    <TouchableHighlight
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableHighlight>
                </View>
            </Modal>

            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
}