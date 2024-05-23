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