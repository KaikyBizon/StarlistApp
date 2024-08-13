import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Form } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import '../StylesPages/novatarefa.css';
import AddParticipantes from './AddParticipantes.jsx';
import { Link } from 'react-router-dom';

function Options() {
    // Estado para controlar a exibição do modal
    const [showModal, setShowModal] = useState(false);
    const [recipientName, setRecipientName] = useState('');

    // Funções para abrir e fechar o modal
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Função para lidar com a mudança do input
    const handleInputChange = (event) => {
        setRecipientName(event.target.value);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary nav-fixed">
                <Container>
                    <div className='nav-utensilios'>
                        <Navbar.Brand href="#home" onClick={handleShow}>
                            Nome da lista
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to="/gerenciarpart">Participantes</Link>
                                <Link to="/gerenciar-equipe">Equipe</Link>
                                <NavDropdown className='drop-options' title="Opções" id="basic-nav-dropdown">
                                    <AddParticipantes>
                                        <NavDropdown.Item href="#action/3.1">Adicionar participantes</NavDropdown.Item>
                                    </AddParticipantes>
                                    <NavDropdown.Divider />
                                    <Link to="/kanban">
                                        <NavDropdown.Item href="#action/3.3">KanBan</NavDropdown.Item>
                                    </Link>
                                    <Link to="/todo">
                                        <NavDropdown.Item href="#action/3.4">ToDo</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                    <div className="create-nova">
                        <Formulario />
                    </div>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Título do modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRecipientName">
                        <Form.Label>Título da lista:</Form.Label>
                            <Form.Control className='inputlista' type="text" value={recipientName} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='fecharlista'  onClick={handleClose}>Fechar</Button>
                    <Button className='salvarlistanome' variant="primary" onClick={handleClose}>Salvar mudanças</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Options;
