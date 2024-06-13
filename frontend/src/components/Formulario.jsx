import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dadosTask, setDadosTask] = useState({
    titulo: '',
    descricao: '',
    data: '',
    horario: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDadosTask((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
          <Modal.Title>Nova tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
