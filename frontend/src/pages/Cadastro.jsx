/**
 * Nome do Componente: Cadastro
 *
 * Descrição Detalhada:
 *   Componente funcional React que representa um formulário de cadastro para novos usuários. 
 *   Utiliza hooks do React para gerenciar o estado dos valores do formulário e mensagens de erro. 
 *   Permite que os usuários insiram suas informações, que são enviadas para o backend, 
 *   e navega para a tela de verificação de e-mail ou exibe mensagens de erro conforme necessário.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar os valores dos campos do formulário e as mensagens de erro.
 *   2. Utiliza o hook 'useNavigate' do React Router para navegar entre as telas após o envio do formulário.
 *   3. Implementa a função 'handleChange' para atualizar os valores dos campos conforme o usuário os edita.
 *   4. Implementa a função 'handleSubmit' que envia os dados do formulário em formato JSON para o backend,
 *      lida com a resposta e atualiza o estado com mensagens de erro ou navega para a próxima tela.
 *
 * Estado:
 *   - formValues: Objeto contendo os valores dos campos do formulário (nome, email, senha, etc.).
 *   - mensagensErro: Array que contém as mensagens de erro a serem exibidas para o usuário.
 *
 * Funções:
 *   - handleChange: Atualiza o estado 'formValues' conforme os campos do formulário são alterados.
 *   - handleSubmit: Processa o envio do formulário, realiza a requisição ao backend e gerencia a navegação 
 *     ou exibição de mensagens de erro com base na resposta.
 *
 * Estrutura JSX:
 *   - Renderiza um formulário com campos para nome, email, senha, confirmação de senha, data de nascimento 
 *     e plano de assinatura.
 *   - Exibe mensagens de erro associadas a cada campo do formulário.
 *   - Inclui botões para enviar o formulário ou cancelar a operação.
 *   - Apresenta um link para a tela de login caso o usuário já tenha uma conta.
 */

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../StylesPages/Cadastro.css';

function Cadastro() {
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: '',
        confirme: '',
        dataNascimento: '',
        plano: ''
    });

    const [mensagensErro, setMensagensErro] = useState([]);
    const navigate = useNavigate();

    // Função handleChange para atualizar os valores dos campos do formulário de cadastro
    // 
    // Alterado em 03/09/2024
    // Parâmetros de entrada:
    // e - objeto - evento disparado ao alterar um campo de input no formulário
    // Retorno:
    // Atualiza o estado `formValues` com os novos valores dos campos
    // Esta função captura o nome e valor do campo alterado e atualiza o estado `formValues` de acordo com as mudanças feitas no formulário de cadastro
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Função handleSubmit para processar o envio do formulário de cadastro
    // 
    // Alterado em 
    // Parâmetros de entrada:
    // e - objeto - evento disparado ao submeter o formulário
    // Retorno:
    // Realiza uma requisição POST para cadastrar o usuário e navega para a página de verificação de e-mail ou exibe mensagens de erro
    // Esta função previne o comportamento padrão do formulário, armazena o email no localStorage, envia os dados do formulário em formato JSON para o backend, e com base na resposta, exibe mensagens de erro ou redireciona o usuário para a página de verificação de e-mail
    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('email', formValues.email);
        console.log(formValues);

        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'cadastro', dados: formValues }),
            });

            const resultado = (await resposta.json()).dadosCadastro;

            

            if (resultado.error) {
                setMensagensErro(resultado.mensagens_erro)
                console.log("mensagens", mensagensErro)
            }
            else {
                navigate("/verificarEmail")



                // Só navegar se não houver mensagens de erro
                // if (!resultado.mensagens_erro) {
                //   if (formValues.plano === 'empresarial') {
                //       navigate("/cadastroempresarial");
                //   } else if (formValues.plano === 'gratuito') {
                //       navigate("/login");
                //  } else {
                //      navigate("/pagamento");
                // }

                // Resetar valores do formulário
                //  setFormValues({
                //      nome: '',
                //     email: '',
                //     senha: '',
                //     confirme: '',
                //      dataNascimento: '',
                //      plano: ''
                //  });
                //}
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
                    <div className="titulo_Cadastro">
                        <h1>CADASTRE-SE</h1>
                    </div>

                    <form id="right-login" name="formulario_cadastro">
                        {/* Campos do formulário */}
                        <div className="textos">
                            <input
                                type="text"
                                name="nome"
                                id="nome_usuario"
                                placeholder="Digite seu nome de usuário"
                                required
                                data-min-length="3"
                                data-max-length="30"
                                data-required
                                value={formValues.nome}
                                onChange={handleChange}
                                maxLength={30}
                            />
                        </div>

                        {/* Exibição de mensagens de erro */}
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_nome}</li>
                            ))}
                        </ul>

                        <div className="textos">
                            <input
                                type="email"
                                name="email"
                                id="email_usuario"
                                placeholder="Digite um e-mail"
                                data-email-validate
                                required
                                data-mix-length="11"
                                data-max-length="50"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_email}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="textos">
                            <input
                                type="password"
                                name="senha"
                                id="senha_usuario"
                                placeholder="Digite uma senha"
                                data-min-length="6"
                                data-max-length="15"
                                data-password-validate
                                required
                                value={formValues.senha}
                                onChange={handleChange}
                                maxLength={64}
                            />
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_senha}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="textos">
                            <input
                                type="password"
                                name="confirme"
                                id="confirma_senha"
                                placeholder="Confirme sua senha"
                                required
                                data-equal="Senha"
                                value={formValues.confirme}
                                onChange={handleChange}
                                maxLength={64}
                            />
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_confirmar}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="textos">
                            <input
                                type="date"
                                name="dataNascimento"
                                id="data_nasc"
                                placeholder="Data de nascimento"
                                data-valida-nasc
                                required
                                value={formValues.dataNascimento}
                                onChange={handleChange}
                            />
                            <ul className='erro'>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem_idade}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="textos">
                            <select
                                name="plano"
                                id="plano"
                                value={formValues.plano}
                                onChange={handleChange}
                            >
                                <option value="" disabled hidden>Selecione um plano</option>
                                <option value="gratuito">Gratuito</option>
                                <option value="mensal">Mensal</option>
                                <option value="anual">Anual</option>
                                <option value="empresarial">Empresarial</option>
                            </select>
                        </div>

                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_plano}</li>
                            ))}
                        </ul>

                        <div className='Link_JaTemConta'>
                            <p className='JaTemConta'>Já tem uma conta? <Link to="/login" className='VaParaLogin'>Faça Login</Link></p>
                        </div>

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
                                    plano: ''
                                })}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export { Cadastro };