import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/StylesPagamento';
import { Feather } from '@expo/vector-icons';

export default function Pagamento({ navigation }) {
    const [selectedMethod, setSelectedMethod] = useState('Pix'); // Default to Pix
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [pixCode, setPixCode] = useState(null); // State to store Pix code and QR code visibility

    const validateNumericInput = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        return numericValue;
    };

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
        // Simulate generating a Pix code
        setPixCode('05101520StarList');
    };

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

    const renderCardPayment = () => (
        <View style={styles.dadosCartao}>
            <Text style={styles.txtInfo}>Número do cartão</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder='XXXX XXXX XXXX XXXX' value={formataNumeroCartao(cardNumber)} onChangeText={text => setCardNumber(text)} maxLength={19} />
            <Text style={styles.txtInfo}>Nome do titular</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome Completo'
                value={cardHolderName}
                onChangeText={text => setCardHolderName(text)}
            />
            <View style={styles.linha}>
                <View style={styles.inputLinha}>
                    <Text style={styles.txtInfo}>Data de validade</Text>
                    <TextInput style={styles.inputMeio} placeholder="MM/AA" value={expiryDate} onChangeText={text => setExpiryDate(formatExpiryDate(text))} maxLength={5} />
                </View>
                <View style={styles.inputLinha}>
                    <Text style={styles.txtInfo}>CVV</Text>
                    <TextInput style={styles.inputMeio} keyboardType="numeric" placeholder="123" value={cvv} onChangeText={text => setCvv(validateNumericInput(text))} maxLength={3} />
                </View>
            </View>
            <Text style={styles.txtInfo}>CPF</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="123.456.789-00" value={formataCPF(cpf)} onChangeText={text => setCpf(text)} maxLength={14} />
            <TouchableOpacity style={styles.btnPagar}>
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
