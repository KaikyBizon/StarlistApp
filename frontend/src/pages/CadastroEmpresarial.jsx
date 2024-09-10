import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../StylesPages/CadastroEmpresarial.css';

// Função para formatar o CNPJ
const formatCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    // Aplica a formatação do CNPJ conforme o usuário digita
    if (cnpj.length <= 2) return cnpj;
    if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
    if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
    if (cnpj.length <= 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
};

function CadastroEmpresarial() {
    const [formValues, setFormValues] = useState({
        cnpj: '',
        nomeEquipe: '',
        pessoasEquipe: '',
        cargo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cnpj') {
            const formattedCNPJ = formatCNPJ(value);
            setFormValues((prevValues) => ({
                ...prevValues,
                cnpj: formattedCNPJ,
            }));
        } else if (name === 'pessoasEquipe') {
            const numeroPessoas = value < 0 ? 0 : value; // Impede que o valor seja negativo
            setFormValues((prevValues) => ({
                ...prevValues,
                pessoasEquipe: numeroPessoas,
            }));
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };


    const [mensagensErro, setMensagensErro] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log(formValues)
        e.preventDefault();

        try {
            const resposta = await fetch('http://10.135.60.7:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'cadastro_empresarial', dados: formValues }),
            });

            const resultado = (await resposta.json()).dadosCadastro;
            console.log(resultado.mensagens_erro)

            if (resultado.error) {
                setMensagensErro(resultado.mensagens_erro);
            }
            else {
                console.log('Dados processados com sucesso!', resultado);
                navigate("/pagamento");
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
                                maxLength={18}
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
                                maxLength={40}
                            />
                        </div>
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_nome_equipe}</li>
                            ))}
                        </ul>

                        <div className="textos_empresarial">
                            <input
                                type="number"
                                name="pessoasEquipe"
                                placeholder="Quantidade de Pessoas na Equipe"
                                required
                                value={formValues.pessoasEquipe}
                                onChange={handleChange}
                                min="0" // Define o valor mínimo como 0
                            />
                        </div>
                        <ul className='erro'>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem_numero_participantes}</li>
                            ))}
                        </ul>

                        <div className="textos_empresarial">
                            <select className='cargo_empresarial'
                                name="cargo"
                                required
                                value={formValues.cargo}
                                onChange={handleChange}
                            >
                                <option value="">Selecione o cargo</option>
                                <option value="lider">Líder</option>
                                <option value="colaborador">Colaborador</option>
                            </select>
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
