/**
 * Nome do Componente: Formulario
 *
 * Descrição Detalhada:
 *   Componente funcional React que apresenta um formulário para criação ou edição de tarefas. 
 *   Utiliza hooks do React para gerenciar o estado das mensagens de erro, dados da tarefa e o tipo de ação (criar ou editar).
 *   O formulário inclui campos para título, descrição, etiqueta, data e horário, permitindo que os usuários insiram ou editem essas informações.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar estados como mensagens de erro, dados da tarefa e tipo de ação.
 *   2. O hook 'useEffect' é usado para atualizar os dados do formulário com base na tarefa selecionada, definindo a ação como 'editar_tarefa' ou 'criar_tarefa'.
 *   3. A função 'handleChange' controla as alterações nos campos do formulário e aplica limites de caracteres para o título e descrição.
 *   4. A função 'handleSubmit' lida com o envio dos dados do formulário para o backend, processando a resposta e exibindo mensagens de erro, se necessário.
 *
 * Estado:
 *   - mensagensErro: Array que armazena as mensagens de erro retornadas do backend.
 *   - acao: String que define se a ação atual é 'criar_tarefa' ou 'editar_tarefa'.
 *   - dadosTask: Objeto que contém as informações da tarefa a ser criada ou editada.
 *
 * Funções:
 *   - formatarData: Converte a data para o formato 'yyyy-MM-dd' se necessário.
 *   - handleChange: Atualiza o estado 'dadosTask' com os valores dos campos do formulário, limitando o título e a descrição a 50 e 100 caracteres, respectivamente.
 *   - handleSubmit: Envia os dados da tarefa para o backend e processa a resposta, exibindo mensagens de erro ou fechando o modal conforme necessário.
 *
 * Estrutura JSX:
 *   - Renderiza um modal que contém um formulário com campos para título, descrição, etiqueta, data e horário.
 *   - Exibe listas de mensagens de erro abaixo de cada campo, se houver.
 *   - Inclui botões para fechar o modal ou salvar a tarefa.
 */

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario({ tarefa, onClose, listaId }) {
  const [mensagensErro, setMensagensErro] = useState([]); // Armazena as mensagens de erro retornadas do backend
  const [acao, setAcao] = useState('criar_tarefa'); // Estado para armazenar a ação

  // Estado inicial dadosTask para armazenar informações de uma nova tarefa a ser criada
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // Nenhum (estado inicial)
  // Retorno:
  // Um objeto de estado inicial contendo informações da tarefa: título, descrição, etiqueta, data, horário, 
  // usuário_id (obtido do localStorage), e lista_id (com valor null se listaId não existir)
  // Este estado armazena as propriedades da tarefa que serão manipuladas e atualizadas no formulário, 
  // com valores vazios para título, descrição, etiqueta, data e horário, e valores definidos para usuario_id e lista_id.
  const [dadosTask, setDadosTask] = useState({
    titulo: '',
    descricao: '',
    etiqueta: '',
    data: '',
    horario: '',
    usuario_id: localStorage.getItem("ID"),
    lista_id: listaId || null  // Armazena null se listaId não existir
  });

  // Função para converter a data para o formato "yyyy-MM-dd" se necessário
  function formatarData(data) {
    const regexDataErrada = /^\d{2}\/\d{2}\/\d{4}$/;

    if (regexDataErrada.test(data)) {
      const [dia, mes, ano] = data.split('/');
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  }

  // useEffect para atualizar o estado dadosTask com base em uma tarefa selecionada ou redefinir para um novo formulário de tarefa
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // tarefa - objeto - representa a tarefa selecionada para edição (ou undefined para criação de nova tarefa)
  // listaId - string ou null - identifica a lista à qual a tarefa pertence, se aplicável
  // Retorno:
  // Atualiza o estado dadosTask para refletir os valores da tarefa existente ou um objeto vazio para uma nova tarefa; define a ação para 'editar_tarefa' ou 'criar_tarefa'.
  // Este useEffect é acionado sempre que tarefa ou listaId mudam; se uma tarefa for fornecida, seus dados são formatados e aplicados ao estado, 
  // caso contrário, um estado padrão de nova tarefa é definido, e o tipo de ação (criar ou editar) é atualizado para controle de operação.
  useEffect(() => {
    if (tarefa) {
      setDadosTask({
        ...tarefa,
        data: formatarData(tarefa.data), // Converte e salva em dadosTask.data
      });
      setAcao('editar_tarefa');
    } else {
      setDadosTask({
        titulo: '',
        descricao: '',
        etiqueta: '',
        data: '',
        horario: '',
        usuario_id: localStorage.getItem("ID"),
        lista_id: listaId || null  // Armazena null se listaId não existir
      });
      setAcao('criar_tarefa');
    }
  }, [tarefa, listaId]);

  // Função handleChange para atualizar o estado dadosTask com os valores dos campos do formulário, aplicando limites de caracteres
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // event - objeto - evento disparado ao alterar um campo de entrada no formulário
  // Retorno:
  // Atualiza o estado dadosTask com o valor de entrada do usuário para o campo específico, limitando o título a 50 caracteres e a descrição a 100 caracteres.
  // Esta função verifica o nome e valor do campo, e aplica restrições de comprimento para título e descrição; se o valor ultrapassa os limites, 
  // a atualização é interrompida; caso contrário, o estado é atualizado preservando valores anteriores de outros campos.
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Limita o título a 20 caracteres
    if (name === 'titulo' && value.length > 50) {
      return;
    }

    // Limita a descrição a 100 caracteres
    if (name === 'descricao' && value.length > 100) {
      return;
    }

    setDadosTask((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Função handleSubmit para enviar os dados da tarefa para o backend e processar a resposta
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // e - objeto - evento disparado ao submeter o formulário
  // Retorno:
  // Realiza uma requisição POST para enviar os dados atualizados da tarefa ao backend; exibe mensagens de erro ou fecha o modal com base no resultado.
  // Esta função previne o comportamento padrão do formulário, envia dadosTask e a ação (criar ou editar tarefa) em formato JSON ao backend, 
  // e processa a resposta: exibe mensagens de erro se houverem ou fecha o modal após sucesso. Em caso de falha, o erro é logado no console.
  const handleSubmit = async (e) => {
    console.log(dadosTask, acao)
    e.preventDefault();

    try {
      const resposta = await fetch('http://10.135.60.10:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: acao, dados: dadosTask }),
      });

      const resultado = (await resposta.json()).dados_tarefa;
      console.log(resultado)

      if (resultado.error) {
        setMensagensErro(resultado.mensagens_erro)
      } else {
        onClose(); // Fecha o modal após a edição
        window.location.reload(); // Recarrega a página após o fechamento do modal
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{acao === 'editar_tarefa' ? "Editar tarefa" : "Nova tarefa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 nome-evento" controlId="formTitulo">
            <Form.Control
              type="text"
              placeholder="Nome do evento"
              autoFocus
              name='titulo'
              value={dadosTask.titulo}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_titulo}</li>
            ))}
          </ul>
          <Form.Group className="mb-3 descricao" controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name='descricao'
              value={dadosTask.descricao}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_descricao}</li>
            ))}
          </ul>
          <Form.Group className="mb-3 etiqueta-evento" controlId="formEtiqueta">
            <Form.Select
              name='etiqueta'
              value={dadosTask.etiqueta}
              onChange={handleChange}
            >
              <option value="">Selecione uma etiqueta</option>
              <option value="Importante">Importante</option>
              <option value="Pendência">Pendência</option>
              <option value="Reunião">Reunião</option>
            </Form.Select>
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_etiqueta}</li>
            ))}
          </ul>
          <Form.Group className="mb-3 data-evento" controlId="formData">
            <Form.Control
              type="date"
              name='data'
              value={dadosTask.data}
              onChange={handleChange}
            />
            <Form.Control
              type="time"
              name='horario'
              value={dadosTask.horario}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_data}</li>
            ))}
          </ul>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_hora}</li>
            ))}
          </ul>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={onClose}
              style={{
                padding: '7px 20px',
                border: 'none',
                outline: 'none',
                transition: 'none'
              }}
            >
              Fechar
            </Button>
            <Button
              variant="primary save-task"
              type="submit"
              style={{
                backgroundColor: '#faed27',
                color: '#000', 
                border: 'none',
                padding: '7px 15px',
                outline: 'none',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#000'; 
                e.target.style.color = '#faed27'; 
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#faed27'; 
                e.target.style.color = '#000'; 
              }}
            >
              Salvar tarefa
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Formulario;