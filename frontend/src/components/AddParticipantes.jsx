import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../AddParticipantes.css'

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