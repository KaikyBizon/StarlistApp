/**
 * Nome do Componente: CadastroEmpresarial
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que exibe um formulário para cadastro empresarial. 
 *   Permite que os usuários insiram informações como CNPJ, nome da equipe, número de participantes e cargo.
 *   Inclui um modal para exibir mensagens de erro durante o processo de cadastro.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar os valores do formulário e as mensagens de erro.
 *   2. A função 'formatCNPJ' formata o CNPJ enquanto o usuário digita, garantindo que o valor exibido siga um padrão.
 *   3. O formulário possui validação e manipulação de envio assíncrono, enviando os dados para um servidor.
 *   4. O componente também utiliza 'Picker' para seleção de cargo, garantindo que o usuário escolha uma opção.
 *
 * Estado:
 *   - formValues: Objeto que armazena os valores dos campos do formulário (cnpj, nomeEquipe, numeroParticipantes, cargo).
 *   - mensagensErro: Array que armazena mensagens de erro retornadas após a tentativa de cadastro.
 *   - modalVisible: Indica se o modal de erro está visível ou não.
 *
 * Funções:
 *   - handleChange(name, value): Atualiza o estado do formulário conforme o usuário modifica os campos.
 *   - handleSubmit(e): Envia os dados do formulário para o servidor e gerencia a exibição de mensagens de erro.
 *
 * Estrutura JSX:
 *   - Renderiza um campo de entrada para CNPJ com formatação.
 *   - Inclui campos de entrada para o nome da equipe e número de participantes.
 *   - Um componente Picker permite a seleção de cargo.
 *   - Um botão de cadastro que aciona a função handleSubmit.
 *   - Um modal que exibe mensagens de erro, se houver.
 *
 * @returns {JSX.Element}
 */

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

    {/*
    Nome da função: handleChange;
    Autor:
    Data de criação: 
    Parâmetros de entrada: name (string), value (any);
    Retorno: Atualiza o estado do formulário com o novo valor;
    Finalidade: Atualizar os valores dos campos do formulário conforme o usuário os modifica;
    Descrição/observações:
        Esta função é responsável por atualizar dinamicamente os valores dos campos do formulário. 
        Ela recebe o nome do campo que foi alterado e o novo valor inserido pelo usuário, atualizando o estado do formulário (`formValues`) de maneira imutável. 
        O novo estado mantém os valores anteriores e atualiza apenas o campo correspondente ao nome fornecido.
    */}
    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [mensagensErro, setMensagensErro] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    {/*
    Nome da função: handleSubmit;
    Autor: 
    Data de criação: 
    Parâmetros de entrada: e (Event);
    Retorno: Redireciona o usuário para a tela de login ou exibe mensagens de erro;
    Finalidade: Enviar os dados do formulário empresarial para um servidor;
    Descrição/observações:
        Esta função é chamada quando o formulário de cadastro empresarial é submetido. 
        Ela previne o comportamento padrão do formulário e prepara os dados do formulário para envio via requisição HTTP POST. 
        Os dados são enviados para o servidor no formato JSON. Caso a resposta contenha erros, as mensagens são extraídas e exibidas em um modal. 
        Se os dados forem válidos, o usuário é redirecionado para a tela de login. A função também lida com possíveis erros durante o processo de envio.
    */}
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formValues,
        };

        try {
            const resposta = await fetch('http://10.135.60.17:8085/receber-dados', {
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