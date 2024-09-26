import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import '../StylesPages/novatarefa.css';
import AddParticipantes from './AddParticipantes.jsx';
import { Link, useLocation } from 'react-router-dom'; // Importar useLocation

function Options() {
    const [showFormulario, setShowFormulario] = useState(false);
    const location = useLocation(); // Usar useLocation para obter o caminho atual

    const handleShowFormulario = () => {
        setShowFormulario(true);
    };

    const handleCloseFormulario = () => {
        setShowFormulario(false);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary nav-fixed">
                <Container>
                    <div className='nav-utensilios'>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to="/kanban">Kanban</Link>
                                <Link to="/todo">ToDo</Link>
                                <Link to="/gerenciarpart">Participantes</Link>
                                <Link to="/gerenciar-equipe">Equipe</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                    <div className="create-nova">
                        {/* Condição para exibir o botão apenas na tela de ToDo */}
                        {location.pathname === '/todo' && (
                            <Button variant="primary" className='btn-novatarefa' onClick={handleShowFormulario}>Nova Tarefa</Button>
                        )}
                    </div>
                </Container>
            </Navbar>

            {showFormulario && (
                <Formulario onClose={handleCloseFormulario} />
            )}
        </>
    );
}

export default Options;
