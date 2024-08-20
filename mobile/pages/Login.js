/**
 * Nome do Componente: LoginForm
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que fornece uma interface de login para os usuários. Permite aos usuários inserir seu e-mail e senha para acessar a aplicação. Inclui funcionalidade para redefinição de senha através de um modal de redefinição.
 *
 * Observações Pertinentes:
 *   1. Utiliza AsyncStorage para armazenar informações do usuário após o login.
 *   2. Usa a biblioteca '@react-native-async-storage/async-storage' para armazenamento local.
 *   3. Implementa a funcionalidade de redefinição de senha via modal.
 *   4. Valida a entrada do usuário e lida com mensagens de erro exibidas na UI.
 *   5. Utiliza 'react-navigation' para navegação entre telas.
 *
 * Estado:
 *   - formValues: Contém os valores do formulário de login (e-mail e senha).
 *   - mensagensErro: Mensagens de erro para exibir ao usuário em caso de falha no login.
 *   - modalVisible: Controle da visibilidade do modal de redefinição de senha.
 *   - resetEmail: E-mail para redefinição de senha.
 *   - newPassword: Nova senha a ser definida.
 *   - confirmNewPassword: Confirmação da nova senha.
 *
 * Funções:
 *   - handleChange: Atualiza os valores do formulário conforme os inputs do usuário.
 *   - handleSubmit: Envia os dados de login para o backend e processa a resposta.
 *   - handlePasswordReset: Lida com o processo de redefinição de senha.
 *
 * Estrutura JSX:
 *   - Formulário de login com inputs para e-mail e senha.
 *   - Botão para submeter o login.
 *   - Link para redefinição de senha que exibe um modal para redefinir a senha.
 *   - Modal para redefinição de senha com inputs para nova senha e e-mail de confirmação.
 *   - Navegação para outras telas, como a tela de cadastro e a tela inicial após login.
 *
 * @returns {JSX.Element}
 */

import React, { useState } from 'react';
import styles from '../styles/StylesLogin';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Image, Modal, TouchableHighlight } from "react-native";
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginForm({ navigation }) {

    {/*
        Nome da função: formValues;
        Autor: Kaiky;
        Data de criação: 05/24;
        Parametros de entrada: setFormValues;
        Retorno: Dados inseridos;
        Finalidade: Armazenar os dados inseridos pelo usuário no Login;
        Descrição/observações: 
            - Os dados são enviados para o backend via requisição pela função handleSubmit e são validados.
    */}

    // Estados do formulário e mensagens de erro
    const [formValues, setFormValues] = useState({
        email: '',
        senha: ''
    });
    const [mensagensErro, setMensagensErro] = useState([]);
    const [isPasswordResetModalVisible, setIsPasswordResetModalVisible] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Configuração do cabeçalho de navegação
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#9d9d9d',
            },
        });
    }, [navigation]);

    {/*
        Nome da função: handleChange;
        Autor: Kaiky;
        Data de criação: 05/24;
        Parametros de entrada: name (string), value (qualquer);
        Retorno: void;
        Finalidade: Atualizar o estado de um formulário com os novos valores dos campos;
        Descrição/observações: 
            Esta função é utilizada para atualizar os valores do estado do formulário React. Ela recebe o nome do campo e o valor atual do campo como parâmetros e utiliza o método setFormValues para atualizar o estado. O estado atualizado inclui todos os valores anteriores juntamente com o novo valor do campo especificado. Isso permite que o formulário reflita os inputs mais recentes dos usuários.
    */}

    // Atualiza os valores do formulário
    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    {/*
        Nome da função: handleSubmit;
        Autor: Kaiky;
        Data de criação: 05/24;
        Data de alteração: 15/08 (Nathan e Davi)
        Parametros de entrada: e (Event);
        Retorno: Resposta do backend;
        Finalidade: Enviar os dados do formulário para um servidor;
        Descrição/observações: 
            Esta função é chamada quando o formulário é submetido. Ela previne o comportamento padrão do formulário para evitar o recarregamento da página. Os dados do formulário são coletados e preparados para envio, incluindo a conversão de datas para o formato ISO. Em seguida, uma requisição HTTP POST é feita para enviar os dados para um servidor. Dependendo da resposta, mensagens de erro são exibidas em um modal ou o usuário é redirecionado para a tela inicial. O tratamento de erros é implementado para capturar e registrar quaisquer problemas durante o envio dos dados.
    */}

    // Envia os dados do formulário para o backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        try {
            const resposta = await fetch('http://10.135.60.30:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formValues.email,
                    senha: formValues.senha
                }),
            });
            const resultado = await resposta.json();
            console.log('resposta', resultado);

            if (resposta.ok && resultado.login_status) {
                const { id, email, nome_usuario } = resultado.login_status;

                // Verifica se os campos necessários estão presentes
                if (id && email && nome_usuario) {
                    await AsyncStorage.setItem('ID', id.toString());
                    await AsyncStorage.setItem('email', email.toString());
                    await AsyncStorage.setItem('nome_usuario', nome_usuario.toString());
                    navigation.navigate('home');
                } else {
                    setMensagensErro(['Dados do login inválidos']);
                    setIsErrorModalVisible(true);
                }
            } else {
                // Assume que resultado.login_status é um array com a mensagem de erro
                const erroMensagem = resultado[0]?.error || 'Dados incorretos';
                setMensagensErro([erroMensagem]);
                setIsErrorModalVisible(true);
                console.log('---------', erroMensagem);
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setMensagensErro(['Erro ao conectar com o servidor.']);
            setIsErrorModalVisible(true);
        }
    };

    // Lógica para redefinir a senha
    const handlePasswordReset = async () => {
        // Lógica para redefinir a senha
        setIsPasswordResetModalVisible(false);
    };

    // Carregamento da fonte Kanit_500Medium
    const [fontLoaded] = useFonts({
        Kanit_500Medium,
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.blackground} behavior="padding">
            <View keyboardShouldPersistTaps="handled" style={styles.container}>
                <Image style={styles.logo} resizeMode='contain' source={require('../assets/images/logo_starlistMobile.png')} />

                <Text style={styles.login}>E-mail</Text>
                <TextInput
                    style={styles.inputsLogin}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#2F4F4F"
                    value={formValues.email}
                    onChangeText={(text) => handleChange('email', text)}
                />

                <Text style={styles.login}>Senha</Text>
                <TextInput
                    style={styles.inputsLogin}
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#2F4F4F"
                    value={formValues.senha}
                    onChangeText={(text) => handleChange('senha', text)}
                />
                <TouchableOpacity onPress={() => setIsPasswordResetModalVisible(true)}>
                    <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.forgotPassword}>Ainda não tem conta? Crie uma</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit} disabled={!formValues.email || !formValues.senha}>
                    <Text style={styles.submitTxt}>ENTRAR</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isPasswordResetModalVisible}
                onRequestClose={() => {
                    setIsPasswordResetModalVisible(!isPasswordResetModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Redefinir Senha</Text>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Confirme seu E-mail"
                            value={resetEmail}
                            onChangeText={(text) => setResetEmail(text)}
                        />
                        <TextInput
                            style={styles.inputs}
                            secureTextEntry={true}
                            placeholder="Nova Senha"
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                        />
                        <TextInput
                            style={styles.inputs}
                            secureTextEntry={true}
                            placeholder="Confirme a Nova Senha"
                            value={confirmNewPassword}
                            onChangeText={(text) => setConfirmNewPassword(text)}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => setIsPasswordResetModalVisible(!isPasswordResetModalVisible)}
                            >
                                <Text style={styles.textStyleCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonReset]}
                                onPress={handlePasswordReset}
                            >
                                <Text style={styles.textStyle}>Redefinir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isErrorModalVisible}
                onRequestClose={() => {
                    setIsErrorModalVisible(!isErrorModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Erros no login:</Text>
                        {mensagensErro.map((mensagem, index) => (
                            <Text key={index} style={styles.modalErrorText}>{mensagem}</Text>
                        ))}
                        <TouchableHighlight
                            style={styles.closeButton}
                            onPress={() => {
                                setIsErrorModalVisible(!isErrorModalVisible);
                            }}
                        >
                            <Text style={styles.closeButtonText}>fechar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

export default LoginForm;
