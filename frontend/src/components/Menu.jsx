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
import { useState, useEffect } from 'react';
import '../StylesPages/Menu.css'


export default function Menu({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [notifications, setNotifications] = useState([]);  // Estado para armazenar as notificações
    const [alertas, setAlertas] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://10.135.60.24:8085/api/eventos/proximos")
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setAlertas(data);
                    } else {
                        setAlertas([]);
                    }
                })
                .catch((error) => console.error("Erro ao buscar eventos próximos:", error));
        }, 6000); // Verificar a cada 60 segundos

        return () => clearInterval(interval);
    }, []);

    // Função showDados para carregar as mensagens do usuário
    // Autor: Kaiky
    // Criado em 19/11/24
    // Parâmetros de entrada:
    // Nenhum parâmetro de entrada direto, mas utiliza `formAlter.id` para identificar o usuário
    // Retorno:
    // Faz uma requisição ao servidor para buscar os dados do usuário e atualiza o estado `formAlter` com as informações obtidas
    // Esta função realiza uma requisição POST para buscar os dados do usuário, preenche o formulário com nome, email, data de nascimento e ID, e define o nome do usuário no estado
    const showDados = async () => {
        const id_usuario = localStorage.getItem("ID")
        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'buscar_mensagens', dados: { id_usuario: id_usuario } }),
            });
            const dados = (await resposta.json()).dadosCadastro;
            console.log(dados)
            if (dados.error) {

            } else {
                setNotifications(dados.mensagens);  // Atualiza o estado com as mensagens recebidas
            }
        } catch (error) {
            console.error('Erro ao carregar dados!', error)
        }
    };

    useEffect(() => {
        showDados();
    }, []);

    // Função handleSearchChange para atualizar o termo de busca e executar a função de busca com o valor inserido
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    // Mostrar notificações do usuário
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleAceitar = (id) => {
        console.log(`Notificação ${id} aceita`);
        // Lógica para processar a aceitação (exemplo: enviar para o backend)
    };

    const handleRecusar = (id) => {
        console.log(`Notificação ${id} recusada`);
        // Lógica para processar a recusa (exemplo: enviar para o backend)
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
                <div className="notification-icon">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png"
                        alt="sino"
                        onClick={toggleNotifications}
                        style={{ cursor: "pointer" }}
                    />
                    {showNotifications && (
                        <div className="notifications-dropdown">
                            <h4>Notificações</h4>
                            <ul>
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <li key={`notification-${index}`}>
                                            {/* Mostra a mensagem da notificação */}
                                            <span style={{ marginRight: '10px' }}>{notification[1]}</span>

                                            {/* Botões para aceitar e recusar */}
                                            <button
                                                onClick={() => handleAceitar(notification[0])}
                                                className="btn btn-success btn-sm"
                                                style={{ marginRight: '5px' }}
                                            >
                                                Aceitar
                                            </button>
                                            <button
                                                onClick={() => handleRecusar(notification.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Recusar
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li>Sem novas notificações</li>
                                )}
                            </ul>


                            <h4>Alertas</h4>
                            <ul>
                                {alertas.length > 0 ? (
                                    alertas.map((alerta, index) => (
                                        <li key={`alerta-${index}`}>
                                            A tarefa <strong>{alerta.titulo}</strong> começa em 1 minuto
                                        </li>
                                    ))
                                ) : (
                                    <li>Sem novos alertas</li>
                                )}
                            </ul>

                        </div>
                    )}
                </div>


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