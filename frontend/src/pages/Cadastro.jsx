import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../components/Cadastro.css';

/**
     * Nome do Componente: Cadastro
     *
     * Descrição Detalhada:
     *   Componente funcional React que representa um formulário de cadastro. 
     *   Ele utiliza hooks do React para gerenciar o estado do formulário e mensagens de erro.
     *   O formulário é submetido via uma requisição POST para 'http://10.135.60.7:8085/receber-dados'.
     *   Exibe mensagens de erro, se houver, e imprime mensagens de sucesso ou falha no console.
     *
     * Observações Pertinentes:
     *   1. Utiliza o hook 'useState' para gerenciar o estado do formulário (formValues) e das mensagens de erro.
     *   2. O evento 'handleChange' é acionado ao digitar nos campos do formulário e atualiza o estado correspondente.
     *   3. O formulário é submetido via requisição 'fetch' ao servidor, e a resposta é tratada no bloco 'try-catch'.
     *   4. Exibe mensagens de erro no console e no formulário, se houverem, após a resposta do servidor.
     *
     * Estado:
     *   - formValues: Armazena os valores do formulário.
     *   - mensagensErro: Armazena mensagens de erro vindas do servidor.
     *
     * Funções:
     *   - handleChange: Atualiza o estado 'formValues' ao digitar nos campos do formulário.
     *   - handleSubmit: Envia os dados do formulário para o servidor e trata a resposta.
     *
     * Estrutura JSX:
     *   - Renderiza um formulário com campos para nome, e-mail, senha, confirmação de senha e data de nascimento.
     *   - Exibe mensagens de erro abaixo dos campos correspondentes.
     *   - Possui botões para confirmar o cadastro e cancelar.
     *
     * @returns {JSX.Element}
     */


function Cadastro() {
    const [formValues, setFormValues] = useState({
        acao: 'cadastro',
        nome: '',
        email: '',
        senha: '',
        confirme: '',
        dataNascimento: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
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
                body: JSON.stringify(formValues),
            });

            const resultado = (await resposta.json()).dados_processados;
            console.log(resposta.ok)

            if (resposta.ok && resultado.mensagens_erro.length > 0) {
                // Assume que a estrutura de erro vem no campo 'mensagens_erro'
                console.error('Erro no servidor:', resultado.mensagens_erro);
                setMensagensErro(resultado.mensagens_erro);
            } else {
                console.log('Dados processados com sucesso!', resultado);
                navigate("/login");
                setFormValues({
                    nome: '',
                    email: '',
                    senha: '',
                    confirme: '',
                    dataNascimento: '',
                })
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <section id="fundo">
            <div id="geral">
                <h1 className="msg">
                    <div className="amarelo">Organize sua vida</div>com apenas uma tela
                </h1>
                <div className="login">
                    <div className="titulo">
                        <h1>CADASTRE-SE</h1>
                    </div>



                    <form id="right-login" name="formulario_cadastro" >
                        {/* Campos do formulário */}
                        <div className="textos">
                            <input type="text" name="nome" id="nome_usuario" placeholder="Digite seu nome de usuário"
                                required data-min-length="3" data-max-length="30" data-required
                                data-only-letters value={formValues.nome} onChange={handleChange} />
                        </div>

                        {/* Exibição de mensagens de erro */}
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_nome}</li>
                            ))}
                        </ul>

                        <div className="textos">
                            <input type="email" name="email" id="email_usuario" placeholder="Digite um e-mail"
                                data-email-validate required data-mix-length="11" data-max-length="50" value={formValues.email} onChange={handleChange} />
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_email}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Exibição de mensagens de erro */}


                        <div className="textos">
                            <input type="password" name="senha" id="senha_usuario" placeholder="Digite uma senha"
                                data-min-length="6" data-max-length="15" data-password-validate required value={formValues.senha} onChange={handleChange} />

                            {/* Exibição de mensagens de erro */}
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_senha}</li>
                                ))}
                            </ul>
                        </div>



                        <div className="textos">
                            <input type="password" name="confirme" id="confirma_senha" placeholder="Confirme sua senha"
                                required data-equal="Senha" value={formValues.confirme} onChange={handleChange} />
                        </div>

                        {/* Exibição de mensagens de erro */}
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_confirmar}</li>
                            ))}
                        </ul>

                        <div className="textos">
                            <input type="date" name="dataNascimento" id="data_nasc" placeholder="Data de nascimento" data-valida-nasc
                                required value={formValues.dataNascimento} onChange={handleChange} />
                        </div>

                        {/* Exibição de mensagens de erro */}
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_idade}</li>
                            ))}
                        </ul>

                        <div className="botoes">
                            <div className="botao_confirmar">

                                <button className='botao_confirmar' id="btn-submit" type="submit" name="submit" value="Cadastrar-se" onClick={handleSubmit}>Enviar</button>

                            </div>
                            <div className="botao_confirmar">
                                <button className='botao_confirmar' id="btn-cancel" type="button" name="botao" value="Cancelar" onClick={() => setFormValues({
                                    nome: '',
                                    email: '',
                                    senha: '',
                                    confirme: '',
                                    dataNascimento: '',
                                })}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
};


export { Cadastro };