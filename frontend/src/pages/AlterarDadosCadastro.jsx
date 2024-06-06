import '../StylesPages/AlterarDadosCadastro.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Options from '../components/Options'
import Navbar from '../components/Navbar'

const AlterarDadosCadastro = () => {
    const [nomeUsuario, setNomeUsuario] = useState('');

    // State para armazenar os dados do formulário
    const [formAlter, setFormAlter] = useState({
        nome: '',
        email: '',
        dataNascimento: '',
        id: localStorage.getItem("ID")
    });

    useEffect(() => {
        const showDados = async () => {
            try {
                const resposta = await fetch('http://10.135.60.9:8085/dados-atuais', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formAlter),
                });
                const dados = await resposta.json();
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

        showDados();
    }, []);
    localStorage.setItem('email', formAlter.email);
    localStorage.setItem('nome_usuario', formAlter.nome);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormAlter((prevAlter) => ({
            ...prevAlter,
            [name]: value,
        }));
    };

    const handleDelete = async () => {
        try {
            const idUsuario = formAlter.id; // Defina idUsuario a partir do estado formAlter
            const resposta = await fetch('http://10.135.60.9:8085/delete-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'excluir_usuario', id: idUsuario }),
            });

            const resultado = await resposta.json();

            navigate("/login");
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    const [mensagensErro, setMensagensErro] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch('http://10.135.60.9:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formAlter),
            });

            const resultado = (await resposta.json()).update_status;

            if (resultado.erro) {
                // Atualiza o estado com as mensagens de erro para exibição no formulário
                setMensagensErro(resultado.mensagens);
            }
            else {
                navigate("/kanban");
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Options />
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