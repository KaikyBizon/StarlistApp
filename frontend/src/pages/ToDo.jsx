import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Geral from '../components/Geral';
import Menu from '../components/menu';
import Options from '../components/Options';
import '../StylesPages/todo.css';

function ToDo() {
    const [tarefas, setTarefas] = useState([]);
    const [mensagensErro, setMensagensErro] = useState([]);

    const fetchTarefas = async () => {
        const usuarioId = localStorage.getItem('ID');
        console.log('ID do usuário no fetch:', usuarioId);

        try {
            const resposta = await fetch('http://10.135.60.9:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario_id: usuarioId })
            });
            const resultado = await resposta.json();
            console.log('Resposta do servidor:', resultado);

            if (resposta.ok) {
                const tarefasOrdenadas = ordenarTarefas(resultado.dados_processados.dados_tarefa);
                setTarefas(tarefasOrdenadas); // Atualiza a lista de tarefas ordenadas
            } else {
                console.error('Erro no servidor:', resultado.mensagens_erro);
                setMensagensErro(resultado.mensagens_erro || ['Erro ao obter mensagens de erro.']);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setMensagensErro(['Erro ao buscar dados.']);
        }
    };

    // Função para ordenar tarefas pela data e horário
    const ordenarTarefas = (tarefas) => {
        return tarefas.sort((a, b) => {
            const [tituloA, dataA, horarioA] = a;
            const [tituloB, dataB, horarioB] = b;

            // Converter datas para objetos Date
            const dataDateA = new Date(dataA);
            const dataDateB = new Date(dataB);

            // Comparar datas
            if (dataDateA.getTime() !== dataDateB.getTime()) {
                return dataDateA - dataDateB; // Ordena pela data
            }

            // Se as datas forem iguais, comparar horários
            if (horarioA && horarioB) {
                const [horaA, minutoA] = horarioA.split(':').map(Number);
                const [horaB, minutoB] = horarioB.split(':').map(Number);
                const tempoA = horaA * 60 + minutoA; // Tempo em minutos
                const tempoB = horaB * 60 + minutoB; // Tempo em minutos

                return tempoA - tempoB; // Ordena pelo horário
            }

            // Se o horário não estiver disponível, considerar como horário 00:00
            return (horarioA ? 0 : 1) - (horarioB ? 0 : 1);
        });
    };

    useEffect(() => {
        fetchTarefas(); // Carrega as tarefas ao carregar a página
    }, [localStorage.getItem('ID')]); // Observa mudanças no localStorage ID

    const adicionarTarefa = async (novaTarefa) => {
        try {
            const resposta = await fetch('http://10.135.60.9:8085/adicionar-tarefa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaTarefa)
            });

            if (resposta.ok) {
                await fetchTarefas(); // Recarrega as tarefas após a adição bem-sucedida
            } else {
                const resultado = await resposta.json();
                console.error('Erro ao adicionar tarefa:', resultado.mensagens_erro);
                setMensagensErro(resultado.mensagens_erro || ['Erro ao adicionar tarefa.']);
            }
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            setMensagensErro(['Erro ao adicionar tarefa.']);
        }
    };

    return (
        <>
            <Menu />
            <Options />
            <section className='interacao'>
                <section className='calendario-left'>
                    <Geral />
                </section>
                <div className="back-cards">
                    {mensagensErro.length > 0 && (
                        <div className="erro-mensagens">
                            {mensagensErro.map((erro, index) => (
                                <p key={index}>{erro}</p>
                            ))}
                        </div>
                    )}
                    {tarefas && tarefas.length > 0 ? (
                        tarefas.map((tarefa, index) => {
                            const [titulo, data, horario] = tarefa;

                            // Valores padrão para lidar com casos de dados faltantes
                            const tituloExibido = titulo || 'Título não informado';
                            const dataExibida = data && data !== '0000-00-00' ? data : 'Data não informada';
                            const horarioExibido = horario && horario !== '00:00' ? horario : 'Horário não informado';

                            return (
                                <Card className='cards-tarefa' style={{ width: '1000px' }} key={index}>
                                    <Card.Header>{dataExibida}</Card.Header>
                                    <Card.Body>
                                        <div className='titulo-important'>
                                            <Card.Title>{tituloExibido}</Card.Title>
                                            {/* Substituir com a lógica para a cor da etiqueta, se necessário */}
                                            <div className='default-etiqueta'></div>
                                        </div>
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
        </>
    );
}

export default ToDo;
