import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../components/Menu';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import styles from '../styles/StylesPerfil';

/**
 * Nome do Componente: Perfil
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que permite visualizar e editar o perfil do usuário.
 *   Utiliza AsyncStorage para armazenar e recuperar dados locais do usuário, como nome, e-mail,
 *   data de nascimento e ID.
 *   Permite ao usuário editar e salvar informações do perfil, incluindo nome, e-mail e data de nascimento,
 *   além de oferecer a opção de deletar o perfil.
 *
 * Observações Pertinentes:
 *   1. Utiliza os hooks 'useState' para gerenciar os estados dos dados do perfil e 'useEffect' para carregar
 *      os dados do usuário ao montar o componente.
 *   2. Implementa funções para formatar a data de nascimento, salvar dados alterados do perfil e deletar o usuário.
 *   3. Utiliza AsyncStorage para armazenar dados localmente e fazer requisições POST para APIs para atualização
 *      e exclusão de dados.
 *
 * Estado:
 *   - name: Nome do usuário.
 *   - email: E-mail do usuário.
 *   - dob: Data de nascimento do usuário.
 *   - nomeUsuario: Nome de usuário exibido no perfil.
 *   - userId: ID do usuário.
 *   - formAlter: Objeto que armazena os dados alteráveis do perfil (nome, e-mail, data de nascimento e ID).
 *
 * Funções:
 *   - formatDate: Formata a data de nascimento para o formato 'dd/mm/aaaa'.
 *   - handleDobChange: Atualiza o estado 'dob' com a data de nascimento formatada.
 *   - formatToISODate: Formata a data de nascimento para o formato ISO 'aaaa-mm-dd'.
 *   - handleSave: Salva as alterações feitas no perfil, atualizando os dados localmente e na API.
 *   - handleDelete: Deleta o usuário da aplicação, realizando uma requisição POST para a API de exclusão.
 *
 * Componentes Importados:
 *   - View, Text, TextInput, TouchableOpacity, Image: Componentes essenciais do React Native para interface.
 *   - Alert: Componente do React Native para exibição de alertas.
 *   - AsyncStorage: Módulo para armazenamento local de dados.
 *   - Menu: Componente importado de '../components/Menu' para exibição do menu de navegação.
 *   - useFonts, Kanit_500Medium: Hooks e fonte importados do Expo Google Fonts para estilização.
 *   - styles: Estilos definidos em '../styles/StylesPerfil' para estilização dos componentes.
 *
 * Estilos:
 *   - Utiliza estilos definidos em '../styles/StylesPerfil' para estilização dos componentes da interface do perfil.
 *
 * Navegação:
 *   - Utiliza o objeto 'navigation' para navegar entre telas da aplicação, incluindo a tela de boas-vindas ('Bemvindo').
 *
 * @param {object} navigation Objeto de navegação utilizado para navegar entre telas.
 * @returns {JSX.Element} Retorna o JSX que representa a interface de perfil do usuário.
 */

function Perfil({ navigation }) {
  // Definindo estados para armazenar os dados do perfil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [userId, setUserId] = useState('');

  // Estado para armazenar os dados que podem ser alterados
  const [formAlter, setFormAlter] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    id: ''
  });

  {/*
        Nome da função: handleChange;
        Autor: Davi;
        Data de criação: 05/24;
        Parametros de entrada: name (string), value (qualquer);
        Retorno: void;
        Finalidade: Atualizar o estado de um formulário com os novos valores dos campos;
        Descrição/observações: 
            Esta função é utilizada para atualizar os valores do estado do formulário React. Ela recebe o nome do campo e o valor atual do campo como parâmetros e utiliza o método setFormValues para atualizar o estado. O estado atualizado inclui todos os valores anteriores juntamente com o novo valor do campo especificado. Isso permite que o formulário reflita os inputs mais recentes dos usuários.
  */}
  // Função para lidar com a mudança de nome
  const handleNameChange = (text) => {
    setName(text);
    setFormAlter((prev) => ({ ...prev, nome: text })); // Atualiza o formAlter
  };

  // Função para lidar com a mudança de e-mail
  const handleEmailChange = (text) => {
    setEmail(text);
    setFormAlter((prev) => ({ ...prev, email: text })); // Atualiza o formAlter
  };

  // Função para lidar com a mudança de data de nascimento
  const handleDobChange = (text) => {
    const formattedText = formatDate(text);
    setDob(formattedText);
    setFormAlter((prev) => ({ ...prev, dataNascimento: formatToISODate(formattedText) })); // Atualiza o formAlter com a data formatada
  };



  useEffect(() => {
    const showDados = async () => {
      try {
        const id = await AsyncStorage.getItem('ID');
        setUserId(id);
        console.log("ID", id);

        // Só faz a requisição se o userId estiver presente
        if (id) {
          const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ acao: 'selecionar_dados_usuario', dados: id }),
          });
          const dados = (await resposta.json()).dadosCadastro;
          console.log(dados);

          setFormAlter({
            nome: dados.nome_usuario,
            email: dados.email,
            dataNascimento: dados.data_nasc,
            id: id,
          });

          setNomeUsuario(dados.nome_usuario);
          setName(dados.nome_usuario);
          setEmail(dados.email);
          setDob(dados.data_nasc);
        }
      } catch (error) {
        console.error('Erro ao carregar dados!', error);
        Alert.alert('Erro', 'Erro ao carregar dados!');
      }
    };

    showDados(); // Chama a função ao montar o componente
  }, []);


  // Armazenando dados atualizados no AsyncStorage
  AsyncStorage.setItem('email', formAlter.email);
  AsyncStorage.setItem('nome', formAlter.nome);

  // Função para formatar a data de nascimento
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

  // Função para formatar a data de nascimento para o formato ISO (aaaa-mm-dd)
  const formatToISODate = (text) => {
    const [day, month, year] = text.split('/');
    return `${year}-${month}-${day}`;
  };

  // Função para salvar os dados alterados do perfil
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('nome_usuario', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('dataNascimento', dob);
      console.log(formAlter)

      const id = userId;
      const formattedDob = formatToISODate(dob); // Formatar para aaaa-mm-dd

      const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: 'atualizar_cadastro', dados: formAlter }),
      });

      const resultado = await resposta.json();

      if (resultado) {
        setNomeUsuario(name);
        Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      } else {
        Alert.alert('Erro', 'Erro ao salvar dados!');
      }
    } catch (error) {
      console.error('Erro ao salvar dados!', error);
      Alert.alert('Erro', 'Erro ao salvar dados!');
    }
  };

  // Função para deletar o usuário
  const handleDelete = async () => {
    try {
      const idUsuario = formAlter.id; // Obtém o ID do usuário armazenado no estado

      const resposta = await fetch('http://10.135.60.8:8085/delete-usuario', {
        method: 'POST', // ou 'DELETE', dependendo da configuração do seu backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: 'excluir_usuario', id: idUsuario }),
      });

      const resultado = await resposta.json();


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

  // Carregando a fonte personalizada
  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  // Renderização condicional baseada no carregamento da fonte
  if (!fontLoaded) {
    return null;
  }

  // Renderização do componente de perfil
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
          onChangeText={handleNameChange} // Altera aqui
        />
      </View>

      <View style={styles.viewInputPerfil}>
        <Text style={styles.inputPerfil}>E-mail</Text>
        <TextInput
          style={styles.textinputPerfil}
          placeholder="thainaeduarda123@gmail.com"
          value={email}
          onChangeText={handleEmailChange} // Altera aqui
        />
      </View>

      <View style={styles.viewInputPerfil}>
        <Text style={styles.inputPerfil}>Data de nascimento</Text>
        <TextInput
          style={styles.textinputPerfil}
          placeholder="18/05/2007"
          value={dob}
          onChangeText={handleDobChange} // Mantém aqui
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
}

export default Perfil;