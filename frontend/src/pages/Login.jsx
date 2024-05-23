import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../components/Login.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const [mensagensErro, setMensagensErro] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:5000/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, senha: senha }),
      });
      const resultado = (await resposta.json()).login_status;

      if (resposta.ok) {
        localStorage.setItem('ID', resultado.id);
        localStorage.setItem('email', resultado.email);
        localStorage.setItem('nome_usuario', resultado.nome_usuario);


        if (resultado[1] !== 401) {
          navigate("/kanban");
        } 
        else {
          window.alert("Dados incorretos. Tente novamente!")
        }
      onLogin(data.email);
      // Dados foram processados com sucesso
    } else {
      // Atualiza o estado com as mensagens de erro para exibição no formulário
      setMensagensErro(resultado.mensagens);

    }
  } catch (error) {
    setError('Erro ao realizar login');
  }
};

const handleCancel = () => {
  setEmail('');
  setSenha('');
}
return (
  <div className="geral">
    <div className="fundo-secundario">
      <div className="img-login">
        <img src="/public/images/img-login.png" alt="" />
      </div>
      <form id="register-login" name="formulario_login" onSubmit={handleSubmit}>
        <div className="bem_vindo">
          <h1>BEM-VINDO!</h1>
        </div>

        <div className="login-area">
          <div className="dados">
            <input type="email" name="email" id="email_usuario" placeholder="Digite um e-mail"
              data-email-validate required data-mix-length="11" data-max-length="50" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <ul className='erro'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_email}</li>
            ))}
          </ul>
          <div className="dados">
            <input type="password" name="senha" id="password" placeholder="Digite uma senha"
              data-min-length="6" data-max-length="15" data-password-validate required value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          <ul className='erro'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_senha}</li>
            ))}
          </ul>
        </div>
        <a href="#">Esqueceu sua senha?</a>

        <div className="botoes">
          <div className="btn-login">
            <button className="btn-entrar" type="submit" name="submit" value="Entrar" onClick={handleSubmit} disabled={!email || !senha}>Enviar</button>
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