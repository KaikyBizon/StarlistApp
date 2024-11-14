/**
 * Nome do Componente: VerificarEmail
 *
 * Descrição Detalhada:
 *   Componente funcional React que exibe uma tela para verificação de e-mail. 
 *   Permite que o usuário insira um código de verificação recebido por e-mail e o submeta para validação.
 *   Utiliza hooks do React para gerenciar o estado do código e mensagens de erro, e o hook `useNavigate` do React Router para navegação.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar o estado do código de verificação e mensagens de erro.
 *   2. A função `handleSubmit` faz uma requisição POST ao servidor para verificar o código inserido.
 *   3. Se a verificação for bem-sucedida, o usuário é redirecionado para a página de tarefas; caso contrário, uma mensagem de erro é exibida.
 *
 * Estado:
 *   - codigo: Valor do código de verificação inserido pelo usuário.
 *   - mensagemErro: Mensagem de erro a ser exibida se a verificação falhar.
 *
 * Funções:
 *   - handleChange: Atualiza o estado do código com o valor do input quando ocorre uma mudança.
 *   - handleSubmit: Verifica o código de e-mail fornecido pelo usuário e gerencia a navegação baseada no resultado da verificação.
 *
 * Estrutura JSX:
 *   - Renderiza um formulário com um campo de entrada para o código de verificação.
 *   - Inclui botões para verificar o código, cancelar a operação e reenviar o código.
 *   - Exibe uma mensagem de erro, se presente.
 *
 */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import '../StylesPages/VerificarEmail.css'

function VerificarEmail() {
    const [codigo, setCodigo] = useState('');
    const [mensagemErro, setMensagemErro] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    // Obtendo o plano do state enviado pelo componente Cadastro
    const plano = location.state?.plano;

    // Função que atualiza o estado do código com o valor do input quando ocorre uma mudança.
    const handleChange = (e) => {
        setCodigo(e.target.value);
    }

    // Função handleSubmit para verificar o código de email fornecido pelo usuário
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - e: o evento do formulário que aciona o envio
    // Retorno:
    // - Nenhum retorno explícito, mas navega para a página de TODO se a verificação for bem-sucedida
    // 
    // Esta função é chamada quando o formulário de verificação de email é enviado. 
    // Primeiro, ela impede o comportamento padrão do formulário com e.preventDefault() e registra o código inserido no console.
    // Em seguida, faz uma requisição POST para o servidor, enviando o código de verificação.
    // Se a resposta contiver um erro, uma mensagem de erro é definida para ser exibida na interface do usuário.
    // Se a verificação for bem-sucedida, o usuário é redirecionado para a página de tarefas (TODO).
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(codigo);

        try {
            const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao: 'verificar_email', dados: { email: location.state?.email, codigo: codigo } }),
            });

            const resultado = (await resposta.json()).dadosCadastro;
            console.log(resultado)

            if (resultado.error) {
                setMensagemErro(resultado.mensagem);
            } else {
                // Roteamento baseado no plano escolhido
                if (location.state?.plano === 'empresarial') {
                    navigate("/cadastroempresarial");
                } else if (location.state?.plano === 'gratuito') {
                    navigate("/login");
                } else {
                    navigate("/pagamento");
                }
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
