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

    const navigate = useNavigate(); // Use o hook de navegação

    const handledPayment = () => {
        window.alert('Pagamento Concluído: Seu pagamento foi realizado com sucesso!'); // Use window.alert para notificações simples
        navigate('/login');
    };

    const validateNumericInput = (text) => text.replace(/[^0-9]/g, '');

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

    const formatExpiryDate = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        if (cleanedText.length <= 2) {
            return cleanedText;
        } else {
            return `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
        }
    };

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
                </div>
            ) : (
                <button className="btnPagar" onClick={generatePixCode}>
                    Gerar código Pix
                </button>
            )}
        </div>
    );

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
            <p className='txtInfo'>Nome do titular</p>
            <input
                className='input'
                type="text"
                placeholder='Nome Completo'
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
            />
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
            <button className='btnPagar' onClick={handledPayment}>
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
