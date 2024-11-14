/**
 * Nome do Componente: Gerenciarpart
 *
 * Descrição Detalhada:
 *   Componente funcional que gerencia a exibição de participantes em uma interface. 
 *   Ele utiliza componentes filhos para renderizar os cartões dos participantes e um cabeçalho para o título da página.
 *
 * Observações Pertinentes:
 *   1. O componente 'Cabecalho' é utilizado para exibir o título da página.
 *   2. Contém um título principal que indica a função do componente.
 *   3. Renderiza múltiplos componentes 'Cardgerenciar' para cada participante.
 *   4. Inclui um botão para adicionar novos participantes à lista.

 * Estrutura JSX:
 *   - Renderiza um cabeçalho e uma seção contendo um título e uma estrutura para os cartões.
 *   - Exibe vários cartões de participantes através do componente 'Cardgerenciar'.
 *   - Inclui um botão para adicionar novos participantes.
 */

import { useState } from 'react';
import Cardgerenciar from "../components/Cardgerenciar";
import Cabecalho from "../components/Cabecalho";
import AddParticipantes from "../components/AddParticipantes";
import '../StylesPages/gerenciarpart.css';

function Gerenciarpart() {
    const [showAddParticipanteModal, setShowAddParticipanteModal] = useState(false);

    const handleShow = () => setShowAddParticipanteModal(true);
    const handleClose = () => setShowAddParticipanteModal(false);

    return (
        <>
            <Cabecalho />
            <section id="gerenciar-part">
                <div id="title-gerenciar">
                    <h1>Gerenciar participantes</h1>
                </div>
                <div className="estrutura">
                    <div className="cards-gerenciar">
                        <Cardgerenciar />
                        <Cardgerenciar />
                        <Cardgerenciar />
                        <Cardgerenciar />
                    </div>
                    <button
                        className="addPart"
                        type="button"
                        name="botao"
                        value="addPart"
                        onClick={handleShow} // Ao clicar, o modal é exibido
                    >
                        Adicionar participantes
                    </button>
                </div>
            </section>

            {/* Renderiza o modal AddParticipantes, passando o estado e função de controle */}
            <AddParticipantes show={showAddParticipanteModal} handleClose={handleClose} />
        </>
    );
}

export default Gerenciarpart;
