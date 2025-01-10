/**
 * Nome do Componente: Kanban
 *
 * Descrição Detalhada:
 *   Componente funcional React que implementa um sistema de Kanban para gerenciamento de tarefas.
 *   Permite aos usuários adicionar, visualizar e excluir tarefas organizadas em listas. 
 *   Utiliza hooks do React para gerenciar o estado das listas e tarefas, bem como a interação com a API para 
 *   persistência dos dados.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar o estado das listas de tarefas e as informações das tarefas.
 *   2. As listas e tarefas são armazenadas localmente utilizando AsyncStorage para garantir persistência.
 *   3. Inclui modais para adição de novas tarefas e confirmação de exclusões, melhorando a experiência do usuário.
 *   4. A interface é organizada em uma estrutura de rolagem horizontal para fácil visualização das listas.
 *
 * Estado:
 *   - lists: Um array que armazena as listas de tarefas, onde cada lista contém um nome e um array de tarefas.
 *   - selectedListId: Um ID que identifica a lista atualmente selecionada.
 *   - newTask: Um objeto que armazena as informações da nova tarefa a ser adicionada.
 *
 * Funções:
 *   - handleAddTask: Função chamada ao adicionar uma nova tarefa à lista selecionada.
 *   - handleDeleteTask: Função chamada para excluir uma tarefa específica da lista.
 *   - handleSelectList: Função para selecionar uma lista específica para visualizar suas tarefas.
 *
 * Estrutura JSX:
 *   - Renderiza um componente de cabeçalho e um botão para adicionar novas listas.
 *   - Renderiza as listas de tarefas, permitindo a interação do usuário para adicionar e excluir tarefas.
 *
 * @returns {JSX.Element}
 */

import React, { useState, useEffect } from 'react';
import styles from '../styles/StylesKanBan.js';
import { View, TextInput, TouchableOpacity, Alert, ScrollView, Text, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../components/Menu';
import Formulario from './Formulario.js';

function Kanban() {
  const [inputValue, setInputValue] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [tarefasPorCategoria, setTarefasPorCategoria] = useState({});
  const [userId, setUserId] = useState(null);
  const [listaId, setListaId] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [listaParaExcluir, setListaParaExcluir] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [listaParaEditar, setListaParaEditar] = useState(null); // Estado para armazenar a lista a ser editada
  const [novoNomeLista, setNovoNomeLista] = useState(''); // Estado para o novo nome da lista
  const [editModalVisible, setEditModalVisible] = useState(false); // Novo estado para o modal de edição
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [confirmDeleteTaskModalVisible, setConfirmDeleteTaskModalVisible] = useState(false);
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState(null);

  {/*
    Nome da função: fetchCategoriasETarefas;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: Nenhum;
    Retorno: Nenhum retorno explícito;
    Finalidade: Buscar as categorias de tarefas e suas respectivas tarefas associadas a um usuário, e atualizar os estados com os dados obtidos;
    Descrição/observações:
        - Recupera o ID do usuário armazenado no AsyncStorage;
        - Faz uma requisição GET para buscar as categorias de tarefas associadas ao usuário;
        - Se a resposta for bem-sucedida, armazena as categorias no estado 'categorias' e, em seguida, faz uma requisição para buscar as tarefas associadas a cada categoria;
        - Utiliza a função 'fetchTarefasParaCategoria' para buscar as tarefas de cada categoria;
        - Combina as tarefas obtidas em um objeto e atualiza o estado 'tarefasPorCategoria' com os dados das tarefas por categoria;
        - Em caso de erro, exibe uma mensagem de erro no console.
*/}

  const fetchCategoriasETarefas = async () => {
    const id = await AsyncStorage.getItem('ID');
    setUserId(id);

    try {
      const resposta = await fetch(`http://10.135.60.24:8085/lista/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const categoriasResultado = await resposta.json();

      if (resposta.ok) {
        setCategorias(categoriasResultado);

        const tarefasPromises = categoriasResultado.map(async (categoria) => {
          const tarefas = await fetchTarefasParaCategoria(categoria.id);
          return { [categoria.id]: tarefas };
        });

        const tarefasArray = await Promise.all(tarefasPromises);
        const tarefasMap = tarefasArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setTarefasPorCategoria(tarefasMap);
      } else {
        console.error('Erro ao buscar categorias:', categoriasResultado.mensagens_erro);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  // Disparar a função fetchCategoriasETarefas toda vez que a variável 'refresh' for alterada;
  useEffect(() => {
    fetchCategoriasETarefas();
  }, [refresh]);

  {/*
    Nome da função: fetchTarefasParaCategoria;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: categoriaId (ID da categoria para a qual as tarefas serão buscadas);
    Retorno: Um array de tarefas ou um array vazio em caso de erro;
    Finalidade: Buscar as tarefas associadas a uma categoria específica;
    Descrição/observações:
        - Faz uma requisição GET para buscar as tarefas relacionadas à categoria fornecida;
        - Se a resposta for bem-sucedida, retorna as tarefas obtidas;
        - Caso a resposta contenha erros, exibe uma mensagem de erro no console e retorna um array vazio;
        - Em caso de erro na requisição (ex.: erro de rede), exibe uma mensagem de erro no console e retorna um array vazio.
*/}

  const fetchTarefasParaCategoria = async (categoriaId) => {
    const usuario_id = await AsyncStorage.getItem('ID')
    try {
      const resposta = await fetch(`http://10.135.60.24:8085/tarefas/${categoriaId}/${usuario_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        return resultado;
      } else {
        console.error('Erro ao buscar tarefas:', resultado.mensagens_erro);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      return [];
    }
  };

  {/*
    Nome da função: handleSubmit;
    Autor: [Seu nome];
    Data de criação: [Data de criação];
    Parâmetros de entrada: Nenhum;
    Retorno: Nenhum retorno explícito;
    Finalidade: Enviar dados para criar uma nova lista e tratar os possíveis erros;
    Descrição/observações:
        - Verifica se o campo de entrada 'inputValue' não está vazio antes de enviar os dados;
        - Faz uma requisição POST para criar uma nova lista no backend;
        - Envia o ID do usuário e o nome da lista como dados para o backend;
        - Se a resposta for bem-sucedida e a lista for criada, limpa o campo de entrada e faz uma nova requisição para buscar as categorias e tarefas;
        - Em caso de erro, exibe uma mensagem de erro com o motivo retornado pelo backend;
        - Em caso de erro na requisição (ex.: erro de rede), exibe um erro no console.
*/}

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      Alert.alert('Erro', 'O nome da lista não pode estar vazio');
      return;
    }

    try {
      const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acao: 'criar_lista',
          dados: {
            usuario_id: userId,
            nome: inputValue
          }
        }),
      });

      const resultado = (await resposta.json()).listaCriada;

      if (!resposta.ok || resultado.mensagens_erro) {
        Alert.alert('Erro', resultado.mensagens_erro);
      } else {
        setInputValue('');
        fetchCategoriasETarefas();
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  {/*
    Nome da função: confirmarExclusao;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: Nenhum;
    Retorno: Nenhum retorno explícito;
    Finalidade: Confirmar e realizar a exclusão de uma lista, além de atualizar os estados relevantes no frontend;
    Descrição/observações:
        - Faz uma requisição DELETE para excluir uma lista do backend com base no ID fornecido (listaParaExcluir);
        - Se a exclusão for bem-sucedida, remove a lista das categorias e das tarefas associadas, atualizando os estados 'categorias' e 'tarefasPorCategoria';
        - Exibe um alerta informando o sucesso ou falha da operação;
        - Em caso de erro na requisição ou no processamento, exibe uma mensagem de erro no console e um alerta no frontend;
        - Após o processo de exclusão, fecha o modal de confirmação e redefine o estado relacionado à lista a ser excluída.
*/}

  const confirmarExclusao = async () => {
    try {
      const resposta = await fetch(`http://10.135.60.24:8085/lista/${listaParaExcluir}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (resposta.ok) {
        // Filtra as categorias removendo a lista excluída
        setCategorias(categorias.filter(categoria => categoria.id !== listaParaExcluir));

        // Atualiza o estado das tarefas por categoria
        const novoTarefasPorCategoria = { ...tarefasPorCategoria };
        delete novoTarefasPorCategoria[listaParaExcluir];
        setTarefasPorCategoria(novoTarefasPorCategoria);

        Alert.alert('Sucesso', 'Lista excluída com sucesso!');
      } else {
        console.error('Erro ao excluir lista');
        Alert.alert('Erro', 'Não foi possível excluir a lista. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir lista:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a lista.');
    } finally {
      // Fecha o modal e redefine o estado de exclusão
      setConfirmDeleteModalVisible(false);
      setListaParaExcluir(null);
    }
  };

  {/*
    Nome da função: handleEditList;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: Nenhum;
    Retorno: Nenhum retorno explícito;
    Finalidade: Editar o nome de uma lista e atualizar o backend com o novo nome;
    Descrição/observações:
        - Verifica se o novo nome da lista não está vazio antes de prosseguir com a edição;
        - Atualiza o estado local 'categorias' para refletir imediatamente a mudança no nome da lista;
        - Faz uma requisição POST para enviar o novo nome da lista para o backend;
        - Se a resposta for bem-sucedida, fecha o modal de edição e limpa o estado relacionado ao nome da lista e à lista a ser editada;
        - Se houver erros na requisição ou no backend, exibe uma mensagem de erro no frontend;
        - Em caso de erro na requisição (ex.: erro de rede), exibe o erro no console.
*/}

  const handleEditList = async () => {
    if (!novoNomeLista.trim()) {
      Alert.alert('Erro', 'O nome da lista não pode estar vazio');
      return;
    }

    // Atualize o estado local imediatamente
    const novaCategorias = categorias.map((categoria) =>
      categoria.id === listaParaEditar ? { ...categoria, nome: novoNomeLista } : categoria
    );
    setCategorias(novaCategorias);

    try {
      const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acao: 'editar_nome_lista',
          dados: {
            id: listaParaEditar,
            nomeEditando: novoNomeLista,
          }
        }),
      });

      const resultado = (await resposta.json()).listaCriada;

      if (!resposta.ok || resultado.mensagens_erro) {
        Alert.alert('Erro', resultado.mensagens_erro);
      } else {
        setEditModalVisible(false);
        setListaParaEditar(null);
        setNovoNomeLista('');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

{/*
    Nome da função: handleEditTask;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: task (tarefa a ser editada), categoriaId (ID da categoria à qual a tarefa pertence);
    Retorno: Nenhum retorno explícito;
    Finalidade: Preencher os campos de edição com as informações da tarefa selecionada e abrir o modal de edição;
    Descrição/observações:
        - A função formata a data da tarefa de DD/MM/YYYY para o formato YYYY-MM-DD, necessário para o campo de data;
        - Preenche o estado 'selectedTask' com os dados da tarefa, incluindo a etiqueta, descrição e a data formatada;
        - Define o 'categoriaId' no estado 'listaId' para associar a tarefa à categoria correta;
        - Exibe o modal de edição ao alterar o estado 'modalVisible' para true, permitindo ao usuário editar a tarefa.
*/}

  const handleEditTask = (task, categoriaId) => {
    // Função para formatar a data de DD/MM/YYYY para YYYY-MM-DD
    const formatDate = (date) => {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    };
    console.log("ID da categoria:", categoriaId);
    setSelectedTask({
      ...task,
      etiqueta: task.etiqueta || '',
      descricao: task.descricao || '',
      data: task.data ? formatDate(task.data) : ''
    });
    setListaId(categoriaId);
    setModalVisible(true);
  };

  // Disparar a função fetchCategoriasETarefas toda vez que a variável 'refresh' for alterada;
  const handleAddNewTask = (categoriaId) => {
    setListaId(categoriaId);
    setSelectedTask(null);
    setModalVisible(true);
  };

  // Preparar os dados da tarefa para exclusão e exibir o modal de confirmação de exclusão;
  const handleDeleteTask = (task, categoriaId) => {
    console.log("Tarefa selecionada para exclusão:", task);
    setTarefaParaExcluir({ ...task, categoria_id: categoriaId });
    setConfirmDeleteTaskModalVisible(true);
  };

  {/*
    Nome da função: confirmarExclusaoTarefa;
    Autor: Leticia;
    Data de criação: 12/24;
    Parâmetros de entrada: Nenhum;
    Retorno: Nenhum retorno explícito;
    Finalidade: Confirmar e realizar a exclusão de uma tarefa e atualizar o estado das tarefas por categoria;
    Descrição/observações:
        - Verifica se os dados da tarefa a ser excluída estão completos antes de prosseguir;
        - Faz uma requisição POST para excluir a tarefa no backend, enviando o ID da tarefa e o ID da categoria;
        - Se a tarefa for excluída com sucesso, remove a tarefa do estado 'tarefasPorCategoria' e exibe um alerta de sucesso;
        - Se a categoria da tarefa não for encontrada ou a requisição falhar, exibe um alerta de erro;
        - Em caso de erro na requisição (ex.: erro de rede), exibe o erro no console e um alerta no frontend;
        - Após a exclusão, fecha o modal de confirmação e redefine o estado da tarefa a ser excluída.
*/}

  const confirmarExclusaoTarefa = async () => {
    try {
      console.log("Tarefa para excluir:", tarefaParaExcluir.id);
      console.log("Categoria da tarefa:", tarefaParaExcluir.categoria_id);

      if (!tarefaParaExcluir || !tarefaParaExcluir.id || !tarefaParaExcluir.categoria_id) {
        console.error("Dados de tarefa inválidos:", tarefaParaExcluir);
        return Alert.alert("Erro", "Dados da tarefa estão incompletos.");
      }

      const resposta = await fetch(`http://10.135.60.24:8085/receber-dados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acao: 'excluirTarefa',
          dados: {
            tarefaId: tarefaParaExcluir.id,
            categoriaId: tarefaParaExcluir.categoria_id
          }
        }),
      });

      if (resposta.ok) {
        // Verifica se a categoria existe no estado antes de tentar filtrar
        if (!tarefasPorCategoria[tarefaParaExcluir.categoria_id]) {
          console.error(`Categoria com ID ${tarefaParaExcluir.categoria_id} não encontrada.`);
          return Alert.alert("Erro", "Categoria da tarefa não encontrada.");
        }

        // Remove a tarefa excluída do estado
        const novasTarefas = { ...tarefasPorCategoria };
        novasTarefas[tarefaParaExcluir.categoria_id] = novasTarefas[tarefaParaExcluir.categoria_id].filter(
          tarefa => tarefa.id !== tarefaParaExcluir.id
        );
        setTarefasPorCategoria(novasTarefas);

        Alert.alert('Sucesso', 'Tarefa excluída com sucesso!');
      } else {
        Alert.alert('Erro', 'Não foi possível excluir a tarefa. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a tarefa.');
    } finally {
      setConfirmDeleteTaskModalVisible(false);
      setTarefaParaExcluir(null);
    }
  };


  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da lista"
          placeholderTextColor="#FFF88E"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.btnAdcList}>
          <Text style={styles.btnText}>Adicionar lista</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        {categorias.map((categoria) => (
          <View key={categoria.id} style={styles.categoriaContainer}>
            <View style={styles.categoriaLista}>
              <Text style={styles.tituloLista}>{categoria.nome}</Text>
              <TouchableOpacity onPress={() => {
                setNovoNomeLista(categoria.nome); // Configura o novo nome da lista
                setListaParaEditar(categoria.id); // Define a lista a ser editada
                setEditModalVisible(true); // Abre o modal de edição
              }}>
                <Image source={require('../assets/images/editar_lista.png')} style={styles.editarLista} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.tarefasContainer}>
              {tarefasPorCategoria[categoria.id] && tarefasPorCategoria[categoria.id].map((tarefa, index) => (
                <View key={index} style={styles.tarefaItem}>
                  <View style={styles.editarDeleteTask}>
                    <Text style={styles.tituloTarefa}>{tarefa.titulo}</Text>
                    <TouchableOpacity onPress={() => handleEditTask(tarefa, categoria.id)}>
                      <Image source={require('../assets/images/editar_lista.png')} style={styles.editarTask} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDeleteTask(tarefa, categoria.id)}>
                      <Image source={require('../assets/images/lixeira.png')} style={styles.excluirTask} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.dataHora}>Data: {tarefa.data}</Text>
                  <Text style={styles.dataHora}>Hora: {tarefa.horario}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnAdicionarTarefa}
                onPress={() => handleAddNewTask(categoria.id)}
              >
                <Text style={styles.btnText}>Nova tarefa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setListaParaExcluir(categoria.id); // Define a lista a ser excluída
                  setConfirmDeleteModalVisible(true); // Abre o modal de confirmação
                }}
              >
                <Image source={require('../assets/images/lixeira.png')} style={styles.excluirLista} />
              </TouchableOpacity>
            </View>
          </View>

        ))}
      </ScrollView>

      {/* Modal de exclusão de lista completa*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={() => setConfirmDeleteModalVisible(false)}
      >
        <View style={styles.modalExcluirLista}>
          <View style={styles.modalDeleteList}>
            <Text style={styles.modalTextList}>Deseja mesmo excluir a lista e suas tarefas?</Text>
            <View style={styles.buttonDeleteList}>
              <TouchableOpacity onPress={confirmarExclusao} style={styles.btnDelete}>
                <Text style={styles.btnTextExcluirList}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirmDeleteModalVisible(false)} style={styles.btnFechar}>
                <Text style={styles.btnTextExcluirList}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Edição nome da lista*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainerList}>
          <View style={styles.modalContenList}>
            <Text style={styles.modalTitleList}>Editar Nome da Lista</Text>
            <TextInput
              style={styles.inputModalList}
              placeholder="Novo nome da lista"
              value={novoNomeLista}
              onChangeText={setNovoNomeLista}
            />
            <View style={styles.modalButtonsList}>
              <TouchableOpacity onPress={handleEditList} style={styles.btnConfirmList}>
                <Text style={styles.btnTextList}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.btnCancelList}>
                <Text style={styles.btnTextList}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteTaskModalVisible}
        onRequestClose={() => setConfirmDeleteTaskModalVisible(false)}
      >
        <View style={styles.modalExcluirLista}>
          <View style={styles.modalDeleteList}>
            <Text style={styles.modalTextList}>Deseja mesmo excluir esta tarefa?</Text>
            <View style={styles.buttonDeleteList}>
              <TouchableOpacity onPress={confirmarExclusaoTarefa} style={styles.btnDelete}>
                <Text style={styles.btnTextExcluirList}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirmDeleteTaskModalVisible(false)} style={styles.btnFechar}>
                <Text style={styles.btnTextExcluirList}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <Formulario
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        userId={userId}
        listaId={listaId}
        selectedTask={selectedTask}
        refreshTasks={fetchCategoriasETarefas}
      />
    </View>
  );
}

export default Kanban;