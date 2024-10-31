/**
 * Nome do Componente: Navbar
 *
 * Descrição Detalhada:
 *   Componente funcional que representa a barra de navegação (Navbar) da aplicação. 
 *   Este componente é responsável por exibir a logo da aplicação, uma barra de pesquisa 
 *   e ícones que representam funcionalidades adicionais como ajuda, notificações e conta do usuário.
 *
 * Observações Pertinentes:
 *   1. A navbar é estilizada com classes CSS específicas, permitindo personalização visual.
 *   2. Inclui um campo de entrada do tipo "search" para permitir que os usuários busquem dentro da aplicação.
 *   3. A barra de pesquisa é acompanhada por um ícone de lupa, indicando a função de busca.
 *   4. Os ícones de dúvidas e notificações são representados por imagens, que são acessíveis através de URLs externas.
 *
 * Estrutura JSX:
 *   - Renderiza um cabeçalho com a classe 'menu', contendo:
 *     - Uma div para a logo que exibe uma imagem da logo da aplicação.
 *     - Uma div para a barra de pesquisa, que inclui:
 *       - Um campo de entrada para busca, com um placeholder que indica a função.
 *       - Um ícone de lupa ao lado do campo de entrada.
 *     - Uma div para os ícones do menu, que contém:
 *       - Um ícone para ajudar os usuários.
 *       - Um ícone para notificações.
 *       - Um ícone que representa a conta do usuário.
 *
 */

export default function Navbar() {
    return (
        <header className="menu">
            {/*logo do menu*/}
            <div className="logo">
                <img src="/public/images/logo_starlist.png" alt="logo" />
            </div>
            {/*barra de pesquisa*/}
            <div className="search">
                <input type="search" name="Pesquisa" id="pesquisar" placeholder="Buscar" />
                <img src="/public/images/lupa.png" alt="lupa" />
            </div>
            {/*icones do menu*/}
            <div className="icones">
                <img src="https://cdn-icons-png.flaticon.com/128/7524/7524806.png" alt="duvidas" />
                <img src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png" alt="sino" />
                <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="minha-conta" />
            </div>
        </header>
    )
} 