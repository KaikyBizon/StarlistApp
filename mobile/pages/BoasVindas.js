/**
 * Nome do Componente: BoasVindas
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que exibe uma tela de boas-vindas com um carrossel de imagens. 
 *   Utiliza hooks do React para gerenciar o estado do índice da imagem atual e o carregamento de fontes.
 *   Permite ao usuário navegar para as telas de login ou cadastro.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar o índice da imagem atual no carrossel.
 *   2. Utiliza o hook 'useEffect' para definir um intervalo que troca a imagem exibida no carrossel a cada 5 segundos.
 *   3. Carrega a fonte 'Kanit_500Medium' usando o hook 'useFonts' do pacote @expo-google-fonts/kanit.
 *   4. A troca de tela para login ou cadastro é realizada através das funções de navegação fornecidas pelo React Navigation.
 *
 * Estado:
 *   - currentImageIndex: Índice da imagem atualmente exibida no carrossel.
 *   - fontLoaded: Indica se a fonte 'Kanit_500Medium' foi carregada com sucesso.
 *
 * Funções:
 *   - Nenhuma função personalizada diretamente no componente, mas navegação é gerida através das funções do React Navigation.
 *
 * Estrutura JSX:
 *   - Renderiza um carrossel de imagens que muda a cada 5 segundos.
 *   - Exibe botões para navegar para a tela de login ou cadastro.
 *
 * @returns {JSX.Element}
 */


import { Text, TextInput, Image, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../styles/StylesBoasVindas';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';

const images = [
    require('../assets/images/logo_starlistMobile.png'),
    require('../assets/images/CalendarBoasVindas2.png'),
    require('../assets/images/CalendarBoasVindas.png'),
];

export default function BoasVindas({ navigation }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    {/*
        Nome da função: interval;
        Autor: Kaiky;
        Data de criação: 06/24;
        Parametros de entrada: Nenhum específico, mas depende do estado `currentImageIndex` e da lista `images` do componente React.
        Retorno: Nenhum explicitamente retornado; o efeito define um intervalo para mudar a imagem exibida.
        Finalidade: Passar as imagens da tela de boas-vindas em um carrossel, atualizando a imagem exibida a cada 5 segundos.
        Descrição/observações: 
            - Esta função utiliza o hook `useEffect` do React para definir e limpar um intervalo.
            - O intervalo `setInterval` é usado para alterar a imagem atual para a próxima no array `images` a cada 5 segundos.
            - Quando `currentImageIndex` atinge o último índice do array `images`, ele retorna para o índice 0, criando um efeito de loop contínuo nas imagens.
            - A limpeza do intervalo é gerenciada retornando uma função de limpeza que chama `clearInterval(interval)`, garantindo que o intervalo seja limpo quando o componente for desmontado, prevenindo vazamentos de memória e comportamentos indesejados.
            - A dependência `[currentImageIndex]` no hook `useEffect` indica que o efeito deve ser reexecutado sempre que `currentImageIndex` for atualizado, permitindo que o carrossel de imagens funcione corretamente conforme o usuário interage com o componente.
    */}
    useEffect(() => {
        const interval = setInterval(() => {
            // Avança para a próxima imagem no array de imagens
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Troca a imagem a cada 5 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [currentImageIndex]);


    {/*
        Nome da função: fontLoaded;
        Autor: Kaiky;
        Data de criação: 06/24;
        Parametros de entrada: fontLoaded;
        Retorno: Se a fonte foi ou não carregada na tela.
        Finalidade: Verificar se a fonte foi carregada ou não;
        Descrição/observações: 
            - Esta função valida apenas a fonte especifica, caso uma nova seja inserida ela deve seradicionada nesta função também.
    */}
    const [fontLoaded] = useFonts({
        Kanit_500Medium,
    });

    if (!fontLoaded) {
        return null; // Aguarda a carga da fonte antes de renderizar o conteúdo
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image source={images[currentImageIndex]} style={styles.image} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.txtButton}>FAZER LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={styles.txtButton}>CADASTRE-SE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
