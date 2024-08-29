import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import '../StylesPages/novatarefa.css';
import AddParticipantes from './AddParticipantes.jsx';
import { Link } from 'react-router-dom';

function Options() {
    const defaultName = 'Nome da lista';
    const [showModal, setShowModal] = useState(false);
    const [recipientName, setRecipientName] = useState(defaultName);
    const [tempName, setTempName] = useState(defaultName);
    const [error, setError] = useState('');
    const [showFormulario, setShowFormulario] = useState(false); // Estado para controlar a exibição do formulário

    useEffect(() => {
        const modalState = localStorage.getItem('modalVisible');
        const name = localStorage.getItem('recipientName');
        
        if (modalState !== null) {
            setShowModal(JSON.parse(modalState));
        }
        if (name !== null) {
            setRecipientName(name);
            setTempName(name);
        } else {
            setRecipientName(defaultName);
            setTempName(defaultName);
        }
    }, []);

    const handleShow = () => {
        setShowModal(true);
        localStorage.setItem('modalVisible', JSON.stringify(true));
    };

    const handleClose = () => {
        setShowModal(false);
        localStorage.setItem('modalVisible', JSON.stringify(false));
    };

    const handleInputChange = (event) => {
        setTempName(event.target.value);
        setError('');
    };

    const handleSave = () => {
        if (tempName.trim() === '') {
            setError('O nome da lista não pode estar vazio.');
            return;
        }
        setRecipientName(tempName);
        localStorage.setItem('recipientName', tempName);
        handleClose();
    };

    const handleShowFormulario = () => {
        setShowFormulario(true); // Exibe o formulário
    };

    const handleCloseFormulario = () => {
        setShowFormulario(false); // Fecha o formulário
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary nav-fixed">
                <Container>
                    <div className='nav-utensilios'>
                        <Navbar.Brand href="#home" onClick={handleShow}> {recipientName}</Navbar.Brand>
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
                        <Button variant="primary" className='btn-novatarefa' onClick={handleShowFormulario}>Nova Tarefa</Button>
                    </div>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Altere o título da lista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group controlId="formRecipientName">
                            <Form.Label>Título da lista:</Form.Label>
                            <Form.Control
                                className='inputlista'
                                type="text"
                                value={tempName}
                                onChange={handleInputChange}
                                style={{ boxShadow: 'none', borderColor: 'initial' }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='fecharlista' variant='tertiary' onClick={handleClose}>Fechar</Button>
                    <Button className='salvarlistanome' variant="primary" onClick={handleSave}>Salvar mudanças</Button>
                </Modal.Footer>
            </Modal>

            {showFormulario && (
                <Formulario onClose={handleCloseFormulario} />
            )}
        </>
    );
}

export default Options;
