import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar suas páginas e componentes
import Cadastro from '../pages/Cadastro';
import LoginForm from '../pages/Login';
import BoasVindas from '../pages/BoasVindas';
import TabRoutes from './Tab.Routes';
import Pagamento from '../pages/Pagamento';
import PlanCarousel from '../pages/PlanCarousel'
import CarouselCardItem from '../pages/PlanCarousel';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Bemvindo" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bemvindo" component={BoasVindas} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="home" component={TabRoutes} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Pagamento" component={Pagamento} />
      <Stack.Screen name="Planos" component={PlanCarousel} />
      <Stack.Screen name="." component={CarouselCardItem} />
    </Stack.Navigator>
  );
}