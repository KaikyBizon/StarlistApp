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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('email', formValues.email);
        console.log(formValues);

        try {
            const resposta = await fetch('http://10.135.60.9:8085/receber-dados', {
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