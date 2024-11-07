/**
 * Nome do Componente: SobreNos
 *
 * Descrição Detalhada:
 *   O componente funcional `SobreNos` apresenta uma descrição do
 *   Starlist, destacando sua função principal como uma ferramenta
 *   de lista de tarefas. O objetivo é fornecer aos usuários uma
 *   visão clara dos benefícios da aplicação, incentivando-os a se
 *   envolverem com o serviço.
 *
 * Estrutura JSX:
 *   - O componente é encapsulado em uma `<section>` com o id `sobre`,
 *     o que facilita a navegação direta para esta seção a partir
 *     de outros componentes (como o cabeçalho).
 *
 */

import './SobreNos.css'
function SobreNos(){
    return(
        <>
          
    <section id="sobre">
        <h1 id="sobre-txt">O Starlist é uma lista de tarefas práticas que te ajuda <br/>no seu planejamento,
            organização e gerenciamento das suas ideias<br/>
            que tem como principal foco te ajudar a aproveitar melhor<br/> seu tempo. Venha fazer parte de nossa
            constelação.</h1>
    </section>
    
        </>
    )
}

export { SobreNos };