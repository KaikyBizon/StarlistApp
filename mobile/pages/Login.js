import React, { useState } from 'react';
import styles from '../styles/StylesLogin';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Image, } from "react-native";
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit'

function LoginForm({ navigation }) {
    const [formValues, setFormValues] = useState({
        email: '',
        senha: ''
    })

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
        console.log(formValues)
        navigation.navigate('home')
        /*e.preventDefault();

        try {
            const resposta = await fetch('http://localhost:5000/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, senha: senha }),
            });
            const resultado = (await resposta.json()).login_status;

            if (resposta.ok) {
               console.log(resposta)


                // Dados foram processados com sucesso
            } else {
                // Atualiza o estado com as mensagens de erro para exibição no formulário
                setMensagensErro(resultado.mensagens);

            }
        } catch (error) {
            setError('Erro ao realizar login');
        }*/
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

                <Text style={styles.login}>E-mail</Text>
                <TextInput style={styles.inputs} placeholder="roberto.carlos@example.com" value={formValues.email} onChangeText={(text) => handleChange('email', text)} />

                <Text style={styles.login}>Senha</Text>
                <TextInput style={styles.inputs} secureTextEntry={true} placeholder="******" value={formValues.senha} onChangeText={(text) => handleChange('senha', text)} />
                <Text style={styles.login}>Esqueci minha senha</Text>

                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                    <Text style={styles.submitTxt}>SIGN IN</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginForm;
