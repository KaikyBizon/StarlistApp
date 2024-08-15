import Geral from '../components/Geral';
import Menu from '../components/menu';
import Options from '../components/Options';
import Formulario from '../components/Formulario';
import { useState } from 'react';
import '../StylesPages/kanban.css'

function Kanban() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState(''); // Novo estado para o nome da nova tarefa
    const [mensagensErro, setMensagensErro] = useState([]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim()) {
            setTarefas([...tarefas, novaTarefa]);
            setNovaTarefa(''); // Limpa o campo após adicionar
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
                <section className='cartoes-kanban'>
                    <div className="listaAdiciona">
                        <div className="lista-adiciona">
                            <input
                                type="text"
                                placeholder="Digite o nome da lista"
                                value={novaTarefa}
                                onChange={(e) => setNovaTarefa(e.target.value)}
                            />
                            <button className="botao-adicionaLista" onClick={adicionarTarefa}>Adicionar lista</button>
                        </div>
                        <button className="excluir">X</button>
                    </div>
                    {tarefas.map((tarefa, index) => (
                        <section key={index} className="status-kanban">
                            <div className="kanban">
                                <p className='status-tarefa'>{tarefa}</p>
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