/**
 * Nome do Componente: Cardgerenciar
 *
 * Descrição Detalhada:
 *   Componente funcional React que renderiza um cartão de gerenciamento para um colaborador. O cartão
 *   exibe a foto de perfil, nome e cargo do colaborador, além de oferecer ações para alterar o cargo
 *   e expulsar o colaborador através dos componentes `AltCargo` e `Expulsar`, respectivamente.
 *
 * Observações Pertinentes:
 *   1. O cartão utiliza o componente Card do React Bootstrap para estilização e layout.
 *   2. A foto do colaborador é carregada de uma URL externa.
 *   3. O nome do colaborador e o cargo são exibidos em um layout vertical.
 *   4. Os botões de ação estão agrupados em um contêiner específico para fácil gerenciamento de 
 *      estilos.
 *
 * Estrutura JSX:
 *   - Renderiza um Card que contém:
 *     - Uma seção de perfil com a foto e informações do colaborador.
 *     - Um texto adicional que pode ser utilizado para fornecer informações de suporte.
 *     - Botões para ações de gerenciamento (`AltCargo` e `Expulsar`).
 *
 * Parâmetros de Entrada:
 *   - Nenhum parâmetro externo é passado para este componente, mas ele depende dos componentes
 *     `AltCargo` e `Expulsar` para funcionalidade.
 *
 */

import Card from 'react-bootstrap/Card';
import { Expulsar } from './Expulsar';
import AltCargo from './AltCargo';
import '../StylesPages/gerenciarpart.css'

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