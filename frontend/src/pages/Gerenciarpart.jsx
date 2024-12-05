/**
 * Nome do Componente: Gerenciarpart
 *
 * Descrição Detalhada:
 *   Componente funcional que gerencia a exibição de participantes em uma interface. 
 *   Ele utiliza componentes filhos para renderizar os cartões dos participantes e um cabeçalho para o título da página.
 *
 * Observações Pertinentes:
 *   1. O componente 'Cabecalho' é utilizado para exibir o título da página.
 *   2. Contém um título principal que indica a função do componente.
 *   3. Renderiza múltiplos componentes 'Cardgerenciar' para cada participante.
 *   4. Inclui um botão para adicionar novos participantes à lista.

 * Estrutura JSX:
 *   - Renderiza um cabeçalho e uma seção contendo um título e uma estrutura para os cartões.
 *   - Exibe vários cartões de participantes através do componente 'Cardgerenciar'.
 *   - Inclui um botão para adicionar novos participantes.
 */


import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cabecalho from "../components/Cabecalho";
import AddParticipantes from "../components/AddParticipantes";
import '../StylesPages/gerenciarpart.css';

function Gerenciarpart() {
    const [showAddParticipanteModal, setShowAddParticipanteModal] = useState(false);
    const [usuariosEquipe, setUsuariosEquipe] = useState([]);
    const [mensagemErro, setMensagemErro] = useState('');
    const [usuarioExpulsar, setUsuarioExpulsar] = useState(null);  // Estado para armazenar o usuário a ser expulso

    const handleShow = () => setShowAddParticipanteModal(true);
    const handleClose = () => setShowAddParticipanteModal(false);
    const [show, setShow] = useState(false);
    const handleCloseExpulsar = () => setShow(false);
    const handleShowExpulsar = () => setShow(true);

    const fetchUsersEquipe = async () => {
        const usuarioId = localStorage.getItem('ID');
        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: "buscar_usuarios_equipe", dados: { usuarioId } })
            });
            const resultado = (await resposta.json()).dadosCadastro;

            if (resultado.error) {
                setMensagemErro(resultado.usuarios);
            } else {
                setUsuariosEquipe(resultado.usuarios);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setMensagemErro('Erro ao carregar os participantes.');
        }
    };

    useEffect(() => {
        fetchUsersEquipe();
    }, []);

    const expulsarUsuario = async () => {
        console.log(usuarioExpulsar)
        try {
            // Aqui você pode enviar o nome do usuário junto com a ação de expulsão
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: "expulsar_usuario", dados: { nomeUsuario: usuarioExpulsar } })
            });
            const resultado = (await resposta.json()).dadosCadastro;

            if (resultado.error) {
                setMensagemErro(resultado.usuarios);
            } else {
                setUsuariosEquipe(resultado.usuarios);
                fetchUsersEquipe()
            }
        } catch (error) {
            console.error('Erro ao expulsar usuário:', error);
            setMensagemErro('Erro ao expulsar usuário.');
        }
    };

    return (
        <>
            <Cabecalho />
            <section id="gerenciar-part">
                <div id="title-gerenciar">
                    <h1>Gerenciar participantes</h1>
                </div>
                <div className="estrutura">
                    <div className="cards-gerenciar">
                        {/* Verifica se há usuários para exibir os cards ou mostra a mensagem de erro */}
                        {usuariosEquipe.length > 0 ? (
                            usuariosEquipe.map((usuario, index) => (
                                <Card id="cards-gerenciar-part" key={index}>
                                    <Card.Body>
                                        <div id="perfil-gerenc">
                                            <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="foto-perfil" />
                                            <div className="caracter-gerenciar">
                                                <Card.Title className="name-gerenc">{usuario[0]}</Card.Title>
                                                <p>Colaborador</p>
                                            </div>
                                        </div>
                                        <div id="btn-gerenc-part">
                                            <Button variant="danger" onClick={() => { setUsuarioExpulsar(usuario[0]); handleShowExpulsar(); }}>Expulsar do time</Button>

                                            <Modal
                                                show={show}
                                                onHide={handleCloseExpulsar}
                                                backdrop="static"
                                                keyboard={false}
                                            >
                                                <Modal.Body>
                                                    Tem certeza que deseja expulsar {usuarioExpulsar} do time?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCloseExpulsar}>
                                                        Cancelar
                                                    </Button>
                                                    <Button className='botao-enviar-addparticipante' variant="primary" onClick={() => { expulsarUsuario(); handleCloseExpulsar(); }}>Confirmar</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>{mensagemErro || 'Nenhum participante encontrado.'}</p>  // Exibe a mensagem de erro ou um texto padrão
                        )}
                    </div>
                    <button
                        className="addPart"
                        type="button"
                        name="botao"
                        value="addPart"
                        onClick={handleShow}
                    >
                        Adicionar participantes
                    </button>
                </div>
            </section>

            <AddParticipantes show={showAddParticipanteModal} handleClose={handleClose} />
        </>
    );
}

export default Gerenciarpart;
