/**
 * Nome do Componente: AddParticipantes
 *
 * Descrição Detalhada:
 *   Componente funcional React que exibe um modal para adicionar participantes a uma equipe.
 *   Utiliza hooks do React para gerenciar a exibição do modal e o estado dos inputs.
 *   Permite que o usuário insira o e-mail do participante e selecione o cargo desejado em um dropdown.
 *
 * Observações Pertinentes:
 *   1. O modal contém um formulário onde o usuário pode inserir o e-mail do participante e selecionar um cargo.
 *   2. O componente usa `react-bootstrap` para a estrutura visual e o estilo dos componentes.
 *
 * Estado:
 *   - show: Controla a visibilidade do modal para adicionar participantes.
 *
 * Funções:
 *   - handleClose: Função que define o estado 'show' como falso, fechando o modal.
 *   - handleShow: Função que define o estado 'show' como verdadeiro, abrindo o modal.
 *
 * Estrutura JSX:
 *   - Renderiza um item de dropdown que, ao ser clicado, abre o modal para adicionar participantes.
 *   - O modal inclui um título, um formulário com campos para e-mail e seleção de cargo, 
 *     e botões para fechar o modal ou enviar o convite.
 *
 */

import { Button, Form, Modal } from 'react-bootstrap';
import '../StylesPages/addparticipantes.css'
import { useState } from 'react';

function AddParticipantes({ show, handleClose }) {
    const [emailUser, setEmailUser] = useState('')
    const [nomeUsuarioConvidado, setNomeUsuarioConvidado] = useState('')
    const [mensagensErro, setMensagensErro] = useState('')


    const handleEmailChange = (e) => {
        setEmailUser(e.target.value); // Atualiza o estado com o valor digitado
    };

    // Função handleSubmit para enviar um convite para entrar na equipe
    // Autor: Kaiky
    // Criado em 07/11/2024
    // Parâmetros de entrada:
    // - e: evento de submissão do formulário
    // Retorno:
    // - Se o e-mail não existir, exibe a mensagem de erro
    // - Se o envio for bem sucedido, retorna mensagem confirmando o envio
    // Esta função envia os dados de login ao servidor, utilizando o método POST para o endpoint 'http://10.135.60.24:8085/receber-dados'.
    // Se o servidor retornar um erro, as mensagens de erro são exibidas na tela. Se o login for bem-sucedido, o convite é enviado.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch(`${BASE_URL}/receber-dados`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'buscar_usuario', dados: { emailUser: emailUser } }),
            });
            const resultado = (await resposta.json()).dadosCadastro;

            if (resultado.error) {
                // Atualiza o estado com a mensagem de erro para exibição no formulário
                setMensagensErro(resultado.mensagens_erro);
                setNomeUsuarioConvidado(''); // Limpa o nome do usuário em caso de erro
            } else {
                setMensagensErro(''); // Limpa mensagens de erro
                setNomeUsuarioConvidado(resultado.dados_usuario[1]); // Define o nome do usuário
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setMensagensErro('Erro ao enviar dados para o servidor');
            setNomeUsuarioConvidado('');
        }
    };

    // Função sendInvitation para enviar um convite para entrar na equipe
    // Autor: Kaiky
    // Criado em 12/11/2024
    // Parâmetros de entrada:
    // - e: evento de submissão do formulário
    // - acao: ação a ser executada no backend
    // Retorno:
    // - Se o convite não for enviado por algum motivo, exibe a mensagem de erro
    // - Se o envio for bem sucedido, retorna mensagem confirmando o envio
    // Esta função envia a requisição de convite do usuário para entrar na equipe ao servidor, utilizando o método POST para o endpoint 'http://10.135.60.24:8085/receber-dados'.
    const sendInvitation = async (e) => {
        const id_usuario = localStorage.getItem("ID")
        e.preventDefault();
        try {
            const resposta = await fetch(`${BASE_URL}/receber-dados`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({acao: 'enviar_convite', dados: {id_usuario}}),
            });
            const resultado = (await resposta.json()).dadosCadastro;
            console.log(resultado)

            if (resultado.error) {
                // Atualiza o estado com a mensagem de erro para exibição no formulário
                setMensagensErro(resultado.mensagens_erro);
            } else {
                handleClose()
                setEmailUser('')
                setMensagensErro(''); // Limpa mensagens de erro
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setMensagensErro('Erro ao enviar dados para o servidor');
            setNomeUsuarioConvidado('');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='color-addparticipante' closeButton>
                <Modal.Title>Adicionar participantes</Modal.Title>
            </Modal.Header>
            <Modal.Body className='color-addparticipante'>
                <h3 className='nome-equipe-addparticipante'>Programadores da Fiel</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email do usuário</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={emailUser}
                            onChange={handleEmailChange}
                            autoFocus
                        />
                        <p>{mensagensErro}</p>
                    </Form.Group>

                    {nomeUsuarioConvidado && (
                        <Form.Group className="mb-3 perfil-usuario">
                            <div className="perfil-addparticipante">
                                <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="perfil" />
                                <p>{nomeUsuarioConvidado}</p>
                            </div>
                            <div className="drop-cargo">
                                <Button className='botao-enviar-addparticipante' variant="primary" onClick={sendInvitation}>
                                    Enviar convite
                                </Button>
                            </div>
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer className='color-addparticipante'>
                <Button className='botao-fechar-addparticipante' variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button className='botao-enviar-addparticipante' variant="primary" onClick={handleSubmit}>
                    Buscar usuário
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddParticipantes;
