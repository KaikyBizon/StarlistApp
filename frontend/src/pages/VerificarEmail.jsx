import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import '../StylesPages/VerificarEmail.css'

function VerificarEmail() {
    const [codigo, setCodigo] = useState(''); 

    const handleChange = (e) => {
        setCodigo(e.target.value); 
    }

    return (
        <section id="container_VerificarEmail">
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
                        maxLength="4"
                    />
                </Form.Group>
                <div className="botoes_ValidarEmail">
                    <Button className="botao_ValidarEmail" type="submit">
                        Verificar Código
                    </Button>

                    <Button className="botao_ValidarEmail" type="button">
                        Cancelar
                    </Button>
                </div>

                <Button className="enviarNovoCodigo" type="button" variant="link">
                    Enviar um novo código
                </Button>
            </Form>
        </section>
    )
}

export { VerificarEmail };
