import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario({ tarefa, onClose }) {
  const [mensagensErro, setMensagensErro] = useState([]); //Armazena as mensagens de erro retornadas do backend
  //Constante para armazenar os dados da tarefa
  const [dadosTask, setDadosTask] = useState({
    acao: 'criar_tarefa', //Ação usada para o backend saber qual função executar
    titulo: '',
    descricao: '',
    etiqueta: '',
    data: '',
    horario: '',
    usuario_id: localStorage.getItem("ID")
  });

  // Atualiza o estado dos dadosTask quando a prop tarefa é recebida
  useEffect(() => {
    if (tarefa) {
      setDadosTask({ ...tarefa, acao: 'editar_tarefa' });
    } else {
      setDadosTask({
        acao: 'criar_tarefa',
        titulo: '',
        descricao: '',
        etiqueta: '',
        data: '',
        horario: '',
        usuario_id: localStorage.getItem("ID")
      });
    }
  }, [tarefa]);

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
        body: JSON.stringify(dadosTask),
      });

      const resultado = (await resposta.json()).dados_processados;

      if (resposta.ok && !resultado.mensagens_erro) {
        onClose(); // Fecha o modal após a edição
      } else {
        setMensagensErro(resultado.mensagens_erro);
      }
      window.location.reload()
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dadosTask.acao === 'editar_tarefa' ? "Editar tarefa" : "Nova tarefa"}</Modal.Title>
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
