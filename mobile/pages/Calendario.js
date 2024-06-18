import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import MenuScreen from '../components/Menu.js';

// Configuração de locais para o calendário
LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

// Componente de tela do calendário
const CalendarScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState({});

    // Função para lidar com a seleção de um dia
    const handleDayPress = (day) => {
        navigation.navigate('TO DO', { selectedDate: day.dateString, tasks });
    };

    return (
        <View style={styles.calendario}>
            {/* Componente MenuScreen para o menu da aplicação */}
            <MenuScreen />

            {/* Componente de calendário */}
            <Calendar
                // Função que é chamada quando um dia é pressionado
                onDayPress={handleDayPress}
                // Configura as datas marcadas
                markedDates={{
                    ...Object.keys(tasks).reduce((acc, date) => {
                        acc[date] = { marked: true, dotColor: '#faed27' }; // Marca a data e define a cor do ponto
                        return acc;
                    }, {})
                }}
                // Personalização do tema do calendário
                theme={{
                    calendarBackground: '#9d9d9d', // Cor de fundo do calendário
                    dayTextColor: '#494547', // Cor do texto dos dias
                    todayTextColor: '#faed27', // Cor do texto do dia atual
                    selectedDayBackgroundColor: '#faed27', // Cor de fundo do dia selecionado
                    arrowColor: '#faed27', // Cor das setas de navegação do mês
                    monthTextColor: '#faed27', // Cor do texto do mês
                }}
            />
        </View>
    );
};

// Estilos para a tela do calendário
const styles = StyleSheet.create({
    calendario: {
        flex: 1,
        backgroundColor: '#9d9d9d',
    }
});

export default CalendarScreen;