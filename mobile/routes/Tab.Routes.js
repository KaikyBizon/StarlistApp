import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

// Importar suas páginas e componentes
import ToDo from '../pages/ToDo'
import NovaTarefa from '../pages/NovaTarefa';
import Calendario from '../pages/Calendario';
import KanBan from '../pages/KanBan';
import Perfil from '../pages/Perfil';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: '#FFEF00', // background da tabbar
                height: 60,
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#726c6f',
        }}>
            <Tab.Screen name="CALENDÁRIO" component={Calendario} options={{
                tabBarIcon: () => <Feather size={24} name="calendar" />
            }} />
            <Tab.Screen name="TO DO" component={ToDo} options={{
                tabBarIcon: () => <Feather size={24} name="list" />
            }} />
            <Tab.Screen name="NOVA TAREFA" component={NovaTarefa} options={{
                tabBarIcon: () => <Feather size={24} name="plus-square" />
            }} />
            <Tab.Screen name="KANBAN" component={KanBan} options={{
                tabBarIcon: () => <Feather size={24} name="trello" />
            }} />
            <Tab.Screen name="PERFIL" component={Perfil} options={{
                tabBarIcon: () => <Feather size={24} name="user" />
            }} />
        </Tab.Navigator>
    );
}