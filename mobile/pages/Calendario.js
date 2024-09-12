/**
 * Nome do Componente: CalendarScreen
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que exibe um calendário interativo. Utiliza o componente 'react-native-calendars' para apresentar um calendário onde os usuários podem interagir e visualizar tarefas agendadas. 
 *   Permite navegação ao selecionar datas, mostrando os eventos ou tarefas associadas a essas datas.
 *
 * Observações Pertinentes:
 *   1. Configura as localizações do calendário para exibir os nomes dos meses e dias da semana em português.
 *   2. Utiliza o hook 'useState' para gerenciar as tarefas associadas às datas.
 *   3. O evento 'onDayPress' é acionado ao pressionar um dia no calendário e navega para uma tela de detalhes.
 *   4. Exibe tarefas marcadas no calendário, com personalizações de tema para o estilo visual do calendário.
 *
 * Estado:
 *   - tasks: Armazena as tarefas, com a chave sendo a data e o valor sendo os detalhes da tarefa.
 *
 * Funções:
 *   - handleDayPress: Função que lida com a seleção de um dia, navegando para uma tela de detalhes com as tarefas do dia selecionado.
 *
 * Estrutura JSX:
 *   - Exibe um calendário interativo com dias marcados e estilizados conforme as tarefas agendadas.
 *   - Integra um componente de menu para navegação adicional na aplicação
 *
 * @returns {JSX.Element}
 */

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
