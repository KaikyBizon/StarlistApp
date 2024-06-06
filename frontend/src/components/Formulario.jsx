import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
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
  })

  const handleChange = (name, value) => {
    setDadosTask((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch('http://10.135.60.7:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const resultado = (await resposta.json()).dados_processados;

      if (!resposta.ok || resultado.mensagens_erro) {
        // Assume que a estrutura de erro vem no campo 'mensagens_erro'
        setMensagensErro(resultado.mensagens_erro);
      } else {
        navigation.navigate("home")
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };


  return (
    <>

      <div className='abrir-task'>
        {/*Botão para abrir o modal de nova tarefa*/}
        <Button className="btn-novatarefa" variant="primary" onClick={handleShow}>
          +
        </Button>
        <p>Nova tarefa</p>
      </div>
      {/*Botão "X" para fechar modal de nova tarefa*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/*Título modal*/}
          <Modal.Title>Nova tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/*Input para colocar nome do evento*/}
            <Form.Group className="mb-3 nome-evento" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Nome do evento"
                autoFocus
                name='titulo'
                value={dadosTask.titulo}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 descricao"
              controlId="exampleForm.ControlTextarea1"
            >
              {/*Textarea para colocar descrição do evento*/}
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3} name='descricao'
                value={dadosTask.descricao} />
            </Form.Group>
            <Form.Group
              className="mb-3 data-evento"
              controlId="exampleForm.ControlTextarea1"
            >
              {/*Input para colocar data do evento*/}
              <Form.Control type="date" name='data'
                value={dadosTask.data} />
              {/*Input para colocar lembrete*/}
              <Form.Control type="time" name='hora'
                value={dadosTask.hora} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          {/*Botões para fechar o modal e salvar a tarefa*/}
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary save-task" onClick={handleChange}>
            Salvar tarefa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Formulario;