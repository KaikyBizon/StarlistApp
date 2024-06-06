import React, { useState } from 'react';
import styles from '../styles/StylesLogin';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Image } from "react-native";
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';

function LoginForm({ navigation }) {
    const [formValues, setFormValues] = useState({
        email: '',
        senha: ''
    });

    const [mensagensErro, setMensagensErro] = useState('');

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
            const resposta = await fetch('http://10.135.60.9:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formValues.email,
                    senha: formValues.senha
                }),
            });
            const resultado = (await resposta.json()).login_status;

            if (resposta.ok && resultado !== 'success') {
                // Atualiza o estado com as mensagens de erro para exibição no formulário
                setMensagensErro(resultado.mensagens || 'Dados incorretos');
            } else {
                // Dados foram processados com sucesso
                navigation.navigate('home');

            }
        } catch (error) {
            console.error('Erro ao realizar login', error);
        }
    };

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
                    style={styles.inputs}
                    placeholder="roberto.carlos@example.com"
                    value={formValues.email}
                    onChangeText={(text) => handleChange('email', text)}
                />

                <Text style={styles.login}>Senha</Text>
                <TextInput
                    style={styles.inputs}
                    secureTextEntry={true}
                    placeholder="******"
                    value={formValues.senha}
                    onChangeText={(text) => handleChange('senha', text)}
                />
                <Text style={styles.login}>Esqueci minha senha</Text>
                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit} disabled={!formValues.email || !formValues.senha}>
                    <Text style={styles.submitTxt}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default LoginForm;
