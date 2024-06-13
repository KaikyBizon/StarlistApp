import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../components/Menu';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import styles from '../styles/StylesPerfil';

function Perfil({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [userId, setUserId] = useState('');

  const [formAlter, setFormAlter] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    id: ''
  });

  useEffect(() => {
    const showDados = async () => {
      const id = await AsyncStorage.getItem('ID');
      setUserId(id)
      console.log(id)
      try {
        const resposta = await fetch('http://10.135.60.15:8085/dados-atuais', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'id': id }),
        });
        const dados = await resposta.json();
        setFormAlter({
          nome: dados.nome_usuario,
          email: dados.email,
          dataNascimento: dados.data_nasc,
          id: id
        });

        setNomeUsuario(dados.nome_usuario);
        setName(dados.nome_usuario);
        setEmail(dados.email);
        setDob(dados.data_nasc);
      } catch (error) {
        console.error('Erro ao carregar dados!', error);
        Alert.alert('Erro', 'Erro ao carregar dados!');
      }
    }

    showDados();
  }, []);

  AsyncStorage.setItem('email', formAlter.email);
  AsyncStorage.setItem('nome_usuario', formAlter.nome);

  const formatDate = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');
    cleaned = cleaned.substring(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
    }
    if (cleaned.length > 4) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4) + '/' + cleaned.substring(4);
    }
    return formatted;
  };

  const handleDobChange = (text) => {
    const formattedText = formatDate(text);
    setDob(formattedText);
  };

  const formatToISODate = (text) => {
    const [day, month, year] = text.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('nome_usuario', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('dataNascimento', dob);

      const id = userId;
      const formattedDob = formatToISODate(dob); // Formatar para aaaa-mm-dd

      const resposta = await fetch('http://10.135.60.22:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          nome: name,
          email: email,
          dataNascimento: formattedDob,
        }),
      });

      const resultado = (await resposta.json()).update_status;

      if (resultado) {
        Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      } else {
        Alert.alert('Erro', 'Erro ao salvar dados!');
      }
    } catch (error) {
      console.error('Erro ao salvar dados!', error);
      Alert.alert('Erro', 'Erro ao salvar dados!');
    }
  };

  const handleDelete = async () => {
    try {
      const idUsuario = formAlter.id; // Obtém o ID do usuário armazenado no estado

      const resposta = await fetch('http://10.135.60.22:8085/delete-usuario', {
        method: 'POST', // ou 'DELETE', dependendo da configuração do seu backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: 'excluir_usuario', id: idUsuario }),
      });

      const resultado = (await resposta.json());
      console.log(resultado);

      if (resultado) {
        Alert.alert('Sucesso', 'Usuário deletado com sucesso!');
        navigation.navigate('Bemvindo'); // Navega para a tela de boas-vindas após a exclusão
      } else {
        Alert.alert('Erro', 'Erro ao deletar usuário!');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário!', error);
      Alert.alert('Erro', 'Erro ao deletar usuário!');
    }
  };

  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  if (!fontLoaded) {
    return null;
  }
};
return (
  <View style={styles.containerProfile}>
    <Menu />

    <View style={styles.profileContainer}>
      <Image source={require('../assets/images/icone_usuario.png')} style={styles.logo} />

      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{nomeUsuario}</Text>
        <Text style={styles.userId}>ID: {userId}</Text>
      </View>
    </View>

    <View style={styles.viewInputPerfil}>
      <Text style={styles.inputPerfil}>Nome</Text>
      <TextInput
        style={styles.textinputPerfil}
        placeholder="Thaina Eduarda Alexandre"
        value={name}
        onChangeText={setName}
      />
    </View>

    <View style={styles.viewInputPerfil}>
      <Text style={styles.inputPerfil}>E-mail</Text>
      <TextInput
        style={styles.textinputPerfil}
        placeholder="thainaeduarda123@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
    </View>

    <View style={styles.viewInputPerfil}>
      <Text style={styles.inputPerfil}>Data de nascimento</Text>
      <TextInput
        style={styles.textinputPerfil}
        placeholder="18/05/2007"
        value={dob}
        onChangeText={handleDobChange}
        keyboardType="numeric"
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonSalvar} onPress={handleSave}>
        <Text style={styles.buttonTextSalvar}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonTextDelete}>Deletar</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.buttonSair} onPress={() => navigation.navigate('Bemvindo')}>
      <Text style={styles.buttonTextSair}>Sair</Text>
    </TouchableOpacity>
  </View>
);

export default Perfil;
