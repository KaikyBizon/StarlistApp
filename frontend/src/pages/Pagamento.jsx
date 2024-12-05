/**
 * Nome do Componente: Pagamento
 *
 * Descrição Detalhada:
 *   Componente funcional React que gerencia a tela de pagamento. Permite ao usuário escolher entre métodos de pagamento via cartão de crédito ou Pix.
 *   Utiliza hooks do React para gerenciar o estado dos campos de entrada e a navegação para a tela de login após a conclusão do pagamento.
 *   Inclui funções para formatação e validação de entradas, como número do cartão, data de validade, CVV, CPF e código Pix.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar o estado de diversos campos relacionados ao pagamento.
 *   2. O hook 'useNavigate' do React Router é utilizado para redirecionar o usuário para a página de login após a conclusão do pagamento.
 *   3. A formatação dos campos de entrada (cartão de crédito, data de validade e CPF) é feita em funções dedicadas para melhorar a legibilidade e a experiência do usuário.
 *   4. O componente renderiza diferentes interfaces de pagamento (Pix ou cartão de crédito) com base na opção selecionada pelo usuário.
 *
 * Estado:
 *   - selectedMethod: Método de pagamento selecionado ('Pix' ou 'Card').
 *   - cardNumber: Número do cartão de crédito.
 *   - cardHolderName: Nome do titular do cartão.
 *   - expiryDate: Data de validade do cartão de crédito.
 *   - cvv: Código de verificação do cartão de crédito.
 *   - cpf: CPF do usuário.
 *   - pixCode: Código Pix gerado, que pode ser exibido na interface.
 *
 * Funções:
 *   - handledPayment: Exibe um alerta de sucesso e redireciona o usuário para a página de login.
 *   - validateNumericInput: Remove caracteres não numéricos da string fornecida.
 *   - formataNumeroCartao: Formata o número do cartão de crédito em grupos de 4 dígitos.
 *   - formatExpiryDate: Formata a data de validade do cartão no formato MM/AA.
 *   - formataCPF: Formata o CPF no padrão brasileiro (XXX.XXX.XXX-XX).
 *   - generatePixCode: Gera um código Pix para pagamento.
 *   - renderPixPayment: Renderiza a interface de pagamento via Pix.
 *   - renderCardPayment: Renderiza a interface de pagamento via cartão de crédito.
 *
 * Estrutura JSX:
 *   - Renderiza uma seção para escolher o método de pagamento (cartão de crédito ou Pix).
 *   - Dependendo do método selecionado, renderiza a interface correspondente para inserção de dados e finalização do pagamento.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicione o hook para navegação
import '../StylesPages/Pagamento.css'; // Importa o CSS para estilização

export default function Pagamento() {
    const [selectedMethod, setSelectedMethod] = useState('Pix');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [pixCode, setPixCode] = useState(null);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate(); // Use o hook de navegação

    // Função para validar um CPF brasileiro
    function validaCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        // Calcula o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        // Calcula o segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Validação de número do cartão (Luhn)
    const validateCardNumber = (number) => {
        const cleanedNumber = number.replace(/\s/g, ''); // Remove espaços
        let sum = 0;
        let shouldDouble = false;

        for (let i = cleanedNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cleanedNumber[i]);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    };

    // Validação de nome do titular
    const validateCardHolderName = (name) => {
        return name.trim().split(' ').length >= 2;
    };

    // Validação de data de validade (MM/AA)
    const validateExpiryDate = (date) => {
        if (!/^\d{2}\/\d{2}$/.test(date)) return false;

        const [month, year] = date.split('/').map(Number);
        const currentDate = new Date();
        const expiry = new Date(`20${year}`, month - 1);

        return expiry > currentDate && month >= 1 && month <= 12;
    };

    // Validação de CVV (3 ou 4 dígitos)
    const validateCVV = (cvv) => /^[0-9]{3}$/.test(cvv);

    const validateFields = () => {
        let validationErrors = {};

        if (!cardNumber || cardNumber.length !== 19 || !validateCardNumber(cardNumber.replace(/\s/g, ''))) {
            validationErrors.cardNumber = 'Número do cartão inválido';
        }
        if (!cardHolderName || !validateCardHolderName(cardHolderName)) {
            validationErrors.cardHolderName = 'Nome do titular inválido';
        }
        if (!expiryDate || !validateExpiryDate(expiryDate)) {
            validationErrors.expiryDate = 'Data de validade inválida';
        }
        if (!cvv || !validateCVV(cvv)) {
            validationErrors.cvv = 'CVV inválido';
        }
        if (!cpf || cpf.length < 14 || !validaCPF(cpf)) {
            validationErrors.cpf = 'CPF inválido';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handlePayment = () => {
        if (validateFields()) {
            window.alert('Pagamento Concluído: Seu pagamento foi realizado com sucesso!');
            navigate('/login');
        }
    };

    // Função que exibe um alerta de sucesso ao concluir o pagamento e redireciona o usuário para a página de login.
    const handledPayment = () => {
        window.alert('Pagamento Concluído: Seu pagamento foi realizado com sucesso!'); // Use window.alert para notificações simples
        navigate('/login');
    };

    // Função que remove todos os caracteres não numéricos da string fornecida, mantendo apenas dígitos.
    const validateNumericInput = (text) => text.replace(/[^0-9]/g, '');

    // Função formataNumeroCartao para formatar o número do cartão de crédito
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - text: string contendo o número do cartão de crédito (possivelmente com caracteres não numéricos)
    // Retorno:
    // - formattedText: string contendo o número do cartão formatado em blocos de 4 dígitos, separados por espaços
    // Esta função remove todos os caracteres não numéricos do input, e formata o número do cartão em grupos de 4 dígitos separados por espaços, para melhor legibilidade.
    const formataNumeroCartao = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        let formattedText = '';
        for (let i = 0; i < cleanedText.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedText += ' ';
            }
            formattedText += cleanedText[i];
        }
        return formattedText;
    };

    // Função formatExpiryDate para formatar a data de expiração do cartão de crédito
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - text: string contendo a data de expiração do cartão de crédito (possivelmente com caracteres não numéricos)
    // Retorno:
    // - String formatada no formato MM/AA para a data de expiração do cartão
    // Esta função remove todos os caracteres não numéricos do input e formata a data de expiração no formato MM/AA. Se o input tiver até 2 caracteres, retorna os dígitos. 
    // Caso contrário, insere uma barra após os dois primeiros dígitos para representar o mês e o ano.
    const formatExpiryDate = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        if (cleanedText.length <= 2) {
            return cleanedText;
        } else {
            return `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
        }
    };

    // Função formataCPF para formatar o CPF do usuário
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - text: string contendo o CPF (possivelmente com caracteres não numéricos)
    // Retorno:
    // - String formatada no formato XXX.XXX.XXX-XX
    // Esta função remove todos os caracteres não numéricos do input e formata o CPF no padrão brasileiro (XXX.XXX.XXX-XX). Dependendo da quantidade de dígitos inseridos, 
    // a função adiciona os pontos e traço no lugar correto para melhorar a legibilidade.
    const formataCPF = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        if (cleanedText.length <= 3) {
            return cleanedText;
        } else if (cleanedText.length <= 6) {
            return `${cleanedText.slice(0, 3)}.${cleanedText.slice(3)}`;
        } else if (cleanedText.length <= 9) {
            return `${cleanedText.slice(0, 3)}.${cleanedText.slice(3, 6)}.${cleanedText.slice(6)}`;
        } else {
            return `${cleanedText.slice(0, 3)}.${cleanedText.slice(3, 6)}.${cleanedText.slice(6, 9)}-${cleanedText.slice(9)}`;
        }
    };

    const generatePixCode = () => {
        setPixCode('05101520StarList');
    };

    // Função renderPixPayment para renderizar a interface de pagamento via Pix
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - Nenhum parâmetro direto
    // Retorno:
    // - Renderiza a interface de pagamento Pix, exibindo o código Pix e o QR code se o código já tiver sido gerado, ou um botão para gerar o código Pix
    // Esta função verifica se o código Pix já foi gerado (variável `pixCode`). Se sim, renderiza o código de pagamento e a imagem QR code. 
    // Caso contrário, exibe um botão para gerar o código Pix. Quando o pagamento é concluído, o botão "Concluir" aciona a função `handledPayment`.

    const renderPixPayment = () => (
        <div>
            {pixCode ? (
                <div className="codigoQr">
                    <p className="infoPagamento">Código de pagamento:</p>
                    <p className="codigoPix">{pixCode}</p>
                    <p className="infoQr">Código QR:</p>
                    <div className="imagemQr">
                        <img src="/public/images/qr-code.png" alt="qrcode" />
                    </div>
                    <button className='btnPagar' onClick={handledPayment}>
                        Concluir
                    </button>
                </div>
            ) : (
                <button className="btnPagar" onClick={generatePixCode}>
                    Gerar código Pix
                </button>
            )}
        </div>
    );

    // Função renderCardPayment para renderizar a interface de pagamento via cartão de crédito
    //
    // Alterado em 
    // Parâmetros de entrada:
    // - Nenhum parâmetro direto
    // Retorno:
    // - Renderiza a interface de pagamento por cartão de crédito, permitindo a inserção e formatação dos dados do cartão
    // Esta função renderiza um formulário para o pagamento via cartão de crédito, incluindo campos para o número do cartão, nome do titular, data de validade, CVV e CPF. 
    // O número do cartão é formatado automaticamente com espaços a cada 4 dígitos, a data de validade no formato MM/AA e o CPF no formato XXX.XXX.XXX-XX. 
    // Ao clicar no botão "Pagar e concluir", a função `handledPayment` é acionada para processar o pagamento.
    const renderCardPayment = () => (
        <div className='dadosCartao'>
            <p className='txtInfo'>Número do cartão</p>
            <input
                className='input'
                type="text"
                placeholder='XXXX XXXX XXXX XXXX'
                value={formataNumeroCartao(cardNumber)}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
            />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}

            <p className='txtInfo'>Nome do titular</p>
            <input
                className='input'
                type="text"
                placeholder='Nome Completo'
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
            />
            {errors.cardHolderName && <span className="error">{errors.cardHolderName}</span>}

            <div className='linha'>
                <div className='inputLinha'>
                    <p className='txtInfo'>Data de validade</p>
                    <input
                        className='inputMeio'
                        type="text"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                    />
                    {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}

                </div>
                <div className='inputLinha'>
                    <p className='txtInfo'>CVV</p>
                    <input
                        className='inputMeio'
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(validateNumericInput(e.target.value))}
                        maxLength={3}
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                </div>

            </div>
            <p className='txtInfo'>CPF</p>
            <input
                className='input'
                type="text"
                placeholder="123.456.789-00"
                value={formataCPF(cpf)}
                onChange={(e) => setCpf(e.target.value)}
                maxLength={14}
            />
            {errors.cpf && <span className="error">{errors.cpf}</span>}

            <button className='btnPagar' onClick={handlePayment}>
                Pagar e concluir
            </button>

        </div>
    );

    return (
        <div className="background">
            <div className="backgroundContainer">
                <div className="containerPagamento">
                    <div className="metodoPagamento">
                        <p className="txtInfo">Escolha a opção de pagamento</p>
                        <div className="btnEscolha">
                            <button
                                className={`btnMetodo ${selectedMethod === 'Card' ? 'btnMetodoSelected' : ''}`}
                                onClick={() => setSelectedMethod('Card')}>
                                Cartão de Crédito
                            </button>
                            <button
                                className={`btnMetodo ${selectedMethod === 'Pix' ? 'btnMetodoSelected' : ''}`}
                                onClick={() => setSelectedMethod('Pix')}>
                                Pix
                            </button>
                        </div>
                    </div>
                    {selectedMethod === 'Pix' ? renderPixPayment() : renderCardPayment()}
                </div>
            </div>
        </div>
    );
}
