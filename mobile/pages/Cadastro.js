import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from '../styles/StylesCadastro.js';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit'
import { TextInputMask } from 'react-native-masked-text';


export default function Cadastro({ navigation }) {

  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    senha: '',
    confirme: '',
    dataNascimento: '',
  })

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const [mensagensErro, setMensagensErro] = useState([]);
  const handleSubmit = async (e) => {
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Oculta todo o cabeçalho
    });
  }, [navigation]);


  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../assets/images/logo_starlistMobile.png')} resizeMode='contain' />
      </View>
      <View style={styles.containerInputs}>
        <Text style={styles.label}>NOME</Text>
        <TextInput style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('nome', text)} placeholder='Nome Completo' name="nome" value={formValues.nome} />

        <Text style={styles.label}>E-MAIL</Text>
        <TextInput style={styles.inputs} autoCorrect={false} keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => handleChange('email', text)} placeholder='E-mail' name="email" value={formValues.email} />

        <Text style={styles.label}>SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('senha', text)} placeholder='Senha' name="senha" value={formValues.senha} />

        <Text style={styles.label}>CONFIRME SUA SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('confirme', text)} placeholder='Confirmar sua senha' name="confirme" value={formValues.confirme} />

        <Text style={styles.label}>DATA DE NASCIMENTO</Text>
        <TextInputMask style={styles.inputs} keyboardType="numeric" autoCorrect={false} onChangeText={(text) => handleChange('dataNascimento', text)} type={'datetime'} options={{ format: 'DD/MM/YYYY', }} name="dataNas" value={formValues.dataNascimento} placeholder='Data de nascimento' />

        <Text style={styles.temconta}>Já tem uma conta? <Text style={styles.facalogin} onPress={() => navigation.navigate('Login')}>Faça login</Text></Text>

        <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
          <Text style={styles.submitTxt}>CADASTRAR</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style='auto' />

    </KeyboardAvoidingView>
  );
}