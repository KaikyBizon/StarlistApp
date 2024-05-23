import Card from 'react-bootstrap/Card';
import { Expulsar } from './Expulsar';
import AltCargo from './AltCargo';
import '../gerenciarpart.css'

function Cardgerenciar() {
    return (
        <Card id='cards-gerenciar-part'>
            <Card.Body>
                <div id="perfil-gerenc">
                    <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="foto-perfil" />
                    <div className="caracter-gerenciar">
                        <Card.Title className='name-gerenc'>José</Card.Title>
                        <p>Colaborador</p>
                    </div>
                </div>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <div id="btn-gerenc-part">
                    <AltCargo />
                    <Expulsar />
                </div>
            </Card.Body>
        </Card>
    );
}

export default Cardgerenciar;