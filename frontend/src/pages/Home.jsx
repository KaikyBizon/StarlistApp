/**
 * Nome do Componente: Home
 *
 * Descrição Detalhada:
 *   Componente funcional que representa a página inicial da aplicação, estruturada em seções distintas. 
 *   Cada seção é representada por um componente filho que é importado e renderizado, criando uma experiência de usuário coesa.
 *
 * Observações Pertinentes:
 *   1. Utiliza componentes separados para cada parte da página, promovendo a modularidade e a reutilização de código.
 *   2. Cada componente importado representa uma seção da página, como cabeçalho, avaliação, planos, entre outros.
 *   3. O layout da página é definido em uma estrutura de fragmento (`<>...</>`), permitindo agrupar múltiplos elementos sem adicionar nós extras ao DOM.

 * Estrutura JSX:
 *   - Renderiza um cabeçalho, seguido por seções para o conteúdo principal, informações sobre a empresa, avaliações, planos, cadastro, suporte e rodapé.
 */

import { Principal } from '../components/LandingPage/Principal';
import { Conheca } from '../components/LandingPage/Conheca';
import { SobreNos } from '../components/LandingPage/SobreNos';
import { Avaliacao } from '../components/LandingPage/Avaliacao';
import { Planos } from '../components/LandingPage/Planos';
import { CadastroSecundario } from '../components/LandingPage/CadastroSecundario';
import Footer from '../components/LandingPage/Footer';

function Home() {
    return (
        <div style={{ backgroundColor: "rgb(228, 194, 82)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Principal />
            <Conheca />
            <SobreNos />
            <Avaliacao />
            <Planos />
            <CadastroSecundario />
            <Footer />
        </div>
    )
}

export { Home }