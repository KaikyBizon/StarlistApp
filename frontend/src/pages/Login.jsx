import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../StylesPages/Login.css';

function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    senha: ''
  })

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
      const resposta = await fetch('http://10.135.60.19:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({acao: 'efetuar_login', dados: formValues}),
      });
      const resultado = (await resposta.json()).dados_processados.dadosCadastro;

      if (resultado.error) {
        // Atualiza o estado com as mensagens de erro para exibição no formulário
        setMensagensErro(resultado.mensagens_erro);
      } else {
        localStorage.setItem('ID', resultado.id);
        localStorage.setItem('email', resultado.email);
        localStorage.setItem('nome_usuario', resultado.nome_usuario);
        navigate("/kanban");
        // Dados foram processados com sucesso

      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleCancel = () => {
    setFormValues({ email: '', senha: '' });
  }
  return (
    <div className="geral">
      <div className="fundo-secundario">
        <div className="img-login">
          <img src="/public/images/img-login.png" alt="" />
        </div>
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


          <div className="botoes">
            <div className="btn-login">
              <button className="btn-entrar" type="submit" name="submit" value="Entrar" onClick={handleSubmit} disabled={!formValues.email || !formValues.senha}>Enviar</button>
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