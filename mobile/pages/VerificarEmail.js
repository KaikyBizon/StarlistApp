import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/StylesVerificarEmail';

const VerificarEmail = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleVerificarCodigo = async () => {
    try {
      const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: 'verificar_email', dados: codigo }),
      });

      const resultado = (await resposta.json()).dadosCadastro;

      if (resultado.error) {
        setMensagemErro(resultado.mensagem);
        Alert.alert('Erro', resultado.mensagem);
      } else {
        navigation.navigate('Login'); // Redireciona para a tela de login se o código for correto
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao verificar o código. Tente novamente.');
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar o Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o código enviado para o seu e-mail"
        placeholderTextColor="#9d9d9d"
        value={codigo}
        onChangeText={setCodigo}
        maxLength={6}
      />
      {mensagemErro ? <Text style={styles.errorText}>{mensagemErro}</Text> : null}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVerificarCodigo}>
          <Text style={styles.buttonText}>Verificar Código</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={handleCancelar}>
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificarEmail;