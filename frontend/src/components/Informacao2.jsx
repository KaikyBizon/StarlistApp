import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../StylesPages/Informacao.css'

function Informacao2() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="informacoes">
            <div className="trimestre">
                <h1>2º Trimestre</h1>
            </div>
            <div className="nova-task">
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
                                />
                                {/*Input para colocar horário do evento*/}
                                <Form.Control type="time" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 descricao"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                {/*Textarea para colocar descrição do evento*/}
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 data-evento"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                {/*Input para colocar data do evento*/}
                                <Form.Control type="date" />
                                {/*Input para colocar lembrete*/}
                                <Form.Control type="time" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Requisitar participante</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2">@starlist.com</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                        {/*Botões para fechar o modal e salvar a tarefa*/}
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="primary save-task" onClick={handleClose}>
                            Salvar tarefa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export { Informacao2 };