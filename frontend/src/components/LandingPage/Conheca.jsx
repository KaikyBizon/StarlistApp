/**
 * Nome do Componente: Conheca
 *
 * Descrição Detalhada:
 *   O componente funcional `Conheca` apresenta uma seção na página que
 *   destaca as principais características e benefícios do serviço ou produto
 *   oferecido. A seção é organizada em um layout de grade que inclui cards
 *   com títulos, descrições e imagens para cada benefício.
 *
 * Estrutura JSX:
 *   - O componente é encapsulado por uma `<section>` com o ID `conhecer`, que
 *     inclui um título principal e uma grade de cards.
 */

import Accordion from 'react-bootstrap/Accordion';
import './Conheca.css'

function Conheca() {
    return (
        <>
            {/* Seção principal identificada por ID 'conhecer' */}
            <section id="conhecer">

                {/* Acordeão com 3 itens, um para cada benefício */}
                <Accordion className='container-accordion' defaultActiveKey="0">

                    {/* Primeiro benefício */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='item-accordion'>
                            Organização Simplificada
                        </Accordion.Header>
                        <Accordion.Body>
                            <strong>Gerencie suas tarefas com eficiência.</strong> Nosso aplicativo permite que você crie, edite e organize suas tarefas em listas personalizadas, garantindo mais produtividade no seu dia a dia.
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Segundo benefício */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className='item-accordion'>
                            Colaboração em Equipe
                        </Accordion.Header>
                        <Accordion.Body>
                            <strong>Trabalhe em equipe sem complicações.</strong> Compartilhe suas listas de tarefas com colegas, atribua responsabilidades e acompanhe o progresso de cada atividade em tempo real.
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Terceiro benefício */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className='item-accordion'>
                            Integrações Poderosas
                        </Accordion.Header>
                        <Accordion.Body>
                            <strong>Conecte-se com suas ferramentas favoritas.</strong> Integre seu fluxo de trabalho com aplicativos como Google Calendar, Slack e muito mais, tornando sua rotina ainda mais eficiente.
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
            </section>
        </>
    )
}

export { Conheca };
