import React, { useState, useRef } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import styles from '../styles/StylesTelaPlano';

/**
 * Nome do Componente: PlanCarousel
 *
 * Descrição Detalhada:
 *   Componente principal do carrossel de planos, implementado em React Native utilizando o 'react-native-snap-carousel'.
 *   Exibe diferentes planos de assinatura em um formato de carrossel horizontal, com detalhes de cada plano, preço e benefícios.
 *   Ao clicar em "QUERO ESTE PLANO", navega para a tela de pagamento.
 *
 * Observações Pertinentes:
 *   1. Utiliza a biblioteca 'react-native-snap-carousel' para renderizar o carrossel de planos de forma responsiva.
 *   2. A navegação entre os itens do carrossel é controlada pelo estado 'index' e pelo componente 'Pagination'.
 *   3. Cada item do carrossel é representado pelo componente 'CarouselCardItem'.
 *   4. Ao selecionar um plano, a navegação é direcionada para a tela de pagamento através do 'navigation.navigate'.
 *
 * Estado:
 *   - index: Controla o índice do item ativo no carrossel.
 *
 * @param {object} navigation - Objeto de navegação para redirecionamento entre telas.
 * @returns {JSX.Element}
 */

// Dados dos planos disponíveis
const data = [
    {
        titleHeader: "Gratuito",
        title: "R$0 Mês",
        textPlanos: "5 Projetos ativos; 5 colaboradores por projeto; 5MB de carregamento de arquivo; 1 semana de histórico de atividade; ",
    },
    {
        titleHeader: "Mensal",
        title: "R$15 Mês",
        textPlanos: "TUDO DO GRATUITO E MAIS; Quadro e campos perssonalizados; Armazenamento ilimitado; 1.000 exeuções de comandos; Convidados de quadro único; ",
    },
    {
        titleHeader: "Anual",
        title: "R$150 Anual",
        textPlanos: "TUDO DO MENSAL E MAIS; Visualizações: Cronograma e painel; Visualização da Área de Trabalho; Execuções ilimitadas de comandos; Funcionalidade de administração; Suporte prioritário;",
    },
    {
        titleHeader: "Empresarial",
        title: "R$300 Anual",
        textPlanos: "Áreas de Trabalho ilimitadas; Permissões para toda empresa; Quadros visíveis da empresa; Gerenciamento de quadro público; Convidados de mais de um quadro; Administração de power-ups;",
    },
];

// Componente para cada item do carrossel
export function CarouselCardItem({ item, index, navigation }) {
    // Divide a string de benefícios em um array de itens
    const planItems = item.textPlanos.split(';').filter(item => item.trim() !== '');

    // Carrega a fonte personalizada
    const [fontLoaded] = useFonts({
        Kanit_500Medium,
    });

    // Verifica se a fonte foi carregada
    if (!fontLoaded) {
        return null;
    }

    return (
        <View>
            <View style={styles.carrosel}>
                <View style={styles.carroselHeader}>
                    <Text style={styles.titleHeaderPlanos}>{item.titleHeader}</Text>
                </View>
                <View style={styles.carroselTitle}>
                    <Text style={styles.titleCarrosel}>{item.title}</Text>
                </View>
                <View style={styles.carroselText}>
                    <FlatList
                        data={planItems}
                        renderItem={({ item }) => <Text style={styles.textPlanos}>{item.trim()}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.botaoCarrosel}>
                    <TouchableOpacity style={styles.CarroselButton} onPress={() => navigation.navigate('Pagamento')}>
                        <Text style={styles.CarroselTextoButton}>QUERO ESTE PLANO</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const { width, height } = Dimensions.get('window');
const imageWidth = width * 1.0; // Define a largura da imagem como 100% da largura da tela
const imageHeight = imageWidth * 0.5; // Define a altura da imagem como metade da largura

// Componente principal do carrossel de planos
export default function PlanCarousel({ navigation }) {
    const isCarousel = useRef(null);
    const [index, setIndex] = useState(0);

    return (
        <View>
            <View style={styles.PlanosLogo}>
                <View style={styles.containerVoltar}>
                    <Feather size={40} name="chevron-left" color="#faed27" onPress={() => navigation.goBack()} />
                    <Image style={styles.LogoPlanos} source={require('../assets/images/logo_starlist-texto.png')} resizeMode='contain' />
                </View>
                <Text style={styles.EscolhaPlano}>Escolha seu plano abaixo:</Text>
            </View>
            <View style={styles.PlanosBackground}>
                <Carousel
                    layout="default"
                    layoutCardOffset={9}
                    ref={isCarousel}
                    data={data}
                    renderItem={({ item, index }) => <CarouselCardItem item={item} index={index} navigation={navigation} />}
                    sliderWidth={500}
                    itemWidth={390}
                    inactiveSlideShift={0}
                    onSnapToItem={(index) => setIndex(index)}
                    useScrollView={true}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 25,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        backgroundColor: '#FFF100',
                        bottom: 70,
                        borderWidth: 1,
                        borderColor: 'rgba(249, 249, 249, 0.52)',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                />
            </View>
        </View>
    );
}
