import { Text, TextInput, Image, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../styles/StylesBoasVindas';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit'


const images = [
    require('../assets/images/logo_starlistMobile.png'),
    require('../assets/images/CalendarBoasVindas2.png'),
    require('../assets/images/CalendarBoasVindas.png'),
];

export default function BoasVindas({ navigation }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Avança para a próxima imagem no array de imagens
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 10 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [currentImageIndex]);


    const [fontLoaded] = useFonts({
        Kanit_500Medium,
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image source={images[currentImageIndex]} style={styles.image} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}><Text style={styles.txtButton}>FAZER LOGIN</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}><Text style={styles.txtButton}>CADASTRE-SE</Text></TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}