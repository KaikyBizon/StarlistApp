import React, { useState } from 'react';
import styles from '../styles/StylesLogin';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Image, Modal } from "react-native";
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginForm({ navigation }) {
    const [formValues, setFormValues] = useState({
        email: '',
        senha: ''
    });

    const [mensagensErro, setMensagensErro] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState(' ');
    const [newPassword, setNewPassword] = useState(' ');
    const [confirmNewPassword, setConfirmNewPassword] = useState(' ');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#9d9d9d', // Define a cor de fundo do cabeçalho
            },
            // Oculta todo o cabeçalho
        });
    }, [navigation]);

    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch('http://10.135.60.7:8085/receber-dados', {
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

            if (resposta.ok && resultado.login_status) {

                // Converte o ID para string ao salvar
                await AsyncStorage.setItem('ID', resultado.login_status.id.toString());
                await AsyncStorage.setItem('email', resultado.login_status.email.toString());
                await AsyncStorage.setItem('nome_usuario', resultado.login_status.nome_usuario.toString());

                // Dados foram processados com sucesso
                navigation.navigate('home');
            } else {
                // Atualiza o estado com as mensagens de erro para exibição no formulário
                setMensagensErro(resultado.mensagens || 'Dados incorretos');
            }
        } catch (error) {
            console.error('Erro ao realizar login', error);
        }
    };

    const handlePasswordReset = async () => {
        //Lógica para redefinir a senha
        setModalVisible(false);
    }

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
                <View style={styles.containerError}>
                    {mensagensErro ? <Text style={styles.error}>{mensagensErro}</Text> : null}
                </View>
                <Text style={styles.login}>E-mail</Text>
                <TextInput
                    style={styles.inputsLogin}
                    placeholder="Digite seu e-mail"
                    value={formValues.email}
                    onChangeText={(text) => handleChange('email', text)}
                />

                <Text style={styles.login}>Senha</Text>
                <TextInput
                    style={styles.inputsLogin}
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    value={formValues.senha}
                    onChangeText={(text) => handleChange('senha', text)}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
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
                                onPress={() => setModalVisible(!modalVisible)}
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
        </KeyboardAvoidingView>
    );
}
export default LoginForm;