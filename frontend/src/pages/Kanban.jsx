import Geral from '../components/Geral';
import Cabecalho from '../components/Cabecalho';
import Formulario from '../components/Formulario';
import { useState } from 'react';
import '../StylesPages/kanban.css';

function Kanban({ onListaSalva }) {
    const [lista, setLista] = useState([]);
    const [novaLista, setNovaLista] = useState(''); // Novo estado para o nome da nova tarefa
    const [show, setShow] = useState(false);
    const [mensagensErro, setMensagensErro] = useState([]);
    const [dadosTask, setDadosTask] = useState({
        acao: 'criar_lista',
        nome: '',
        tarefa_id: localStorage.getItem("ID")
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDadosTask((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!novaLista.trim()) {
            setMensagensErro(['O nome da lista não pode estar vazio']);
            return;
        }

        try {
            const resposta = await fetch('http://10.135.60.22:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...dadosTask,
                    nome: novaLista // Atualiza o nome da nova lista
                }),
            });

            const resultado = (await resposta.json()).dados_processados.listaCriada;

            if (!resposta.ok || resultado.mensagens_erro) {
                setMensagensErro(resultado.mensagens_erro);
            } else {
                // Atualize o estado da lista com a nova lista recebida do backend
                setLista((prevList) => [...prevList, novaLista]);
                setNovaLista(''); // Limpa o campo após adicionar
                setShow(false);
                setDadosTask({
                    nome: '',
                    tarefa_id: localStorage.getItem("ID")
                });
                if (onListaSalva) {
                    onListaSalva(); // Chama a função de callback
                }
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <>
            <Cabecalho/>
            <section className='interacao'>
                <section className='calendario-left'>
                    <Geral />
                </section>
                <section className='cartoes-kanban'>
                    <div className="listaAdiciona">
                        <div className="lista-adiciona">
                            <input
                                type="text"
                                placeholder="Digite o nome da lista"
                                value={novaLista}
                                onChange={(e) => setNovaLista(e.target.value)}
                            />
                            <button className="botao-adicionaLista" onClick={handleSubmit}>Adicionar lista</button>
                        </div>
                        <button className="excluir">X</button>
                    </div>
                    {lista.map((item, index) => (
                        <section key={index} className="status-kanban">
                            <div className="kanban">
                                <p className='status-tarefa'>{item}</p>
                                <Formulario />
                            </div>
                        </section>
                    ))}
                </section>
            </section>
        </>
    );
}

export default Kanban;
