/**
 * Nome do Componente: Informacao
 *
 * Descrição Detalhada:
 *   Componente funcional que exibe informações relacionadas a tarefas e permite ao usuário criar uma nova tarefa através de um modal.
 *   Utiliza o estado local para gerenciar a visibilidade do modal e o Bootstrap para a estrutura visual.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para controlar a exibição do modal (variável 'show').
 *   2. As funções 'handleClose' e 'handleShow' são utilizadas para abrir e fechar o modal, respectivamente.
 *   3. O modal contém campos para inserir o nome do evento, horário, descrição, data do evento e um campo para requisitar participantes.
 *   4. Os componentes de formulário são estilizados com Bootstrap, incluindo botões e grupos de entrada.
 *   5. O botão para abrir o modal é estilizado com a classe 'btn-novatarefa' e é representado por um símbolo de adição (+).
 *
 * Estrutura JSX:
 *   - Renderiza um div com a classe 'informacoes', contendo:
 *     - Um cabeçalho indicando o "1º Trimestre".
 *     - Uma seção para criar nova tarefa, incluindo um botão que aciona a abertura do modal.
 *     - Um modal que exibe um formulário para entrada de dados da nova tarefa.
 *     - O modal contém:
 *       - Um campo para o nome do evento.
 *       - Um campo para o horário do evento.
 *       - Um campo para a descrição do evento.
 *       - Um campo para a data do evento.
 *       - Um campo para lembrete.
 *       - Um campo para requisitar participantes.
 *       - Botões para fechar o modal e salvar a tarefa.
 *
 */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../StylesPages/Informacao.css'

function Informacao() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false); // Função handleClose que oculta o modal ao definir show como false.
    const handleShow = () => setShow(true); // Função handleShow que exibe o modal ao definir show como true.

    return (
        <div className="informacoes">
            <div className="trimestre">
                <h1>1º Trimestre</h1>
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

export { Informacao }; 