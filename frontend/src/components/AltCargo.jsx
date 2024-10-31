/**
 * Nome do Componente: AltCargo
 *
 * Descrição Detalhada:
 *   Componente funcional React que permite ao usuário alterar o cargo de um participante.
 *   Utiliza hooks do React para gerenciar a exibição do modal e a seleção do cargo.
 *   O modal exibe o perfil do usuário e permite selecionar um novo cargo a partir de um dropdown.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para controlar a visibilidade do modal de alteração de cargo.
 *   2. O modal contém um formulário que exibe o nome do usuário e um dropdown para seleção do novo cargo.
 *   3. Utiliza `react-bootstrap` para a estrutura visual e o estilo dos componentes.
 *
 * Estado:
 *   - show: Controla a visibilidade do modal para alterar o cargo.
 *
 * Funções:
 *   - handleClose: Função que define o estado 'show' como falso, fechando o modal.
 *   - handleShow: Função que define o estado 'show' como verdadeiro, abrindo o modal.
 *
 * Estrutura JSX:
 *   - Renderiza um botão que, ao ser clicado, abre o modal para alterar o cargo do participante.
 *   - O modal inclui um título, um formulário com o perfil do usuário e um dropdown para selecionar o novo cargo,
 *     além de botões para cancelar ou salvar as alterações.
 *
 */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AltCargo() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Alterar Cargo
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Alterar Cargo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3 perfil-usuario">
                        <div className="perfil-addparticipante">
                            <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="perfil" />
                            <p>João</p>
                        </div>
                        <div className="drop-cargo">
                            <NavDropdown title="Cargo" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.5">Administrador</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button className='botao-enviar-addparticipante' variant='primary' onClick={handleClose}>Salvar alterações</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AltCargo;