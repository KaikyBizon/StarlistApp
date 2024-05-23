import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import MenuScreen from '../components/Menu.js';

LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const CalendarScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState({});

    const handleDayPress = (day) => {
        navigation.navigate('TO DO', { selectedDate: day.dateString, tasks });
    };

    return (
        <View style={styles.calendario}>
            <MenuScreen />
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...Object.keys(tasks).reduce((acc, date) => {
                        acc[date] = { marked: true, dotColor: '#faed27' };
                        return acc;
                    }, {})
                }}
                theme={{
                    calendarBackground: '#9d9d9d', // Define a cor de fundo do calendário
                    dayTextColor: '#494547', // Define a cor do texto dos dias
                    todayTextColor: '#faed27', // Define a cor do texto do dia atual
                    selectedDayBackgroundColor: '#faed27', // Define a cor de fundo do dia selecionado
                    arrowColor: '#faed27', // Define a cor das setas de navegação do mês
                    monthTextColor: '#faed27', // Define a cor do texto do mês
                }}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    calendario: {
        flex: 1,
        backgroundColor: '#9d9d9d',
    }
});

export default CalendarScreen;