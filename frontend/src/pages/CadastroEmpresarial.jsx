import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../StylesPages/CadastroEmpresarial.css';

function CadastroEmpresarial() {
    const [formValues, setFormValues] = useState({
        cnpj: '',
        nomeEquipe: '',
        pessoasEquipe: '',
        cargo: ''
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
        console.log(formValues)
        e.preventDefault();

        try {
            const resposta = await fetch('http://10.135.60.18:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({acao: 'cadastro_empresarial', dados: formValues}),
            });

            const resultado = (await resposta.json()).dados_processados;
            console.log(resposta.ok)

            if (resposta.ok) {
                console.log('Dados processados com sucesso!', resultado);
                navigate("/login");
                setFormValues({
                    cnpj: '',
                    nomeEquipe: '',
                    pessoasEquipe: '',
                    cargo: ''
                });
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <section id="fundo_empresarial">
            <div id="geral_empresarial">
                <div className="login_empresarial">
                    <div className="titulo_empresarial">
                        <h1>CADASTRO EMPRESARIAL</h1>
                    </div>

                    <form id="right-login_empresarial" name="formulario_cadastro_empresarial" onSubmit={handleSubmit}>
                        <div className="textos_empresarial">
                            <input
                                type="text"
                                name="cnpj"
                                placeholder="Digite o CNPJ"
                                required
                                value={formValues.cnpj}
                                onChange={handleChange}
                            />
                        </div>
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_cnpj}</li>
                            ))}
                        </ul>

                        <div className="textos_empresarial">
                            <input
                                type="text"
                                name="nomeEquipe"
                                placeholder="Nome da equipe"
                                required
                                value={formValues.nomeEquipe}
                                onChange={handleChange}
                            />
                        </div>
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_nomeEquipe}</li>
                            ))}
                        </ul>

                        <div className="textos_empresarial">
                            <input
                                type="number"
                                name="pessoasEquipe"
                                placeholder="Número de pessoas na equipe"
                                required
                                value={formValues.pessoasEquipe}
                                onChange={handleChange}
                            />
                        </div>
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_pessoasEquipe}</li>
                            ))}
                        </ul>

                        <div className="textos_empresarial">
                            <input
                                type="text"
                                name="cargo"
                                placeholder="Cargo"
                                required
                                value={formValues.cargo}
                                onChange={handleChange}
                            />
                        </div>
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_cargo}</li>
                            ))}
                        </ul>

                        <div className="botoes_empresarial">
                            <div className="botao_confirmar">
                                <button className='botao_confirmar' id="btn-submit-empresarial" type="submit">Enviar</button>
                            </div>
                            <div className="botao_confirmar">
                                <button
                                    className='botao_confirmar'
                                    id="btn-cancel-empresarial"
                                    type="button"
                                    onClick={() => setFormValues({
                                        cnpj: '',
                                        nomeEquipe: '',
                                        pessoasEquipe: '',
                                        cargo: ''
                                    })}
                                >Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
};

export { CadastroEmpresarial };
