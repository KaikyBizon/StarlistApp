import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Formulario from './Formulario.jsx';
import '/src/novatarefa.css'
import AddParticipantes from './AddParticipantes.jsx';
import { Link } from 'react-router-dom'

function Options() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary nav-fixed">

            <Container>
                {/*Navbar abaixo do menu*/}
                <div className='nav-utensilios'>
                    <Navbar.Brand href="#home"><Link to="/">Nome da lista</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Link to="/gerenciarpart">Participantes</Link>
                            <Link to="/gerenciar-equipe">Equipe</Link>
                            {/*Dropdown da navbar*/}
                            <NavDropdown className='drop-options' title="Opções" id="basic-nav-dropdown">
                                {/*Itens da navbar*/}
                                <AddParticipantes><NavDropdown.Item href="#action/3.1">Adicionar participantes</NavDropdown.Item></AddParticipantes>
                                <NavDropdown.Divider />
                                <Link to="/kanban">
                                    <NavDropdown.Item href="#action/3.3">
                                        KanBan
                                    </NavDropdown.Item>
                                </Link>
                                <Link to="/todo">
                                    <NavDropdown.Item href="#action/3.4">
                                        ToDo
                                    </NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
                <div className="create-nova">
                    {/*modal para nova tarefa*/}
                    <Formulario />
                </div>
            </Container>
        </Navbar>
    );
}

export default Options;