import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native';
import React, { useState } from 'react';
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


// Função principal do componente de pagamento
export default function Pagamento({ navigation }) {
    // Estados para armazenar os dados do formulário
    const [selectedMethod, setSelectedMethod] = useState('Pix'); // Método de pagamento padrão é Pix
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [pixCode, setPixCode] = useState(null); // Estado para armazenar o código Pix

    // Função para lidar com a conclusão do pagamento
    const handledPayment = () => {
        Alert.alert("Pagamento Concluído", "Seu pagamento foi realizado com sucesso!");
        navigation.navigate('home'); // Navega para a página inicial após o pagamento
    }

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
                        <Image source={require('../assets/images/qr-code.png')} style={styles.code} />
                    </View>
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
            <TextInput style={styles.input} keyboardType="numeric" placeholder='XXXX XXXX XXXX XXXX' placeholderTextColor="#FFF88E" value={formataNumeroCartao(cardNumber)} onChangeText={text => setCardNumber(text)} maxLength={19} />
            <Text style={styles.txtInfo}>Nome do titular</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome Completo'
                placeholderTextColor="#FFF88E"
                value={cardHolderName}
                onChangeText={text => setCardHolderName(text)}
            />
            <View style={styles.linha}>
                <View style={styles.inputLinha}>
                    <Text style={styles.txtInfo}>Data de validade</Text>
                    <TextInput style={styles.inputMeio} placeholder="MM/AA" placeholderTextColor="#FFF88E" value={expiryDate} onChangeText={text => setExpiryDate(formatExpiryDate(text))} maxLength={5} />
                </View>
                <View style={styles.inputLinha}>
                    <Text style={styles.txtInfo}>CVV</Text>
                    <TextInput style={styles.inputMeio} keyboardType="numeric" placeholder="123" placeholderTextColor="#FFF88E" value={cvv} onChangeText={text => setCvv(validateNumericInput(text))} maxLength={3} />
                </View>
            </View>
            <Text style={styles.txtInfo}>CPF</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="123.456.789-00" placeholderTextColor="#FFF88E" value={formataCPF(cpf)} onChangeText={text => setCpf(text)} maxLength={14} />
            <TouchableOpacity style={styles.btnPagar} onPress={handledPayment}>
                <Text style={styles.txtPagar}>Pagar e concluir</Text>
            </TouchableOpacity>
        </View>
    );

    // Renderiza a interface principal do componente de pagamento
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
