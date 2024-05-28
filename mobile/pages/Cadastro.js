import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from '../styles/StylesCadastro.js';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit'
import { TextInputMask } from 'react-native-masked-text';


export default function Cadastro({ navigation }) {

  const [formValues, setFormValues] = useState({
    acao: 'cadastro',
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
    e.preventDefault();

    try {
      const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const resultado = (await resposta.json()).dados_processados;

      if (!resposta.ok || resultado.mensagens_erro) {
        // Assume que a estrutura de erro vem no campo 'mensagens_erro'
        setMensagensErro(resultado.mensagens_erro);
      } else {
        navigation.navigate("home")
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
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
        <View style={styles.containerError}>
          {mensagensErro.map((mensagem, index) => (
            <Text key={index}>{mensagem.mensagem_nome}</Text>
          ))}
        </View>
        <Text style={styles.label}>E-MAIL</Text>
        <TextInput style={styles.inputs} autoCorrect={false} keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => handleChange('email', text)} placeholder='E-mail' name="email" value={formValues.email} />
        <View style={styles.containerError}>
          {mensagensErro.map((mensagem, index) => (
            <Text key={index}>{mensagem.mensagem_email}</Text>
          ))}
        </View>

        <Text style={styles.label}>SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('senha', text)} placeholder='Senha' name="senha" value={formValues.senha} />
        <View style={styles.containerError}>
          {mensagensErro.map((mensagem, index) => (
            <Text key={index}>{mensagem.mensagem_senha}</Text>
          ))}
        </View>

        <Text style={styles.label}>CONFIRME SUA SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('confirme', text)} placeholder='Confirmar sua senha' name="confirme" value={formValues.confirme} />
        <View style={styles.containerError}>
          {mensagensErro.map((mensagem, index) => (
            <Text key={index}>{mensagem.confirme}</Text>
          ))}
        </View>

        <Text style={styles.label}>DATA DE NASCIMENTO</Text>
        <TextInputMask style={styles.inputs} keyboardType="numeric" autoCorrect={false} onChangeText={(text) => handleChange('dataNascimento', text)} type={'datetime'} options={{ format: 'DD/MM/YYYY', }} name="dataNas" value={formValues.dataNascimento} placeholder='Data de nascimento' />
        <View style={styles.containerError}>
          {mensagensErro.map((mensagem, index) => (
            <Text key={index}>{mensagem.mensagem_dataNascimento}</Text>
          ))}
        </View>


        <Text style={styles.temconta}>Já tem uma conta? <Text style={styles.facalogin} onPress={() => navigation.navigate('Login')}>Faça login</Text></Text>

        <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
          <Text style={styles.submitTxt}>CADASTRAR</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style='auto' />

    </KeyboardAvoidingView>
  );
}