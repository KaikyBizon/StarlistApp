/**
 * Nome do Componente: Options
 *
 * Descrição Detalhada:
 *   Componente funcional que representa a barra de navegação e opções da aplicação, incluindo links para 
 *   diferentes seções como Kanban e ToDo. Ele também exibe um botão para criar uma nova tarefa, mas 
 *   apenas na seção ToDo. O componente é responsável por verificar o plano do usuário e condicionalmente 
 *   renderizar opções de gerenciamento de participantes e equipe com base nesse plano.
 *
 * Observações Pertinentes:
 *   1. Utiliza hooks do React como useState e useEffect para gerenciar estados e efeitos colaterais.
 *   2. O estado `planoUsuario` armazena o ID do plano do usuário, obtido por meio de uma requisição ao backend.
 *   3. O componente usa `useLocation` do React Router para determinar a rota atual e exibir o botão de nova tarefa 
 *      apenas quando a rota corresponde a '/todo'.
 *   4. O botão "Nova Tarefa" exibe um formulário para adicionar uma nova tarefa ao ser clicado.
 *   5. A renderização condicional garante que as opções "Participantes" e "Equipe" sejam exibidas apenas se 
 *      o plano do usuário for igual a 4.
 *
 * Funções Principais:
 *   - showPlanoId: Função assíncrona que busca o ID do plano do usuário no backend e atualiza o estado `planoUsuario`.
 *   - handleShowFormulario: Função que exibe o formulário de nova tarefa.
 *   - handleCloseFormulario: Função que oculta o formulário de nova tarefa.
 *
 * Estrutura JSX:
 *   - Renderiza um cabeçalho de navegação (Navbar) que contém:
 *     - Links para as seções Kanban e ToDo, e possivelmente links para "Participantes" e "Equipe" 
 *       dependendo do plano do usuário.
 *     - Um botão "Nova Tarefa" que é exibido apenas na seção ToDo.
 *
 */

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

    // Função showPlanoId para obter e definir o ID do plano do usuário a partir do backend
    //
    // Alterado em 
    // Parâmetros de entrada:
    // Nenhum
    // Retorno:
    // Realiza uma requisição POST para buscar o ID do plano do usuário armazenado no backend e atualiza o estado com o valor retornado.
    // Esta função obtém o ID do usuário no localStorage, envia a requisição para o backend solicitando o ID do plano associado, 
    // e converte o resultado para número, armazenando-o no estado; em caso de erro, loga a falha no console.
    const showPlanoId = async () => {
        const id = localStorage.getItem("ID");
        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
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
    // Função handleShowFormulario para exibir o formulário ao definir o estado showFormulario como verdadeiro
    const handleShowFormulario = () => {
        setShowFormulario(true);
    };

    // Função handleCloseFormulario para ocultar o formulário ao definir o estado showFormulario como falso
    const handleCloseFormulario = () => {
        setShowFormulario(false);
    };

    // useEffect para chamar a função showPlanoId ao montar o componente, carregando o ID do plano do usuário
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