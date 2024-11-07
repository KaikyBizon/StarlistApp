/**
 * Nome do Componente: Todo
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que representa uma tarefa em uma lista de tarefas. 
 *   Exibe detalhes da tarefa, como título, descrição e data de vencimento. 
 *   Inclui funcionalidades para marcar a tarefa como concluída ou remover a tarefa da lista.
 *
 * Observações Pertinentes:
 *   1. Utiliza props para receber informações sobre a tarefa, incluindo título, descrição, data e estado de conclusão.
 *   2. Implementa um botão para alternar o estado de conclusão da tarefa, permitindo que o usuário marque a tarefa como feita ou não.
 *   3. A função de remoção da tarefa é acionada através de um botão que chama uma função passada como prop para gerenciar a lista de tarefas.
 *
 * Estado:
 *   - Nenhum estado interno é mantido; o componente depende do gerenciamento de estado externo através de props.
 *
 * Funções:
 *   - handleToggle: Função que altera o estado de conclusão da tarefa.
 *   - handleRemove: Função que remove a tarefa da lista, chamada ao clicar no botão de remoção.
 *
 * Estrutura JSX:
 *   - Renderiza um card com os detalhes da tarefa, incluindo título, descrição e data.
 *   - Inclui botões para marcar a tarefa como concluída ou remover a tarefa da lista.
 *
 */

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Geral from '../components/Geral';
import Menu from '../components/menu';
import Options from '../components/Options';
import Calendario from '../components/Calendario';
import Formulario from '../components/Formulario';
import '../StylesPages/todo.css';

function ToDo() {
    const [tarefas, setTarefas] = useState([]);
    const [mensagensErro, setMensagensErro] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showFormulario, setShowFormulario] = useState(false); // Controle de exibição do formulário
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null); // Tarefa selecionada para edição
    const [modalVisivel, setModalVisivel] = useState(false); // Controle de exibição do modal de exclusão
    const [tarefaParaExcluir, setTarefaParaExcluir] = useState(null); // Armazena a tarefa a ser excluída
    const [dataToCatchTarefas, setDataToCatchTarefas] = useState(null); // Estado para a data selecionada

    // Função que registra a data selecionada, filtra as tarefas pela data e atualiza a lista de tarefas filtradas.
    const handleDataSelecionada = (data) => {
        console.log(data)
        setDataToCatchTarefas(data); // Define a data selecionada
        const tarefasDoDia = tarefas.filter(tarefa => tarefa.data === data); // Filtra as tarefas pela data
        setFilteredTasks(tarefasDoDia); // Atualiza as tarefas filtradas
    };



    // Função fetchTarefas para buscar as tarefas do usuário do servidor
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - Nenhum parâmetro direto, mas utiliza o ID do usuário armazenado no `localStorage`
    // Retorno:
    // - Atualiza o estado das tarefas com as tarefas recebidas do servidor e as ordena por data
    // Esta função faz uma requisição ao servidor para buscar as tarefas do usuário logado, utilizando o ID do usuário armazenado no `localStorage`. 
    // As tarefas recebidas são mapeadas em um formato adequado (com título, etiqueta, descrição, data, horário e ID da tarefa) e depois ordenadas pela data. 
    // As tarefas são então armazenadas nos estados `tarefas` e `setFilteredTasks` para serem exibidas na interface. 
    // Caso ocorra algum erro na requisição ou no servidor, a função captura e exibe a mensagem de erro.
    const fetchTarefas = async () => {
        const usuarioId = localStorage.getItem('ID');

        try {
            const resposta = await fetch('http://10.135.60.17:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: "carregar_tarefas", dados: { usuarioId, dataToCatchTarefas } })
            });
            const resultado = await resposta.json();

            if (resposta.ok) {
                const tarefasRecebidas = resultado.dados_tarefa;

                const tarefasAtualizadas = tarefasRecebidas.map(tarefa => ({
                    titulo: tarefa[0],
                    etiqueta: tarefa[1],
                    descricao: tarefa[2],
                    data: tarefa[3],
                    horario: tarefa[4],
                    tarefaId: tarefa[5],
                }));

                const tarefasOrdenadas = ordenarTarefas(tarefasAtualizadas);
                setTarefas(tarefasOrdenadas);
                setFilteredTasks(tarefasOrdenadas);
            } else {
                console.error('Erro no servidor:', resultado.mensagens_erro);
                setMensagensErro(resultado.mensagens_erro || ['Erro ao obter mensagens de erro.']);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setMensagensErro(['Erro ao buscar dados.']);
        }
    };

    // Função excluirTarefa para excluir uma tarefa específica do usuário
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - tarefaId: ID da tarefa a ser excluída
    // Retorno:
    // - Atualiza o estado das tarefas, removendo a tarefa excluída
    // Esta função realiza uma requisição ao servidor para excluir uma tarefa específica, identificada pelo `tarefaId`. 
    // Caso a exclusão seja bem-sucedida, a tarefa é removida do estado local `tarefas` e `setFilteredTasks`, atualizando a lista visível. 
    // Se ocorrer algum erro, a função captura e exibe as mensagens de erro recebidas do servidor. 
    // Por fim, a função garante que o modal de exclusão seja fechado após o processo.
    const excluirTarefa = async (tarefaId) => {
        console.log(tarefaId);
        try {
            const resposta = await fetch('http://10.135.60.17:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dados: { tarefaId }, acao: 'excluirTarefa' })
            });
            const resultado = await resposta.json();

            if (resposta.ok) {
                const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.tarefaId !== tarefaId);
                setTarefas(tarefasAtualizadas);
                setFilteredTasks(tarefasAtualizadas);
            } else {
                console.error('Erro ao excluir a tarefa:', resultado.mensagens_erro);
                setMensagensErro(resultado.mensagens_erro || ['Erro ao excluir tarefa.']);
            }
        } catch (error) {
            console.error('Erro ao excluir a tarefa:', error);
        } finally {
            setModalVisivel(false); // Fecha o modal após a exclusão
        }
    };

    // Função que confirma a exclusão de uma tarefa, chamando a função de exclusão se uma tarefa foi selecionada.
    const confirmarExclusao = () => {
        if (tarefaParaExcluir) {
            excluirTarefa(tarefaParaExcluir); // Chama a função de exclusão passando o ID
        }
    };

    // Função que fecha o modal de exclusão e limpa a referência à tarefa selecionada para exclusão.
    const cancelarExclusao = () => {
        setModalVisivel(false); // Fecha o modal sem excluir
        setTarefaParaExcluir(null); // Limpa a tarefa para exclusão
    };

    // Função que define a tarefa a ser excluída e abre o modal de confirmação para a exclusão.
    const handleExcluirClick = (id) => {
        setTarefaParaExcluir(id); // Define a tarefa que será excluída
        setModalVisivel(true); // Abre o modal de confirmação
    };

    // Função ordenarTarefas para organizar a lista de tarefas por data e horário
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - tarefas: um array de objetos de tarefas, cada um contendo propriedades de data e horário
    // Retorno:
    // - Um array de tarefas ordenadas, primeiro por data (do mais próximo ao mais distante)
    //   e, em caso de datas iguais, por horário (do mais cedo ao mais tarde)
    // Esta função utiliza a função de ordenação `sort` para organizar as tarefas. 
    // Primeiro, as tarefas são convertidas de string para objetos Date para comparação de datas. 
    // Se as datas forem iguais, as tarefas são então ordenadas com base em seus horários, convertendo-os em minutos 
    // para facilitar a comparação. Caso uma tarefa não tenha horário definido, ela é mantida após as tarefas com horário.
    // O resultado é um array de tarefas ordenadas que facilita a visualização e o gerenciamento por data e hora.
    const ordenarTarefas = (tarefas) => {
        return tarefas.sort((a, b) => {
            // Função para converter string no formato dd/mm/yyyy para um objeto Date
            const converterParaData = (dataString) => {
                const [dia, mes, ano] = dataString.split('/').map(Number);
                return new Date(ano, mes - 1, dia); // Cria uma data no formato correto
            };

            const dataDateA = converterParaData(a.data);
            const dataDateB = converterParaData(b.data);

            // Ordenar primeiro pelas datas mais próximas
            if (dataDateA.getTime() !== dataDateB.getTime()) {
                return dataDateA - dataDateB;
            }

            // Se as datas forem iguais, ordenar pelos horários
            if (a.horario && b.horario) {
                const [horaA, minutoA] = a.horario.split(':').map(Number);
                const [horaB, minutoB] = b.horario.split(':').map(Number);
                const tempoA = horaA * 60 + minutoA;
                const tempoB = horaB * 60 + minutoB;

                return tempoA - tempoB;
            }

            // Caso não tenha horário, manter a tarefa com horário preenchido antes
            return (a.horario ? 0 : 1) - (b.horario ? 0 : 1);
        });
    };
    
    // Efeito que busca as tarefas quando a data selecionada é definida, utilizando a função fetchTarefas.
    useEffect(() => {
        if (dataToCatchTarefas) {
            fetchTarefas();
        }
    }, [dataToCatchTarefas]);

    // Função handleSearch para filtrar as tarefas com base no termo de busca
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - searchTerm: uma string que representa o termo de busca fornecido pelo usuário
    // Retorno:
    // - Nenhum retorno explícito, mas atualiza o estado `filteredTasks` com as tarefas filtradas
    // Esta função verifica se o `searchTerm` está vazio. Se estiver, define `filteredTasks` para a lista completa de tarefas. 
    // Caso contrário, filtra as tarefas existentes, retornando apenas aquelas cujo título começa com o termo de busca (ignorando maiúsculas/minúsculas).
    // O resultado é armazenado no estado `filteredTasks`, permitindo que a interface exiba apenas as tarefas que correspondem ao critério de busca.
    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredTasks(tarefas);
            return;
        }

        const filtered = tarefas.filter(tarefa => {
            return tarefa.titulo.toLowerCase().startsWith(searchTerm.toLowerCase());
        });
        setFilteredTasks(filtered);
    };

    // Função que define a tarefa a ser editada e exibe o formulário de edição.
    const handleEditarClick = (tarefa) => {
        setTarefaSelecionada(tarefa); // Define a tarefa a ser editada
        setShowFormulario(true); // Exibe o formulário
    };

    // Função que fecha o formulário de edição e limpa a tarefa selecionada.
    const handleFecharFormulario = () => {
        setShowFormulario(false); // Fecha o formulário
        setTarefaSelecionada(null); // Limpa a tarefa selecionada
    };

    return (
        <>
            <Menu onSearch={handleSearch} />
            <Options />
            <section className='interacao'>
                <section className='calendario-left'>
                    <Geral />
                    <Calendario events={tarefas} onSelectDate={handleDataSelecionada} />

                </section>
                <div className="back-cards">
                    {mensagensErro.length > 0 && (
                        <div className="erro-mensagens">
                            {mensagensErro.map((erro, index) => (
                                <p key={index}>{erro}</p>
                            ))}
                        </div>
                    )}
                    {!dataToCatchTarefas && <p>Selecione uma data para ver as tarefas.</p>} {/* Mensagem inicial */}
                    {filteredTasks && filteredTasks.length > 0 ? (
                        filteredTasks.map((tarefa) => {
                            const { tarefaId, titulo, etiqueta, descricao, data, horario } = tarefa;
                            const corEtiqueta = etiqueta === 'Importante' ? 'red' :
                                etiqueta === 'Pendência' ? 'orange' :
                                    etiqueta === 'Reunião' ? 'blue' : 'transparent';

                            return (
                                <Card className='cards-tarefa' key={tarefaId}>
                                    <Card.Header>
                                        <div className='data_etiqueta'>
                                            {data || 'Data não informada'}
                                            <div className='etiqueta' style={{ backgroundColor: corEtiqueta }}></div>
                                        </div>
                                        <div className='card_icons'>
                                            <img src="../../public/images/lixeira.png" alt="Excluir" onClick={() => handleExcluirClick(tarefaId)} />
                                            <img src="../../public/images/editar_lista.png" alt="Editar" onClick={() => handleEditarClick(tarefa)} />
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="content-infoTask">
                                        <Card.Title className='titulo-todo'>{titulo || 'Título não informado'}</Card.Title>
                                        <Card.Text className='descricao'>
                                            {descricao || 'Descrição não informada'}
                                        </Card.Text>
                                        <Card.Text className='todo-horario'>
                                            {`Horário: ${horario || 'Horário não informado'}`}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            );
                        })
                    ) : (
                        <p>Nenhuma tarefa encontrada</p>
                    )}
                </div>
            </section>

            {showFormulario && (
                <Formulario
                    tarefa={tarefaSelecionada}
                    onClose={handleFecharFormulario}
                />
            )}

            {modalVisivel && (
                <div className="modal-confirmacao">
                    <div className="modalContent">
                        <p>Deseja realmente excluir esta tarefa?</p>
                        <div>
                            <button className="botoesConfirmarExclusao" onClick={confirmarExclusao}>Confirmar</button>
                            <button className="botoesConfirmarExclusao" onClick={cancelarExclusao}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ToDo;
