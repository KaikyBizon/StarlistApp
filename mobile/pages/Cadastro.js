/**
 * Nome do Componente: Cadastro
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que representa um formulário de cadastro. 
 *   Ele utiliza hooks do React para gerenciar o estado do formulário e mensagens de erro.
 *   O formulário é submetido via uma requisição POST para 'http://10.135.60.7:8085/receber-dados'.
 *   Exibe mensagens de erro, se houver, e imprime mensagens de sucesso ou falha no console.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar o estado do formulário (formValues) e das mensagens de erro.
 *   2. O evento 'handleChange' é acionado ao digitar nos campos do formulário e atualiza o estado correspondente.
 *   3. O formulário é submetido via requisição 'fetch' ao servidor, e a resposta é tratada no bloco 'try-catch'.
 *   4. Exibe mensagens de erro no console e no formulário, se houverem, após a resposta do servidor.
 *
 * Estado:
 *   - formValues: Armazena os valores do formulário.
 *   - mensagensErro: Armazena mensagens de erro vindas do servidor.
 *
 * Funções:
 *   - handleChange: Atualiza o estado 'formValues' ao digitar nos campos do formulário.
 *   - handleSubmit: Envia os dados do formulário para o servidor e trata a resposta.
 *
 * Estrutura JSX:
 *   - Renderiza um formulário com campos para nome, e-mail, senha, confirmação de senha e data de nascimento.
 *   - Exibe mensagens de erro abaixo dos campos correspondentes.
 *   - Possui botões para confirmar o cadastro e cancelar.
 *
 * @returns {JSX.Element}
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import styles from '../styles/StylesCadastro.js';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import { TextInputMask } from 'react-native-masked-text';

export default function Cadastro({ navigation }) {
  {/*
        Nome da função: formValues;
        Autor: Kaiky;
        Data de criação: 05/24;
        Parametros de entrada: setFormValues;
        Retorno: Dados inseridos;
        Finalidade: Armazenar os dados inseridos pelo usuário no cadastro;
        Descrição/observações: 
            - Ação é usado para o backend saber qual tipo de ação tomar com as informações recebidas;
            - Os dados são enviados para o backend via requisição pela função handleSubmit.
    */}
  const [formValues, setFormValues] = useState({
    acao: 'cadastro',
    nome: '',
    email: '',
    senha: '',
    confirme: '',
    dataNascimento: '',
  });

  {/*
        Nome da função: handleChange;
        Autor: Kaiky;
        Data de criação: 05/24;
        Parametros de entrada: name (string), value (qualquer);
        Retorno: void;
        Finalidade: Atualizar o estado de um formulário com os novos valores dos campos;
        Descrição/observações: 
            Esta função é utilizada para atualizar os valores do estado do formulário React. Ela recebe o nome do campo e o valor atual do campo como parâmetros e utiliza o método `setFormValues` para atualizar o estado. O estado atualizado inclui todos os valores anteriores juntamente com o novo valor do campo especificado. Isso permite que o formulário reflita os inputs mais recentes dos usuários.
    */}
  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [mensagensErro, setMensagensErro] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Converte a data no formato DD/MM/AAAA para ISO (AAAA-MM-DD)
  const convertDateToISO = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  {/*
        Nome da função: handleSubmit;
        Autor: Kaiky;
        Data de criação: 05/24;
        Parametros de entrada: e (Event);
        Retorno: Resposta do backend;
        Finalidade: Enviar os dados do formulário para um servidor;
        Descrição/observações: 
            Esta função é chamada quando o formulário é submetido. Ela previne o comportamento padrão do formulário para evitar o recarregamento da página. Os dados do formulário são coletados e preparados para envio, incluindo a conversão de datas para o formato ISO. Em seguida, uma requisição HTTP POST é feita para enviar os dados para um servidor. Dependendo da resposta, mensagens de erro são exibidas em um modal ou o usuário é redirecionado para a tela inicial. O tratamento de erros é implementado para capturar e registrar quaisquer problemas durante o envio dos dados.
    */}
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formValues,
      dataNascimento: convertDateToISO(formValues.dataNascimento),
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

      // Verifica se houve erro na resposta
      if (!resposta.ok || resultado.mensagens_erro.length > 0) {
        setMensagensErro(resultado.mensagens_erro);
        setModalVisible(true);  // Exibe o modal com as mensagens de erro
      } else {
        navigation.navigate("home"); // Navega para a tela inicial em caso de sucesso
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  {/*
        Nome da função: useLayoutEffect para configuração do cabeçalho;
        Autor: Kaiky;
        Data de criação: 05/24;
        Parametros de entrada: Nenhum, mas depende da variável `navigation` de props;
        Retorno: Nada;
        Finalidade: Modificar a configuração do cabeçalho da navegação;
        Descrição/observações:
            Este uso do `useLayoutEffect` é empregado para ajustar as opções de navegação no React Native, especificamente para ocultar o cabeçalho de uma tela. Ao executar o efeito, ele chama `navigation.setOptions` para alterar as configurações de navegação, definindo a propriedade `headerShown` como `false`, o que oculta o cabeçalho dessa tela. Essa mudança é aplicada de forma síncrona e visível para o usuário, antes que o navegador pinte a tela, garantindo que a interface do usuário seja atualizada conforme esperado. O efeito é dependente da variável `navigation`, o que significa que ele será reexecutado sempre que essa variável mudar.
    */}
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [fontLoaded] = useFonts({
    Kanit_500Medium,
  });

  if (!fontLoaded) {
    return null; // Aguarda a carga da fonte
  }

  return (
    <KeyboardAvoidingView style={styles.background}>

      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../assets/images/logo_starlistMobile.png')} resizeMode='contain' />
      </View>

      <View style={styles.containerInputs}>
        <Text style={styles.label}>NOME</Text>
        <TextInput style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('nome', text)} placeholder='Nome Completo' value={formValues.nome} />

        <Text style={styles.label}>E-MAIL</Text>
        <TextInput style={styles.inputs} autoCorrect={false} keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => handleChange('email', text)} placeholder='E-mail' value={formValues.email} />

        <Text style={styles.label}>SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('senha', text)} placeholder='Senha' value={formValues.senha} />

        <Text style={styles.label}>CONFIRME SUA SENHA</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} autoCorrect={false} onChangeText={(text) => handleChange('confirme', text)} placeholder='Confirmar sua senha' value={formValues.confirme} />

        <Text style={styles.label}>DATA DE NASCIMENTO</Text>
        <TextInputMask style={styles.inputs} keyboardType="numeric" autoCorrect={false} onChangeText={(text) => handleChange('dataNascimento', text)} type={'datetime'} options={{ format: 'DD/MM/YYYY' }} placeholder='Data de nascimento' value={formValues.dataNascimento} />

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
