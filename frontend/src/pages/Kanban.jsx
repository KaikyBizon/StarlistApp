import Geral from '../components/Geral';
import Menu from '../components/menu';
import Options from '../components/Options';
import Formulario from '../components/Formulario';
import { useState, useEffect } from 'react';
import '../StylesPages/kanban.css';

function Kanban({ onListaSalva }) {
    const [lista, setLista] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tarefasPorCategoria, setTarefasPorCategoria] = useState({});
    const [novaLista, setNovaLista] = useState('');
    const [exibirFormulario, setExibirFormulario] = useState(false);

    const [dadosList, setDadosList] = useState({
        nome: '',
        tarefa_id: localStorage.getItem("ID"),
        usuario_id: localStorage.getItem("ID")
    });

    // Função para buscar tarefas para uma categoria específic
    const fetchTarefasParaCategoria = async (categoriaId) => {
        try {
            const resposta = await fetch(`http://10.135.60.19:8085/tarefas/${categoriaId}`, {
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

    // Função para buscar categorias e tarefas
    const fetchCategoriasETarefas = async () => {
        const usuarioId = localStorage.getItem('ID');
        try {
            const resposta = await fetch(`http://10.135.60.19:8085/lista/${usuarioId}`, {
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

    const handleChange = (event) => {
        setNovaLista(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!novaLista.trim()) {
            setMensagensErro(['O nome da lista não pode estar vazio']);
            return;
        }

        try {
            const resposta = await fetch('http://10.135.60.19:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'criar_lista',
                    dados: { ...dadosList, nome: novaLista }
                }),
            });

            const resultado = (await resposta.json()).listaCriada;

            if (!resposta.ok || resultado.mensagens_erro) {
                setMensagensErro(resultado.mensagens_erro);
            } else {
                const novaListaAtualizada = [...lista, novaLista];
                setLista(novaListaAtualizada);
                setNovaLista('');

                // Salva as listas no localStorage
                localStorage.setItem('listas', JSON.stringify(novaListaAtualizada));
                window.location.reload()

                if (onListaSalva) {
                    onListaSalva();
                }
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const handleClearInput = () => {
        setNovaLista('');
    };

    // Função para alternar a exibição do formulário
    const handleExibirFormulario = () => {
        setExibirFormulario(!exibirFormulario);
    };

    useEffect(() => {
        fetchCategoriasETarefas();
    }, []);

    return (
        <>
            <Menu />
            <Options />
            <section className='interacao'>
                <section className='calendario-left'>
                    <Geral />
                </section>

                <section className='cartoes-kanban'>
                    {categorias.map((categoria) => (
                        <section key={categoria.id} className="status-kanban">
                            <div className="kanban">
                                <div className='titulo-lista'>
                                    <h4 className='status-tarefa'>{categoria.nome}</h4>
                                </div>
                                {tarefasPorCategoria[categoria.id] && tarefasPorCategoria[categoria.id].map((tarefa, index) => (
                                    <div key={index} className="tarefa-item">
                                        <h5 className='titulo-tarefa'>{tarefa.titulo}</h5>
                                        <p className='data-hora'>Data: {tarefa.data}</p>
                                        <p className='data-hora'>Hora: {tarefa.horario}</p>
                                    </div>
                                ))}
                                <div className="formulario-fixo">
                                    <button onClick={handleExibirFormulario}>Nova tarefa</button>
                                    {exibirFormulario && <Formulario />} {/* Renderiza o formulário se o estado exibirFormulario for true */}
                                </div>
                            </div>

                        </section>
                    ))}
                    <div className="lista-adiciona">
                        <input type="text" placeholder="Digite o nome da lista" value={novaLista} onChange={handleChange} />
                        <div className='botões'>
                            <button className="botao-adicionaLista" onClick={handleSubmit}>Adicionar lista</button>
                            <button className="excluir" onClick={handleClearInput}>X</button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default Kanban;