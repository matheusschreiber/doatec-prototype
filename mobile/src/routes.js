import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './pages/MainScreen/MainScreen'

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={MainScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}