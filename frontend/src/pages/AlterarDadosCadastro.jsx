/**
 * Nome do Componente: AlterarDadosCadastro
 *
 * Descrição Detalhada:
 *   Componente funcional React que permite ao usuário editar seus dados de cadastro, 
 *   incluindo nome, e-mail e data de nascimento. O componente utiliza hooks do React para 
 *   gerenciar estados, carregar dados do usuário a partir de uma API, e enviar atualizações 
 *   de volta ao backend. Além disso, oferece a opção de excluir o usuário do sistema.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar os dados do formulário e mensagens de erro.
 *   2. A função 'showDados' é utilizada para carregar os dados do usuário ao montar o componente.
 *   3. O componente implementa a validação de campos e exibe mensagens de erro abaixo dos inputs.
 *   4. O redirecionamento é realizado através do hook 'useNavigate' do React Router.
 *
 * Estado:
 *   - nomeUsuario: Armazena o nome do usuário para exibição.
 *   - formAlter: Objeto que armazena os dados do formulário (nome, email, data de nascimento, id).
 *   - mensagensErro: Armazena mensagens de erro relacionadas à validação dos campos.
 *
 * Funções:
 *   - showDados: Carrega os dados do usuário do backend e atualiza o estado do formulário.
 *   - handleChange: Atualiza os valores dos campos do formulário conforme o usuário digita.
 *   - handleDelete: Exclui o usuário do sistema e redireciona para a página de login.
 *   - handleSubmit: Envia as atualizações do cadastro do usuário ao backend e gerencia o redirecionamento.
 *
 * Estrutura JSX:
 *   - Renderiza um cabeçalho, informações do usuário, um formulário para edição dos dados 
 *     e botões para salvar ou deletar os dados.
 */

import '../StylesPages/AlterarDadosCadastro.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Cabecalho from '../components/Cabecalho';

const AlterarDadosCadastro = () => {
    const [nomeUsuario, setNomeUsuario] = useState('');

    // State para armazenar os dados do formulário
    const [formAlter, setFormAlter] = useState({
        nome: '',
        email: '',
        dataNascimento: '',
        id: localStorage.getItem("ID")
    });


    // Função showDados para carregar os dados do usuário a partir do backend
    // 
    // Alterado em
    // Parâmetros de entrada:
    // Nenhum parâmetro de entrada direto, mas utiliza `formAlter.id` para identificar o usuário
    // Retorno:
    // Faz uma requisição ao servidor para buscar os dados do usuário e atualiza o estado `formAlter` com as informações obtidas
    // Esta função realiza uma requisição POST para buscar os dados do usuário, preenche o formulário com nome, email, data de nascimento e ID, e define o nome do usuário no estado
    const showDados = async () => {
        try {
            const resposta = await fetch('http://192.168.137.1:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'selecionar_dados_usuario', dados: formAlter.id }),
            });
            const dados = (await resposta.json()).dadosCadastro;

            setFormAlter({
                nome: dados.nome_usuario,
                email: dados.email,
                dataNascimento: dados.data_nasc,
                id: localStorage.getItem("ID")
            });
            setNomeUsuario(dados.nome_usuario);
        } catch (error) {
            console.error('Erro ao carregar dados!', error)
        }
    };
    localStorage.setItem('email', formAlter.email);
    localStorage.setItem('nome_usuario', formAlter.nome);

    // Função handleChange para atualizar os valores dos campos do formulário
    // 
    // Alterado em 
    // Parâmetros de entrada:
    // e - objeto - evento disparado ao alterar um campo de input no formulário
    // Retorno:
    // Atualiza o estado `formAlter` com os novos valores dos campos
    // Esta função captura o nome e valor do campo alterado e atualiza o estado `formAlter` de acordo com as mudanças feitas no formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormAlter((prevAlter) => ({
            ...prevAlter,
            [name]: value,
        }));
    };

    // Função handleDelete para excluir o usuário do sistema
    // 
    // Alterado em 
    // Parâmetros de entrada:
    // Nenhum parâmetro direto, mas utiliza `formAlter.id` para identificar o usuário
    // Retorno:
    // Faz uma requisição ao servidor para excluir o usuário e redireciona para a página de login
    // Esta função realiza uma requisição para excluir o usuário com base no ID armazenado em `formAlter`, e após a exclusão bem-sucedida, redireciona o usuário para a página de login
    const handleDelete = async () => {
        try {
            const idUsuario = formAlter.id; // Defina idUsuario a partir do estado formAlter
            const resposta = await fetch('http://192.168.137.1:8085/delete-usuario', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'excluir_usuario', id: idUsuario }),
            });

            const resultado = await resposta.json();
            console.log(resultado)

            navigate("/login");
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    const [mensagensErro, setMensagensErro] = useState([]);
    const navigate = useNavigate();

    // Função handleSubmit para enviar as atualizações do cadastro do usuário ao backend
    // 
    // Alterado em 
    // Parâmetros de entrada:
    // e - objeto - evento disparado ao submeter o formulário
    // Retorno:
    // Realiza uma requisição POST para atualizar os dados do usuário e redireciona com base no resultado da operação
    // Esta função previne o comportamento padrão do formulário, envia os dados atualizados em formato JSON, e se houver erros, atualiza o estado para exibir mensagens de erro; 
    // caso contrário, redireciona o usuário para a página do Kanban
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch('http://192.168.137.1:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'atualizar_cadastro', dados: formAlter }),
            });

            const resultado = (await resposta.json()).dadosCadastro;
            console.log("Resposta: ", resultado)

            if (resultado.error) {
                // Atualiza o estado com as mensagens de erro para exibição no formulário
                setMensagensErro(resultado.mensagens_erro);
            }
            else {
                navigate("/kanban");
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    useEffect(() => {
        showDados();
    }, []);


    return (
        <>
            <Cabecalho />
            <section className='editar_usuario'>
                <div className="titulo_alterar_dados">
                    <h1>EDITAR USUÁRIO</h1>
                </div>
                <div className="usuario">
                    <img className='foto_usuario' src="https://cdn-icons-png.flaticon.com/128/5617/5617164.png" alt="user" />
                    <div className="user_log">
                        <h3>{nomeUsuario}</h3>
                        <p>ID: {localStorage.getItem("ID")}</p>
                    </div>
                </div>
                <Form className='form_alterar_usuario'>
                    <Row className="alterar_nome_email" >
                        <div className="campo_dados">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control className='alter_name' name='nome' value={formAlter.nome} onChange={handleChange} type="text" placeholder="Digite seu nome" />
                            </Form.Group>
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_nome}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="campo_dados">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control className='alter_email' name='email' value={formAlter.email} onChange={handleChange} type="email" placeholder="Digite seu email" />
                            </Form.Group>
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_email}</li>
                                ))}
                            </ul>
                        </div>
                    </Row>

                    <Form.Group className="alterar_data_nascimento" controlId="formGridAddress1">
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control className='alter_date' name='dataNascimento' value={formAlter.dataNascimento} onChange={handleChange} type="date" />
                    </Form.Group>
                    <ul className='erro'>
                        {mensagensErro.map((mensagem, index) => (
                            <li key={index}>{mensagem.mensagem_idade}</li>
                        ))}
                    </ul>
                    <div className="botoes_alterar_dados">
                        <Button className='botao_salvar_dados' variant="primary" type="submit" onClick={handleSubmit}>
                            Salvar
                        </Button>
                        <Button className='botao_deletar_dados' variant="danger" onClick={handleDelete}>
                            Deletar
                        </Button>
                    </div>
                </Form>
            </section>
        </>
    );
}
export default AlterarDadosCadastro;