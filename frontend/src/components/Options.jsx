import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import '../StylesPages/novatarefa.css';
import AddParticipantes from './AddParticipantes.jsx';
import { Link, useLocation } from 'react-router-dom'; // Importar useLocation

function Options() {
    const [showFormulario, setShowFormulario] = useState(false);
    const location = useLocation(); // Usar useLocation para obter o caminho atual
    const [planoUsuario, setPlanoUsuario] = useState(null);

    const showPlanoId = async () => {
        const id = localStorage.getItem("ID");
        try {
            const resposta = await fetch('http://10.135.60.9:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'selecionar_plano_id', dados: { id } }),
            });
            const dados = (await resposta.json()).dadosCadastro;
            setPlanoUsuario(Number(dados)); // Converte para número
        } catch (error) {
            console.error('Erro ao carregar dados!', error);
        }
    };

    const handleShowFormulario = () => {
        setShowFormulario(true);
    };

    const handleCloseFormulario = () => {
        setShowFormulario(false);
    };

    useEffect(() => {
        showPlanoId();
    }, []);

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
                                {/* Condicional para exibir "Participantes" e "Equipe" apenas se planoUsuario for 4 */}
                                {planoUsuario === 4 && (
                                    <>
                                        <Link to="/gerenciarpart">Participantes</Link>
                                        <Link to="/gerenciar-equipe">Equipe</Link>
                                    </>
                                )}
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