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

    const fetchTarefas = async () => {
        const usuarioId = localStorage.getItem('ID');

        try {
            const resposta = await fetch('http://10.135.60.19:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({acao: "carregar_tarefas", dados: usuarioId })
            });
            const resultado = await resposta.json();

            if (resposta.ok) {
                const tarefasRecebidas = resultado.dados_processados.dados_tarefa;

                const tarefasAtualizadas = tarefasRecebidas.map(tarefa => ({
                    titulo: tarefa[0],
                    etiqueta: tarefa[1],
                    descricao: tarefa[2],
                    data: tarefa[3],
                    horario: tarefa[4],
                    id: tarefa[5],
                }));

                const tarefasOrdenadas = ordenarTarefas(tarefasAtualizadas);
                console.log(tarefasOrdenadas)
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

    const excluirTarefa = async (id) => {
        try {
            const resposta = await fetch('http://10.135.60.19:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dados: id, acao: 'excluirTarefa' })
            });
            const resultado = await resposta.json();

            if (resposta.ok) {
                const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.id !== id);
                setTarefas(tarefasAtualizadas);
                setFilteredTasks(tarefasAtualizadas);
            } else {
                console.error('Erro ao excluir a tarefa:', resultado.mensagens_erro);
                setMensagensErro(resultado.mensagens_erro || ['Erro ao excluir tarefa.']);
            }
        } catch (error) {
            console.error('Erro ao excluir a tarefa:', error);
        }
    };

    const ordenarTarefas = (tarefas) => {
        return tarefas.sort((a, b) => {
            const dataDateA = new Date(a.data);
            const dataDateB = new Date(b.data);

            if (dataDateA.getTime() !== dataDateB.getTime()) {
                return dataDateA - dataDateB;
            }

            if (a.horario && b.horario) {
                const [horaA, minutoA] = a.horario.split(':').map(Number);
                const [horaB, minutoB] = b.horario.split(':').map(Number);
                const tempoA = horaA * 60 + minutoA;
                const tempoB = horaB * 60 + minutoB;

                return tempoA - tempoB;
            }

            return (a.horario ? 0 : 1) - (b.horario ? 0 : 1);
        });
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredTasks(tarefas);
            return;
        }

        const filtered = tarefas.filter(tarefa => {
            return tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase());
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
                    <Calendario events={tarefas} />
                </section>
                <div className="back-cards">
                    {mensagensErro.length > 0 && (
                        <div className="erro-mensagens">
                            {mensagensErro.map((erro, index) => (
                                <p key={index}>{erro}</p>
                            ))}
                        </div>
                    )}
                    {filteredTasks && filteredTasks.length > 0 ? (
                        filteredTasks.map((tarefa) => {
                            const { id, titulo, etiqueta, descricao, data, horario } = tarefa;

                            const tituloExibido = titulo || 'Título não informado';
                            const descricaoExibida = descricao || 'Descrição não informada';
                            const dataExibida = data && data !== '0000-00-00' ? data : 'Data não informada';
                            const horarioExibido = horario && horario !== '00:00' ? horario : 'Horário não informado';

                            return (
                                <Card className='cards-tarefa' style={{ width: '1000px' }} key={id}>
                                    <Card.Header>
                                        {dataExibida}
                                        <img src="../../public/images/excluir.png" alt="" onClick={() => excluirTarefa(id)} />
                                        <img src="../../public/images/editar.png" alt="" onClick={() => handleEditarClick(tarefa)} />
                                    </Card.Header>
                                    <Card.Body className="content-dataTask">
                                        <div className='titulo-important'>
                                            <Card.Title>{tituloExibido}</Card.Title>
                                            <div className='default-etiqueta'></div>
                                        </div>
                                        <Card.Text className='descricao'>
                                            {descricaoExibida}
                                        </Card.Text>
                                        <Card.Text className='todo-textcard'>
                                            {`Horário: ${horarioExibido}`}
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
                    tarefa={tarefaSelecionada} // Passa a tarefa selecionada para o formulário
                    onClose={handleFecharFormulario} // Função para fechar o formulário
                />
            )}
        </>
    );
}

export default ToDo;
