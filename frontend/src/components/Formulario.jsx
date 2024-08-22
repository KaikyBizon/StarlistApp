import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario({ onTarefaSalva }) { // Adiciona a prop onTarefaSalva
  const [show, setShow] = useState(false);
  const [mensagensErro, setMensagensErro] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //constante que armazena os valores inseridos nos inputs
  const [dadosTask, setDadosTask] = useState({
    acao: 'criar_tarefa',
    titulo: '',
    descricao: '',
    data: '',
    horario: '',
    usuario_id: localStorage.getItem("ID")
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDadosTask((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://10.135.60.18:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosTask),
      });

      const resultado = (await resposta.json()).dados_processados;

      if (resposta.ok && !resultado.mensagens_erro) {
        setShow(false);
        setDadosTask({
          titulo: '',
          descricao: '',
          data: '',
          horario: '',
          usuario_id: localStorage.getItem("ID")
        });
      } else {
        setMensagensErro(resultado.mensagens_erro);
        if (onTarefaSalva) {
          onTarefaSalva(); // Chama a função de callback
        }
        window.location.reload() // recarrega a página ao criar uma tarefa
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <>
      <div className='abrir-task'>
        <Button className="btn-novatarefa" variant="primary" onClick={handleShow}>
          +
        </Button>
        <p>Nova tarefa</p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='Criartask_titulo'>Nova tarefa</Modal.Title>
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
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="primary save-task" type="submit">
                Salvar tarefa
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Formulario;
