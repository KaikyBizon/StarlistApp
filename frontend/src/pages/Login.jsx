/**
 * Nome do Componente: LoginForm
 *
 * Descrição Detalhada:
 *   Componente funcional que representa o formulário de login da aplicação. 
 *   Permite que os usuários insiram seu e-mail e senha para autenticar-se no sistema.
 *
 * Estrutura e Funcionamento:
 *   - Utiliza hooks do React (`useState` e `useEffect`) para gerenciar o estado do formulário e os erros.
 *   - Contém um manipulador de eventos para mudanças de entrada que atualiza o estado do formulário.
 *   - Ao submeter o formulário, faz uma requisição assíncrona ao servidor para autenticação.
 *   - Se a autenticação falhar, as mensagens de erro são exibidas. Se for bem-sucedida, os dados do usuário são armazenados no `localStorage` e o usuário é redirecionado para a página do Kanban.
 *   - Inclui um botão de cancelamento que limpa os campos do formulário.
 *
 * Observações Pertinentes:
 *   1. O formulário inclui validações nos campos de entrada para garantir que os dados inseridos estejam no formato correto.
 *   2. Links para recuperação de senha e cadastro são incluídos para facilitar a navegação do usuário.
 *   3. Utiliza o `useNavigate` do `react-router-dom` para redirecionar após o login bem-sucedido.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../StylesPages/Login.css';

function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    senha: ''
  })

  // Função que atualiza o estado do formulário com o valor do input correspondente ao evento de mudança.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [mensagensErro, setMensagensErro] = useState([]);
  const navigate = useNavigate();

  // Função handleSubmit para efetuar o login do usuário
  //
  // Alterado em 
  // Parâmetros de entrada:
  // - e: evento de submissão do formulário
  // Retorno:
  // - Faz uma requisição ao servidor para autenticar o usuário com base nos dados do formulário de login
  // - Se houver erros no login, exibe as mensagens de erro
  // - Se o login for bem-sucedido, armazena o ID, email e nome do usuário no localStorage e redireciona para a página de Kanban
  // Esta função envia os dados de login ao servidor, utilizando o método POST para o endpoint 'http://10.135.60.24:8085/receber-dados'.
  // Se o servidor retornar um erro, as mensagens de erro são exibidas no formulário. Se o login for bem-sucedido, as informações do usuário são armazenadas no localStorage e o usuário é redirecionado para a página Kanban.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: 'efetuar_login', dados: formValues }),
      });
      const resultado = await resposta.json();
      console.log(resultado)

      if (resultado.dadosCadastro.error) {
        // Atualiza o estado com as mensagens de erro para exibição no formulário
        setMensagensErro(resultado.dadosCadastro.mensagens_erro);
      } else {
        localStorage.setItem('ID', resultado.dadosCadastro.id);
        localStorage.setItem('email', resultado.dadosCadastro.email);
        localStorage.setItem('nome_usuario', resultado.dadosCadastro.nome_usuario);
        navigate("/kanban");
        // Dados foram processados com sucesso

      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  // Função que redefine os valores do formulário, limpando os campos de email e senha.
  const handleCancel = () => {
    setFormValues({ email: '', senha: '' });
  }
  return (
    <div className="geral">
      <div className="fundo-secundario">

        <form id="register-login" name="formulario_login" onSubmit={handleSubmit} autoComplete='off'>
          <div className="bem_vindo">
            <h1>BEM-VINDO!</h1>
          </div>
          <ul className='erro'>
            <li>{mensagensErro}</li>
          </ul>
          <div className="login-area">
            <div className="dados">
              <input type="email" name="email" id="email_usuario" placeholder="Digite um e-mail"
                data-email-validate required data-mix-length="11" data-max-length="50" value={formValues.email} onChange={handleChange} autoComplete='off' />
            </div>

            <div className="dados">
              <input type="password" name="senha" id="password" placeholder="Digite uma senha"
                data-min-length="6" data-max-length="15" data-password-validate required value={formValues.senha} onChange={handleChange} autoComplete='off' />
            </div>
          </div>
          <a href="#">Esqueceu sua senha?</a>

          {/*Link para ir para o Cadastro */}
          <a href="#">Ainda não tem conta? <Link to="/cadastro" className='crieUma'>Crie uma</Link></a>

          <div className="botoes_Login">
            <div className="btn-login">
              <button className="btn-entrar" type="submit" name="submit" value="Entrar" onClick={handleSubmit} disabled={!formValues.email || !formValues.senha}>Entrar</button>
            </div>
            <div className="btn-login">
              <button className="btn-entrar" type="button" name="botao" value="Cancelar" onClick={handleCancel} >Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginForm };