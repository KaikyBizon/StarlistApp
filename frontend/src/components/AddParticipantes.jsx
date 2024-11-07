/**
 * Nome do Componente: AddParticipantes
 *
 * Descrição Detalhada:
 *   Componente funcional React que exibe um modal para adicionar participantes a uma equipe.
 *   Utiliza hooks do React para gerenciar a exibição do modal e o estado dos inputs.
 *   Permite que o usuário insira o e-mail do participante e selecione o cargo desejado em um dropdown.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para controlar a visibilidade do modal.
 *   2. O modal contém um formulário onde o usuário pode inserir o e-mail do participante e selecionar um cargo.
 *   3. O componente usa `react-bootstrap` para a estrutura visual e o estilo dos componentes.
 *
 * Estado:
 *   - show: Controla a visibilidade do modal para adicionar participantes.
 *
 * Funções:
 *   - handleClose: Função que define o estado 'show' como falso, fechando o modal.
 *   - handleShow: Função que define o estado 'show' como verdadeiro, abrindo o modal.
 *
 * Estrutura JSX:
 *   - Renderiza um item de dropdown que, ao ser clicado, abre o modal para adicionar participantes.
 *   - O modal inclui um título, um formulário com campos para e-mail e seleção de cargo, 
 *     e botões para fechar o modal ou enviar o convite.
 *
 */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../StylesPages/AddParticipantes.css'

function AddParticipantes() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <NavDropdown.Item href="#action/3.1" onClick={handleShow}>
                Adicionar Participantes
            </NavDropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='color-addparticipante' closeButton>
                    <Modal.Title>Adicionar participantes</Modal.Title>
                </Modal.Header>
                <Modal.Body className='color-addparticipante'>
                    <h3 className='nome-equipe-addparticipante'>Programadores da Fiel</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email do usuário</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 perfil-usuario">
                            <div className="perfil-addparticipante">
                                <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="perfil" />
                                <p>Jorge</p>
                            </div>
                            <div className="drop-cargo">
                                <select name="cargo" id="cargo">
                                    <option value="volvo">Desenvolvedor</option>
                                    <option value="saab">Administrador</option>
                                    <option value="opel">Líder</option>
                                    <option value="audi">Gerente</option>
                                </select>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='color-addparticipante'>
                    <Button className='botao-fechar-addparticipante' variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button className='botao-enviar-addparticipante' variant="primary" onClick={handleClose}>
                        Enviar convite
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddParticipantes;