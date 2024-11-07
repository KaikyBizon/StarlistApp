/**
 * Nome do Componente: Menu
 *
 * Descrição Detalhada:
 *   Componente funcional que representa um menu de navegação na aplicação, incluindo uma barra de pesquisa, ícones de ajuda e notificações, 
 *   e um dropdown para gerenciamento de conta do usuário. O componente utiliza o Bootstrap para estilização e layout.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar o estado do termo de pesquisa (variável 'searchTerm').
 *   2. A função 'handleSearchChange' atualiza o termo de busca sempre que o usuário digita na barra de pesquisa 
 *      e chama a função 'onSearch' passada como prop para filtrar as tarefas.
 *   3. O menu inclui uma logo da aplicação, uma barra de pesquisa com um ícone de lupa e ícones para ajuda e notificações.
 *   4. O dropdown permite ao usuário alterar seus dados e sair da conta. 
 *      O nome do usuário é exibido no dropdown, recuperado do localStorage.
 *
 * Estrutura JSX:
 *   - Renderiza um cabeçalho com a classe 'menu', contendo:
 *     - Uma div para a logo que exibe uma imagem.
 *     - Uma div para a barra de pesquisa, incluindo um campo de entrada e um ícone de lupa.
 *     - Uma div para os ícones do menu, incluindo ícones de dúvidas e notificações.
 *     - Um dropdown que contém:
 *       - Um botão que exibe um ícone para acessar as opções da conta.
 *       - Itens do dropdown para alterar dados e sair da conta, com links apropriados.
 *       - Um divisor e um parágrafo que exibe o nome do usuário.
 *
 */

import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../StylesPages/Menu.css'


export default function Menu({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Função handleSearchChange para atualizar o termo de busca e executar a função de busca com o valor inserido
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

   return (

        <header className="menu">
            {/*logo do menu*/}
            <div className="logo">
                <img src="/public/images/logo_starlist.png" alt="logo" />
            </div>
            {/*barra de pesquisa*/}
            <div className="search">
                <input
                    type="search"
                    name="Pesquisa"
                    id="pesquisar"
                    placeholder="Buscar tarefas"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <img src="/public/images/lupa.png" alt="lupa" />
            </div>
            {/*icones do menu*/}
            <div className="icones">
                <img src="https://cdn-icons-png.flaticon.com/128/7524/7524806.png" alt="duvidas" />
                <img src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png" alt="sino" />

                {/*botão para alterar dados do usuário*/}
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="minha-conta" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Link to="/alterar_dados_cadastro">
                            <Dropdown.Item className='alterar_dados' href="#/action-1">Alterar dados</Dropdown.Item>
                        </Link>
                        <Link to='/login'>
                            <Dropdown.Item className='alterar_dados' href="#/action-1">Sair da conta</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <p className='alterar_dados' href="#/action-1">{localStorage.getItem("nome_usuario")}</p>
                    </Dropdown.Menu>

                </Dropdown>
            </div>
        </header>
    )
}