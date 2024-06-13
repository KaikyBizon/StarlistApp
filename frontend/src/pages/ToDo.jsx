import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Geral from '../components/Geral';
import Menu from '../components/menu';
import Options from '../components/Options';
import '../StylesPages/todo.css';

function ToDo() {
    const [tarefas, setTarefas] = useState([]);
    const [mensagensErro, setMensagensErro] = useState([]);

    useEffect(() => {
        const fetchTarefas = async () => {
            const usuarioId = localStorage.getItem('ID');
            try {
                const resposta = await fetch('http://10.135.60.7:8085/receber-dados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usuario_id: usuarioId })
                });
                const resultado = (await resposta.json()).dados_tarefa;
                console.log(resultado);

                if (resposta.ok) {
                    setTarefas(resultado);
                } else {
                    console.error('Erro no servidor:', resultado.mensagens_erro);
                    setMensagensErro(resultado.mensagens_erro || ['Erro ao obter mensagens de erro.']);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setMensagensErro(['Erro ao buscar dados.']);
            }
        };

        fetchTarefas();
    }, []);

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
                    {tarefas.map((tarefa, index) => (
                        <Card className='cards-tarefa' style={{ width: '1000px' }} key={index}>
                            <Card.Header className={tarefa.corClasse}>{tarefa.data}</Card.Header>
                            <Card.Body>
                                <div className='titulo-important'>
                                    <Card.Title>{tarefa.titulo}</Card.Title>
                                    <div className={tarefa.corEtiqueta}></div>
                                </div>
                                <Card.Text className='todo-textcard'>
                                    {tarefa.descricao}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
}

export default ToDo;
