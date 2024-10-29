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

    const handleDataSelecionada = (data) => {
        console.log(data)
        setDataToCatchTarefas(data); // Define a data selecionada
        const tarefasDoDia = tarefas.filter(tarefa => tarefa.data === data); // Filtra as tarefas pela data
        setFilteredTasks(tarefasDoDia); // Atualiza as tarefas filtradas
    };



    const fetchTarefas = async () => {
        const usuarioId = localStorage.getItem('ID');

        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
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

    const excluirTarefa = async (tarefaId) => {
        console.log(tarefaId);
        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
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

    const confirmarExclusao = () => {
        if (tarefaParaExcluir) {
            excluirTarefa(tarefaParaExcluir); // Chama a função de exclusão passando o ID
        }
    };

    const cancelarExclusao = () => {
        setModalVisivel(false); // Fecha o modal sem excluir
        setTarefaParaExcluir(null); // Limpa a tarefa para exclusão
    };

    const handleExcluirClick = (id) => {
        setTarefaParaExcluir(id); // Define a tarefa que será excluída
        setModalVisivel(true); // Abre o modal de confirmação
    };

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


    useEffect(() => {
        if (dataToCatchTarefas) {
            fetchTarefas();
        }
    }, [dataToCatchTarefas]);

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
    const handleEditarClick = (tarefa) => {
        setTarefaSelecionada(tarefa); // Define a tarefa a ser editada
        setShowFormulario(true); // Exibe o formulário
    };

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
