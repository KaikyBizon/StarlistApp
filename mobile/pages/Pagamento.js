import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../styles/StylesPagamento';
import { Feather } from '@expo/vector-icons';

/**
 * Nome do Componente: Pagamento
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que permite ao usuário realizar pagamentos utilizando Pix ou cartão de crédito.
 *   Utiliza hooks do React para gerenciar o estado dos campos do formulário de pagamento, como número do cartão,
 *   nome do titular, data de validade, CVV, CPF e código Pix gerado.
 *   Permite ao usuário escolher entre pagar com Pix, onde é possível gerar um código de pagamento e exibir um código QR,
 *   ou com cartão de crédito, onde são solicitadas informações como número do cartão, nome do titular, data de validade, CVV e CPF.
 *
 * Observações Pertinentes:
 *   1. Utiliza os hooks 'useState' para gerenciar o estado dos campos do formulário.
 *   2. Utiliza o componente 'Alert' do React Native para exibir mensagens de conclusão de pagamento.
 *   3. Implementa funções para formatação de entrada numérica, formatação de número de cartão, data de validade e CPF.
 *   4. Renderiza diferentes interfaces dependendo do método de pagamento selecionado (Pix ou cartão de crédito).
 *
 * Estado:
 *   - selectedMethod: Método de pagamento selecionado (Pix ou cartão de crédito).
 *   - cardNumber: Número do cartão de crédito informado pelo usuário.
 *   - cardHolderName: Nome do titular do cartão de crédito.
 *   - expiryDate: Data de validade do cartão de crédito.
 *   - cvv: Código de segurança do cartão de crédito.
 *   - cpf: CPF do usuário para pagamentos com cartão de crédito.
 *   - pixCode: Código Pix gerado dinamicamente para pagamentos via Pix.
 *
 * Funções:
 *   - handledPayment: Exibe um alerta de pagamento concluído e navega para a página inicial após o pagamento.
 *   - validateNumericInput: Remove caracteres não numéricos de uma entrada de texto.
 *   - formataNumeroCartao: Formata o número do cartão de crédito para exibição.
 *   - formatExpiryDate: Formata a data de validade do cartão de crédito para o formato 'MM/AA'.
 *   - formataCPF: Formata o CPF para exibição no formato 'XXX.XXX.XXX-XX'.
 *   - generatePixCode: Simula a geração de um código Pix para exibição ao usuário.
 *   - renderPixPayment: Renderiza a interface de pagamento via Pix, exibindo o código de pagamento e QR Code gerados.
 *   - renderCardPayment: Renderiza a interface de pagamento via cartão de crédito, solicitando informações como número do cartão, nome do titular, etc.
 *
 * Componentes Importados:
 *   - StatusBar: Componente do Expo para controlar a barra de status do aplicativo.
 *   - Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert: Componentes essenciais do React Native para interface.
 *   - Feather: Ícones vetorizados utilizados para o botão de voltar.
 *   - styles: Estilos definidos em '../styles/StylesPagamento.js' para estilização dos componentes.
 *
 * Estilos:
 *   - Utiliza estilos definidos em '../styles/StylesPagamento.js' para estilização dos componentes.
 *
 * @param {object} navigation Objeto de navegação utilizado para navegar entre telas.
 * @returns {JSX.Element} Retorna o JSX que representa a interface de pagamento do aplicativo.
 */


/**
 * Função para validar o formulário de pagamento
 */
const validateForm = (selectedMethod, cardNumber, cardHolderName, expiryDate, cvv, cpf, pixCode) => {
    let valid = true;
    const errors = {};

    // Validação para o método de pagamento por cartão
    if (selectedMethod === 'Card') {
        if (!cardNumber || !validateCardNumber(cardNumber)) {
            errors.cardNumber = "Número do cartão inválido";
            valid = false;
        }
        if (!cardHolderName) {
            errors.cardHolderName = "Nome do titular é obrigatório";
            valid = false;
        }
        if (!expiryDate || !validateExpiryDate(expiryDate)) {
            errors.expiryDate = "Data de validade inválida ou expirada";
            valid = false;
        }
        if (!cvv || cvv.length !== 3) {
            errors.cvv = "CVV inválido";
            valid = false;
        }
        if (!cpf || !validateCPF(cpf)) {
            errors.cpf = "CPF inválido";
            valid = false;
        }
    }

    // Validação para o método Pix
    if (selectedMethod === 'Pix' && !pixCode) {
        errors.pixCode = "Código Pix não gerado";
        valid = false;
    }

    return { valid, errors };


    // Validação para o método Pix
    if (selectedMethod === 'Pix' && !pixCode) {
        errors.pixCode = "Código Pix não gerado";
        valid = false;
    }

    return { valid, errors };
};

/**
 * Função para validar número do cartão
 */
const validateCardNumber = (number) => {
    const cleanedNumber = number.replace(/[^0-9]/g, '');  // Remove qualquer caractere não numérico
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanedNumber.length - 1; i >= 0; i--) {  // Percorre os dígitos do número do cartão
        let digit = parseInt(cleanedNumber.charAt(i), 10);
        if (shouldDouble) {  // Aplica o algoritmo de Luhn
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0 && cleanedNumber.length === 16; // Verifica se a soma é divisível por 10 e se o número tem 16 dígitos
};

/**
 * Função para validar CPF
 */
const validateCPF = (cpf) => {
    const cleanedCpf = cpf.replace(/[^0-9]/g, '');  // Remove qualquer caractere não numérico
    if (cleanedCpf.length !== 11) return false;  // Verifica se o CPF tem 11 dígitos

    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cleanedCpf.charAt(i - 1)) * (11 - i);  // Cálculo do primeiro dígito verificador
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCpf.charAt(9))) return false;  // Valida o primeiro dígito verificador

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cleanedCpf.charAt(i - 1)) * (12 - i);  // Cálculo do segundo dígito verificador
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCpf.charAt(10))) return false;  // Valida o segundo dígito verificador

    return true;  // CPF válido
};

const validateExpiryDate = (expiryDate) => {
    const currentDate = new Date();
    const [month, year] = expiryDate.split('/');  // Separa o mês e o ano da data de validade
    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(year, 10) + 2000;  // Converte o ano para 4 dígitos (ex: 24 -> 2024)

    // Verifica se a data de validade está no formato MM/AA e se não está expirada
    return (
        expiryMonth >= 1 && expiryMonth <= 12 &&
        expiryYear >= currentDate.getFullYear() &&
        (expiryYear > currentDate.getFullYear() || expiryMonth >= currentDate.getMonth() + 1)
    );
};

// Função principal do componente de pagamento
export default function Pagamento({ navigation }) {
    // Estados para armazenar os dados do formulário
    const [selectedMethod, setSelectedMethod] = useState('Pix');
    // Método de pagamento padrão é Pix
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [pixCode, setPixCode] = useState(null);
    const [errors, setErrors] = useState({});
    const [showVerificationButton, setShowVerificationButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowVerificationButton(true);
        }, 10000);

        // Limpa o timer quando o componente for desmontado
        return () => clearTimeout(timer);
    }, []);
    // Função para lidar com a conclusão do pagamento
    const handledPayment = () => {
        const { valid, errors } = validateForm(selectedMethod, cardNumber, cardHolderName, expiryDate, cvv, cpf, pixCode);
        if (!valid) {
            setErrors(errors);
            return; // Não continua se houver erros
        }
        Alert.alert("Pagamento Concluído", "Seu pagamento foi realizado com sucesso!");
        navigation.navigate('home');
    };

    // Função para validar entrada numérica
    const validateNumericInput = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        return numericValue;
    };

    // Função para formatar número do cartão de crédito
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

    // Função para formatar a data de validade do cartão
    const formatExpiryDate = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        if (cleanedText.length <= 2) {
            return cleanedText;
        } else {
            return `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
        }
    };

    // Função para formatar o CPF
    const formataCPF = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos

        if (cleanedText.length <= 3) {
            return cleanedText; // Se o comprimento for menor ou igual a 3, não há formatação necessária
        } else if (cleanedText.length <= 6) {
            return `${cleanedText.slice(0, 3)}.${cleanedText.slice(3)}`; // Formato xxx.xxx
        } else if (cleanedText.length <= 9) {
            return `${cleanedText.slice(0, 3)}.${cleanedText.slice(3, 6)}.${cleanedText.slice(6)}`; // Formato xxx.xxx.xxx
        } else {
            return `${cleanedText.slice(0, 3)}.${cleanedText.slice(3, 6)}.${cleanedText.slice(6, 9)}-${cleanedText.slice(9, 11)}`; // Formato xxx.xxx.xxx-xx
        }
    };

    // Função para simular a geração de um código Pix
    const generatePixCode = () => {
        setPixCode('05101520StarList');
    };

    // Renderiza a interface de pagamento via Pix
    const renderPixPayment = () => (
        <View>
            {pixCode ? (
                <View style={styles.codigoQr}>
                    <Text style={styles.infoPagamento}>Código de pagamento:</Text>
                    <Text style={styles.codigoPix}>{pixCode}</Text>
                    <Text style={styles.infoQr}>Código QR:</Text>
                    <View style={styles.imagemQr}>
                        <Image 
                            source={require('../assets/images/qr-code.png')} 
                            style={styles.code} 
                        />
                    </View>
                    {/* Botão de verificação de pagamento */}
                    {showVerificationButton && (
                        <TouchableOpacity
                            style={[styles.btnVerificacao, { }]} // Ajuste a cor para combinar com o estilo da tela
                            onPress={() => {
                                Alert.alert(
                                    "Verificação de Pagamento",
                                    "Verificamos que seu pagamento foi concluído.",
                                    [
                                        {
                                            text: "Confirmar",
                                            onPress: () => navigation.navigate('home'), // Redireciona para a tela dos planos
                                        },
                                    ]
                                );
                            }}
                        >
                            <Text style={styles.txtVerificacao}>Verificação de pagamento</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <TouchableOpacity style={styles.btnPagar} onPress={generatePixCode}>
                    <Text style={styles.txtPagar}>Gerar código Pix</Text>
                </TouchableOpacity>
            )}
        </View>
    );


    // Renderiza a interface de pagamento via cartão de crédito
    const renderCardPayment = () => (
        <View style={styles.dadosCartao}>
            <Text style={styles.txtInfo}>Número do cartão</Text>
            <TextInput
                style={[styles.input, errors.cardNumber ? styles.inputError : null]}
                keyboardType="numeric"
                placeholder='XXXX XXXX XXXX XXXX'
                placeholderTextColor="#D3D3D3"
                value={formataNumeroCartao(cardNumber)}
                onChangeText={text => setCardNumber(text)}
                maxLength={19}
            />
            {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}

            <Text style={styles.txtInfo}>Nome do titular</Text>
            <TextInput
                style={[styles.input, errors.cardHolderName ? styles.inputError : null]}
                placeholder='Nome Completo'
                placeholderTextColor="#D3D3D3"
                value={cardHolderName}
                onChangeText={text => setCardHolderName(text)}
            />
            {errors.cardHolderName && <Text style={styles.errorText}>{errors.cardHolderName}</Text>}

            <View style={styles.linha}>
                <View style={styles.inputLinha}>
                    <Text style={styles.txtInfo}>Data de validade</Text>
                    <TextInput
                        style={[styles.inputMeio, errors.expiryDate ? styles.inputError : null]}
                        placeholder="MM/AA"
                        placeholderTextColor="#D3D3D3"
                        value={expiryDate}
                        onChangeText={text => setExpiryDate(formatExpiryDate(text))}
                        maxLength={5}
                    />
                    {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
                </View>
                <View style={styles.inputLinha}>
                    <Text style={styles.txtInfo}>CVV</Text>
                    <TextInput
                        style={[styles.inputMeio, errors.cvv ? styles.inputError : null]}
                        keyboardType="numeric"
                        placeholder="123"
                        placeholderTextColor="#D3D3D3"
                        value={cvv}
                        onChangeText={text => setCvv(validateNumericInput(text))}
                        maxLength={3}
                    />
                    {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
                </View>
            </View>

            <Text style={styles.txtInfo}>CPF</Text>
            <TextInput
                style={[styles.input, errors.cpf ? styles.inputError : null]}
                keyboardType="numeric"
                placeholder="123.456.789-00"
                placeholderTextColor="#D3D3D3"
                value={formataCPF(cpf)}
                onChangeText={text => setCpf(text)}
                maxLength={14}
            />
            {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

            <TouchableOpacity style={styles.btnPagar} onPress={handledPayment}>
                <Text style={styles.txtPagar}>Pagar e concluir</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerVoltar}>
                <Feather style={styles.btnVoltar} size={40} name="chevron-left" color="#fff" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.backgroundContainer}>
                <Image style={styles.logo} resizeMode='contain' source={require('../assets/images/logo_starlist-texto.png')} />
                <View style={styles.container}>
                    <View style={styles.metodoPagamento}>
                        <Text style={styles.txtInfo}>Escolha a opção de pagamento</Text>
                        <View style={styles.btnEscolha}>
                            <TouchableOpacity style={[styles.btnMetodo, selectedMethod === 'Card' && styles.btnMetodoSelected]} onPress={() => setSelectedMethod('Card')}>
                                <Text style={styles.txtBotao}>Cartão de Crédito</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnMetodo, selectedMethod === 'Pix' && styles.btnMetodoSelected]} onPress={() => setSelectedMethod('Pix')}>
                                <Text style={styles.txtBotao}>Pix</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {selectedMethod === 'Pix' ? renderPixPayment() : renderCardPayment()}
                </View>
                <StatusBar style="auto" />
            </View>
        </KeyboardAvoidingView>
    );
}
