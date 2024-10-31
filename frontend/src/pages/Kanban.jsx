import Geral from '../components/Geral';
import Cabecalho from '../components/Cabecalho';
import Formulario from '../components/Formulario';
import { useState, useEffect } from 'react';
import '../StylesPages/kanban.css';

function Kanban({ onListaSalva }) {
    const [lista, setLista] = useState([]); // Define um estado 'lista' como um array vazio, utilizado para armazenar as listas.
    const [categorias, setCategorias] = useState([]);// Define um estado 'categorias' como um array vazio, utilizado para armazenar as categorias.
    const [tarefasPorCategoria, setTarefasPorCategoria] = useState({});// Define um estado 'tarefasPorCategoria' como um objeto vazio, utilizado para armazenar as tarefas organizadas por categoria.
    const [novaLista, setNovaLista] = useState('');// Define um estado 'novaLista' como uma string vazia, utilizado para armazenar o nome de uma nova lista a ser criada.
    const [exibirFormulario, setExibirFormulario] = useState(false);// Define um estado 'exibirFormulario' como 'false', utilizado para controlar a visibilidade do formulário para criar uma nova lista.
    const [modalVisivel, setModalVisivel] = useState(false);// Define um estado 'modalVisivel' como 'false', utilizado para controlar a visibilidade de um modal (por exemplo, confirmação de exclusão).
    const [listaParaExcluir, setListaParaExcluir] = useState(null);// Define um estado 'listaParaExcluir' como 'null', utilizado para armazenar o ID da lista que está sendo selecionada para exclusão.
    const [showFormulario, setShowFormulario] = useState(false); // Controle de exibição do formulário
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null); // Tarefa selecionada para edição
    const [editandoListaId, setEditandoListaId] = useState(null); // Estado para controlar qual lista está sendo editada
    const [exibirModal, setExibirModal] = useState(null);
    const [nomeEditando, setNomeEditando] = useState('');

    // Define um estado 'dadosList' como um objeto inicial com campos 'nome', 'tarefa_id', e 'usuario_id'.
    // 'nome' é uma string vazia, enquanto 'tarefa_id' e 'usuario_id' são obtidos do 'localStorage'.
    const [dadosList, setDadosList] = useState({
        nome: '',
        tarefa_id: localStorage.getItem("ID"),
        usuario_id: localStorage.getItem("ID")
    });

    /**
 * Nome da função: fetchTarefasParaCategoria
 * 
 * Autor: Leticia
 * 
 * Data de criação: 03 de setembro de 2024
 * 
 * Parâmetros de entrada:
 *   - `categoriaId`: string ou número - ID da categoria cujas tarefas devem ser buscadas.
 * 
 * Retorno:
 *   - `Promise`: Retorna uma promessa que resolve para:
 *     - Um array de objetos com as tarefas associadas à categoria, se a requisição for bem-sucedida.
 *     - Um array vazio, caso ocorra um erro na requisição ou se a resposta não for bem-sucedida (status diferente de 2xx).
 * 
 * Descrição/observações:
 *   - Esta função faz uma requisição HTTP GET para um endpoint que busca as tarefas associadas a uma categoria específica, identificada pelo `categoriaId`.
 *   - A resposta da requisição é tratada para garantir que, em caso de sucesso (`resposta.ok`), os dados das tarefas sejam retornados.
 *   - Em caso de erro, a função captura e loga o erro no console, retornando um array vazio como fallback.
 *   - A URL utilizada no fetch inclui o `categoriaId` como parâmetro de rota para especificar a categoria desejada.
 */
    // Função para buscar tarefas para cada lista específica
    const fetchTarefasParaCategoria = async (categoriaId) => {
        try {
            const resposta = await fetch(`http://10.135.60.24:8085/tarefas/${categoriaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                return resultado;
            } else {
                console.error('Erro ao buscar tarefas:', resultado.mensagens_erro);
                return [];
            }
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            return [];
        }
    };

    /**
 * Nome da função: fetchCategoriasETarefas
 * 
 * Autor: Leticia
 * 
 * Data de criação: 03 de setembro de 2024
 * 
 * Parâmetros de entrada:
 *   - Nenhum parâmetro de entrada. A função utiliza o ID do usuário armazenado no `localStorage`.
 * 
 * Retorno:
 *   - Nenhum retorno direto. A função atualiza os estados de categorias e tarefas associadas com o resultado da busca.
 * 
 * Descrição/observações:
 *   - Esta função faz uma requisição HTTP GET para buscar as categorias associadas ao usuário atual (identificado pelo `usuarioId` armazenado no `localStorage`).
 *   - Se a resposta for bem-sucedida (`resposta.ok`), a função atualiza o estado `categorias` com o resultado obtido.
 *   - Em seguida, para cada categoria obtida, a função faz outra requisição para buscar as tarefas associadas àquela categoria, utilizando a função `fetchTarefasParaCategoria`.
 *   - As requisições para buscar as tarefas são executadas em paralelo utilizando `Promise.all`, garantindo que todas as promessas sejam resolvidas antes de continuar.
 *   - Os resultados das tarefas são armazenados em um objeto (`tarefasMap`), onde cada chave corresponde ao ID de uma categoria, e o valor associado é o array de tarefas daquela categoria.
 *   - O estado `tarefasPorCategoria` é então atualizado com esse mapeamento de tarefas.
 *   - Em caso de erro na busca das categorias ou das tarefas, os erros são capturados e logados no console.
 */

    // Função para buscar cada lista
    const fetchCategoriasETarefas = async () => {
        const usuarioId = localStorage.getItem('ID');
        try {
            const resposta = await fetch(`http://10.135.60.24:8085/lista/${usuarioId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const categoriasResultado = await resposta.json();

            if (resposta.ok) {
                setCategorias(categoriasResultado);

                // Busca tarefas para cada categoria
                const tarefasPromises = categoriasResultado.map(async (categoria) => {
                    const tarefas = await fetchTarefasParaCategoria(categoria.id);
                    return { [categoria.id]: tarefas };
                });

                // Aguarda todas as promessas serem resolvidas
                const tarefasArray = await Promise.all(tarefasPromises);

                // Converte o array de objetos em um único objeto
                const tarefasMap = tarefasArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setTarefasPorCategoria(tarefasMap);
            } else {
                console.error('Erro ao buscar categorias:', categoriasResultado.mensagens_erro);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    // Define a função 'handleChange' que será chamada quando houver uma mudança no valor de um campo de entrada (input).
    const handleChange = (event) => {
        // Atualiza o estado 'novaLista' com o novo valor do campo de entrada, extraído do evento (event.target.value).
        setNovaLista(event.target.value);
    };

    /**
 * Nome da função: handleSubmit
 * 
 * Autor: Leticia
 * 
 * Data de criação: 03 de setembro de 2024
 * 
 * Parâmetros de entrada:
 *   - `e`: Event - Evento de submissão do formulário, utilizado para prevenir o comportamento padrão de recarregar a página.
 * 
 * Retorno:
 *   - Nenhum retorno direto. A função lida com a criação de uma nova lista e atualiza o estado da aplicação conforme o resultado da requisição.
 * 
 * Descrição/observações:
 *   - Esta função é chamada ao submeter um formulário para criar uma nova lista.
 *   - Primeiro, a função previne o comportamento padrão do formulário (`e.preventDefault()`).
 *   - Em seguida, verifica se o nome da nova lista não está vazio. Se estiver, uma mensagem de erro é definida e a função retorna.
 *   - A função então faz uma requisição HTTP POST para o endpoint `/receber-dados`, enviando os dados da nova lista a ser criada.
 *   - O corpo da requisição contém uma ação (`acao`) especificada como 'criar_lista' e os dados da lista (`dadosList`), com o nome da nova lista sobrescrevendo o nome existente.
 *   - Se a resposta não for bem-sucedida (`resposta.ok`) ou se houver mensagens de erro na resposta, essas mensagens de erro são definidas no estado `mensagensErro`.
 *   - Se a criação da lista for bem-sucedida, o estado `lista` é atualizado com a nova lista, e o nome da nova lista é resetado (`setNovaLista('')`).
 *   - A nova lista também é salva no `localStorage` para persistência.
 *   - Se a função `onListaSalva` estiver definida, ela é chamada após a lista ser salva com sucesso, permitindo que outras ações sejam realizadas (como atualizar uma interface de usuário).
 *   - Em caso de erro durante a requisição, o erro é capturado e logado no console.
 */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!novaLista.trim()) {
            setMensagensErro(['O nome da lista não pode estar vazio']);
            return;
        }

        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'criar_lista',
                    dados: {
                        ...dadosList,
                        nome: novaLista
                    }
                }),
            });

            const resultado = (await resposta.json()).listaCriada;

            if (!resposta.ok || resultado.mensagens_erro) {
                setMensagensErro(resultado.mensagens_erro);
            } else {
                const novaListaAtualizada = [...lista, novaLista];
                setLista(novaListaAtualizada);
                setNovaLista('');
                // Recarrega as listas ao criar uma nova
                fetchCategoriasETarefas();

                // Salva as listas no localStorage
                localStorage.setItem('listas', JSON.stringify(novaListaAtualizada));

                if (onListaSalva) {
                    onListaSalva();
                }
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const handleEditList = async (listaId) => {
        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'editar_nome_lista',
                    dados: {
                        id: listaId, // Enviar o ID da lista junto com os dados
                        nomeEditando
                    }
                }),
            });

            const resultado = (await resposta.json()).listaCriada;

            if (!resposta.ok || resultado.mensagens_erro) {
                setMensagensErro(resultado.mensagens_erro);
            } else {
                fetchCategoriasETarefas();
                setExibirModal(false);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };



    // Função para editar lista (abre o modal)
    const handleEditarTitle = (listaId) => {
        const categoria = categorias.find(categoria => categoria.id === listaId);
        if (categoria) {
            setNomeEditando(categoria.nome); // Define o nome da lista no estado
            setExibirModal(listaId); // Abre o modal para a lista específica
        }
    };

    const handleFecharModal = () => {
        setExibirModal(null);
    };

    // Define a função assíncrona 'handleDeleteLista' que será chamada ao tentar excluir uma lista, recebendo 'listaId' como parâmetro.
    const handleDeleteLista = async (listaId) => {
        // Define o estado 'listaParaExcluir' com o ID da lista que se deseja excluir.
        setListaParaExcluir(listaId);
        // Define o estado 'modalVisivel' como 'true' para exibir o modal de confirmação de exclusão.
        setModalVisivel(true);
    };

    /**
 * Nome da função: confirmarExclusao
 * 
 * Autor: Leticia
 * 
 * Data de criação: 03 de setembro de 2024
 * 
 * Parâmetros de entrada:
 *   - Nenhum parâmetro de entrada direto. A função utiliza variáveis de estado, como `listaParaExcluir`, para determinar a lista que será excluída.
 * 
 * Retorno:
 *   - Nenhum retorno direto. A função lida com a exclusão de uma lista e atualiza os estados da aplicação de acordo com o resultado da operação.
 * 
 * Descrição/observações:
 *   - Esta função é chamada para confirmar a exclusão de uma lista específica.
 *   - Ela faz uma requisição HTTP DELETE para o endpoint `/lista/${listaParaExcluir}`, onde `listaParaExcluir` é o ID da lista a ser excluída.
 *   - Se a resposta da requisição for bem-sucedida (`resposta.ok`), a lista excluída é removida do estado `categorias` utilizando o método `filter`.
 *   - O estado `tarefasPorCategoria` também é atualizado para remover as tarefas associadas à lista excluída.
 *   - Se a exclusão falhar, uma mensagem de erro é registrada no console.
 *   - Após a exclusão (ou em caso de erro), o modal de confirmação é fechado, e o estado `listaParaExcluir` é resetado para `null`.
 *   - Em caso de erro durante a requisição, o erro é capturado e logado no console.
 */
    const confirmarExclusao = async () => {
        try {
            const resposta = await fetch(`http://10.135.60.24:8085/lista/${listaParaExcluir}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (resposta.ok) {
                // Filtra a lista removendo a excluída
                setCategorias(categorias.filter(categoria => categoria.id !== listaParaExcluir));
                // Atualiza o estado das tarefas
                const novoTarefasPorCategoria = { ...tarefasPorCategoria };
                delete novoTarefasPorCategoria[listaParaExcluir];
                setTarefasPorCategoria(novoTarefasPorCategoria);
            } else {
                console.error('Erro ao excluir lista');
            }

            // Fecha o modal após a ação
            setModalVisivel(false);
            setListaParaExcluir(null);
        } catch (error) {
            console.error('Erro ao excluir lista:', error);
        }
    };

    // Define a função 'cancelarExclusao' que será chamada para cancelar a exclusão de uma lista.
    const cancelarExclusao = () => {
        // Define o estado 'modalVisivel' como 'false' para esconder o modal de confirmação de exclusão.
        setModalVisivel(false);
        // Define o estado 'listaParaExcluir' como 'null' para limpar o ID da lista que estava marcada para exclusão.
        setListaParaExcluir(null);
    };

    // Define a função 'handleClearInput' que será chamada para limpar o campo de entrada da nova lista.
    const handleClearInput = () => {
        // Define o estado 'novaLista' como uma string vazia, efetivamente limpando o campo de entrada.
        setNovaLista('');
    };

    // Define a função 'handleExibirFormulario' que será chamada para exibir o formulário de edição de uma lista específica.
    const handleExibirFormulario = (listaId) => {
        // Define o estado 'exibirFormulario' com o ID da lista para a qual o formulário deve ser exibido.
        setExibirFormulario(listaId);
    };

    // Define um hook 'useEffect' que será executado assim que o componente for montado (carregado pela primeira vez).
    useEffect(() => {
        // Chama a função 'fetchCategoriasETarefas' para buscar categorias e tarefas ao montar o componente.
        fetchCategoriasETarefas();
        // O array vazio '[]' indica que este 'useEffect' só será executado uma vez, na montagem do componente.
    }, []);

    const handleEditarClick = (tarefa) => {
        setTarefaSelecionada(tarefa); // Define a tarefa a ser editada
        setShowFormulario(true); // Exibe o formulário
    };

    const handleFecharFormulario = () => {
        setShowFormulario(false); // Fecha o formulário
        setTarefaSelecionada(null); // Limpa a tarefa selecionada
    };

    // Função para excluir uma tarefa específica
    const handleDeleteTarefa = async (tarefaId, categoriaId) => {
        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'excluirTarefa', dados: { tarefaId, categoriaId } })
            });

            const resultado = await resposta.json()

            if (resposta.error) {
                console.error('Erro ao excluir tarefa');
            } else {
                fetchCategoriasETarefas();
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    };

    return (
        <>
            <Cabecalho />
            <section className='interacao'>
                <section className='calendario-left'>
                    <Geral />
                </section>

                <section className='cartoes-kanban'>
                    {categorias.map((categoria) => (
                        <section key={categoria.id} className="status-kanban">
                            <div className="kanban">
                                <div className='titulo-lista' onClick={() => handleEditarTitle(categoria.id)}>
                                    <h4 className='status-tarefa'>{categoria.nome}</h4>
                                </div>
                                {tarefasPorCategoria[categoria.id] && tarefasPorCategoria[categoria.id].map((tarefa, index) => (
                                    <div key={index} className="tarefa-item">
                                        <h5 className='titulo-tarefa'>{tarefa.titulo}</h5>
                                        <p className='data-hora'>Data: {tarefa.data}</p>
                                        <p className='data-hora'>Hora: {tarefa.horario}</p>
                                        <div className='acoes-tarefa'>
                                            <img className='editar-tarefa' src="../../public/images/editar_lista.png" alt="Editar tarefa" onClick={() => handleEditarClick({ ...tarefa, listaId: categoria.id })} />
                                            <img className='excluir-tarefa' src="../../public/images/lixeira.png" alt="Excluir tarefa" onClick={() => handleDeleteTarefa(tarefa.id, categoria.id)} />
                                        </div>
                                    </div>
                                ))}
                                <div className="formulario-fixo">
                                    <button onClick={() => handleExibirFormulario(categoria.id)} className='nova-tarefa'>Nova tarefa</button>
                                    {exibirFormulario === categoria.id && <Formulario onClose={handleExibirFormulario} listaId={categoria.id} />}
                                    <img src="../../public/images/lixeira.png" alt="Excluir lista" onClick={() => handleDeleteLista(categoria.id)} className='excluir' />
                                </div>
                            </div>
                            {exibirModal === categoria.id && (
                                <div className="modal-overlay-editar">
                                    <div className="modal-conte-editar">
                                        <h3>Editar Nome da Lista</h3>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleEditList(exibirModal); // Passar o ID da lista
                                            }}
                                        >
                                            <input
                                                type="text"
                                                name="nome"
                                                value={nomeEditando}
                                                onChange={(e) => setNomeEditando(e.target.value)} // Atualiza o estado corretamente
                                                placeholder="Digite o novo nome"
                                                required
                                            />
                                            <button className="salvar" type="submit">Salvar</button>
                                            <button className="fechar" type="button" onClick={handleFecharModal}>Fechar</button>
                                        </form>

                                    </div>
                                </div>
                            )}

                        </section>
                    ))}
                    <div className="lista-adiciona">
                        <input type="text" placeholder="Digite o nome da lista" value={novaLista} onChange={handleChange} />
                        <div className='botoes_adLista'>
                            <button className="botao-adicionaLista" onClick={handleSubmit}>Adicionar lista</button>
                            <button className="excluir" onClick={handleClearInput}>X</button>
                        </div>
                    </div>
                </section>

                {modalVisivel && (
                    <div className="modal-confirmacao">
                        <div className="modalContent">
                            <p>Deseja mesmo excluir a lista e suas tarefas?</p>
                            <div>
                                <button className="botoesConfirmarExclusao" onClick={confirmarExclusao}>Confirmar</button>
                                <button className="botoesConfirmarExclusao" onClick={cancelarExclusao}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {showFormulario && (
                    <Formulario
                        tarefa={tarefaSelecionada} // Passa a tarefa selecionada para o formulário
                        onClose={handleFecharFormulario} // Função para fechar o formulário
                    />
                )}
            </section>
        </>
    );
}

export default Kanban;