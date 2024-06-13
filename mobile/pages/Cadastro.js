import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
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
  });

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [mensagensErro, setMensagensErro] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const convertDateToISO = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formValues,
      dataNascimento: convertDateToISO(formValues.dataNascimento)
    };

    try {
      const resposta = await fetch('http://10.135.60.7:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const resultado = (await resposta.json()).dados_processados;
      

      if (!resposta.ok || resultado.mensagens_erro.length > 0) {
        setMensagensErro(resultado.mensagens_erro);
        setModalVisible(true);  // Exibe o modal com as mensagens de erro
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

        <Text style={styles.label}>E-MAIL</Text>
        <TextInput style={styles.inputs} autoCorrect={false} keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => handleChange('email', text)} placeholder='E-mail' name="email" value={formValues.email} />

        <Text style={styles.label}>SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('senha', text)} placeholder='Senha' name="senha" value={formValues.senha} />

        <Text style={styles.label}>CONFIRME SUA SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} 
        onChangeText={(text) => handleChange('confirme', text)} placeholder='Confirmar sua senha' name="confirme" value={formValues.confirme} />

        <Text style={styles.label}>DATA DE NASCIMENTO</Text>
        <TextInputMask style={styles.inputs} keyboardType="numeric" autoCorrect={false} onChangeText={(text) => handleChange('dataNascimento', text)} type={'datetime'} options={{ format: 'DD/MM/YYYY', }} name="dataNascimento" value={formValues.dataNascimento} placeholder='Data de nascimento' />

        <Text style={styles.temconta}>Já tem uma conta? <Text style={styles.facalogin} onPress={() => navigation.navigate('Login')}>Faça login</Text></Text>
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
            <Text key={index} style={styles.modalErrorText}>{mensagem.mensagem_nome || mensagem.mensagem_email || mensagem.mensagem_senha || mensagem.mensagem_confirmar || mensagem.mensagem_idade}</Text>
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

      <StatusBar style='auto' />
    </KeyboardAvoidingView>
  );
}