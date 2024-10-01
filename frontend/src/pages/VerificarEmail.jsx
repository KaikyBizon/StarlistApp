import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import '../StylesPages/VerificarEmail.css'

function VerificarEmail() {
    const [codigo, setCodigo] = useState('');
    const [mensagemErro, setMensagemErro] = useState('')
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCodigo(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(codigo);

        try {
            const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'verificar_email', dados: codigo }),
            });

            const resultado = (await resposta.json()).dadosCadastro;
            console.log(resultado)

            if (resultado.error) {
                setMensagemErro(resultado.mensagem)
            } else {
                navigate('/TODO')
            }

        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <section id="container_VerificarEmail" onSubmit={handleSubmit}>
            <h1>Verificar o Email</h1>

            <Form className="Formulario_verificacao">
                <Form.Group className="codigoVerificacao">
                    <Form.Label>Código de Verificação</Form.Label>
                    <Form.Control
                        className="input_VerificarEmail"
                        type="text"
                        placeholder="Digite o código enviado para o seu e-mail"
                        value={codigo}
                        onChange={handleChange}
                        maxLength="6"
                    />
                </Form.Group>
                <p>{mensagemErro}</p>
                <div className="botoes_ValidarEmail">
                    <Button className="botao_ValidarEmail" type="submit">
                        Verificar Código
                    </Button>

                    <Button className="botao_ValidarEmail" type="button">
                        Cancelar
                    </Button>
                </div>

                <Button className="enviarNovoCodigo" type="button" variant="link">
                    Reenviar código
                </Button>
            </Form>
        </section>
    )
}

export { VerificarEmail };
