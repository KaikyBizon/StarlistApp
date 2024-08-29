import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario({ tarefa, onClose, listaId }) {
  const [mensagensErro, setMensagensErro] = useState([]); // Armazena as mensagens de erro retornadas do backend
  const [acao, setAcao] = useState('criar_tarefa'); // Estado para armazenar a ação

  // Constante para armazenar os dados da tarefa
  const [dadosTask, setDadosTask] = useState({
    titulo: '',
    descricao: '',
    etiqueta: '',
    data: '',
    horario: '',
    usuario_id: localStorage.getItem("ID"),
    lista_id: listaId  // Inclui o ID da lista
  });

  // Atualiza o estado dos dadosTask quando a prop tarefa é recebida
  useEffect(() => {
    if (tarefa) {
      setDadosTask({
        ...tarefa,
        lista_id: listaId, // Garante que o ID da lista seja mantido ao editar
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
        lista_id: listaId  // Define o ID da lista ao criar uma nova tarefa
      });
      setAcao('criar_tarefa');
    }
  }, [tarefa, listaId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDadosTask((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(dadosTask)
    e.preventDefault();
    try {
      const resposta = await fetch('http://10.135.60.19:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: acao, dados: dadosTask }),
      });

      const resultado = await resposta.json();

      if (resposta.ok && !resultado.mensagens_erro) {
        onClose(); // Fecha o modal após a edição
        window.location.reload(); // Recarrega a página após o fechamento do modal
      } else {
        setMensagensErro(resultado.mensagens_erro);
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
          {mensagensErro.length > 0 && (
            <div className="alert alert-danger">
              {mensagensErro.map((erro, index) => (
                <p key={index}>{erro}</p>
              ))}
            </div>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
            <Button variant="primary save-task" type="submit">
              Salvar tarefa
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Formulario;
