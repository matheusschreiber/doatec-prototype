import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StarterScreen from './pages/StarterScreen';
import PedidosListScreen from './pages/PedidosListScreen';
import PedidoScreen from './pages/PedidoScreen';

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Start" component={StarterScreen} />
        <Stack.Screen name="Pedidos" component={PedidosListScreen} />
        <Stack.Screen name="Pedido" component={PedidoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}