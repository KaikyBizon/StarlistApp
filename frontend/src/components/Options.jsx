import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import '../StylesPages/novatarefa.css';
import AddParticipantes from './AddParticipantes.jsx';
import { Link } from 'react-router-dom';

function Options() {
    // Defina um nome padrão
    const defaultName = 'Nome da lista';

    // Estado para controlar a exibição do modal, o valor do input temporário e mensagens de erro
    const [showModal, setShowModal] = useState(false);
    const [recipientName, setRecipientName] = useState(defaultName);
    const [tempName, setTempName] = useState(defaultName);
    const [error, setError] = useState('');

    useEffect(() => {
        // Carregar o estado do modal e o valor do input do localStorage
        const modalState = localStorage.getItem('modalVisible');
        const name = localStorage.getItem('recipientName');
        
        if (modalState !== null) {
            setShowModal(JSON.parse(modalState));
        }
        // Defina recipientName para o valor armazenado ou o valor padrão se não houver valor
        if (name !== null) {
            setRecipientName(name);
            setTempName(name); // Defina o nome temporário também
        } else {
            setRecipientName(defaultName);
            setTempName(defaultName);
        }
    }, []);

    // Funções para abrir e fechar o modal
    const handleShow = () => {
        setShowModal(true);
        localStorage.setItem('modalVisible', JSON.stringify(true));
    };

    const handleClose = () => {
        setShowModal(false);
        localStorage.setItem('modalVisible', JSON.stringify(false));
    };

    // Função para lidar com a mudança do input temporário
    const handleInputChange = (event) => {
        setTempName(event.target.value);
        setError(''); // Limpar o erro quando o usuário começa a digitar
    };

    const handleSave = () => {
        if (tempName.trim() === '') {
            setError('O nome da lista não pode estar vazio.');
            return;
        }
        setRecipientName(tempName); // Atualiza o nome exibido
        localStorage.setItem('recipientName', tempName); // Salva o nome no localStorage
        handleClose();
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
                        <Formulario />
                    </div>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Título do modal</Modal.Title>
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
                                style={{ boxShadow: 'none', borderColor: 'initial' }} // Remove o efeito de foco
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='fecharlista' variant='tertiary' onClick={handleClose}>Fechar</Button>
                    <Button className='salvarlistanome' variant="primary" onClick={handleSave}>Salvar mudanças</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Options;
