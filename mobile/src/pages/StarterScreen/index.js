import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react';

import styles from './style'

import logo_media from '../../assets/logo-medium.png'

export default function StarterScreen(){
  const navigation = useNavigation();
  const [ nome, setNome ] = useState();

  function navigatePedidos(nome){
    navigation.navigate('Pedidos', { nome })
  }

  return(
    <View style={styles.main_container}>
      <Image source={logo_media}/>
      <TextInput 
        style={styles.input} 
        placeholder="Nome"
        onChangeText={(e)=>setNome(e)}
        value={nome}/>
      <Text style={styles.main_titulo}>COMEÇAR A AJUDAR</Text>
      <TouchableOpacity 
        style={styles.arrow_container}
        onPress={()=>navigatePedidos(nome)}>
        <Feather name="arrow-down" size={40} color="white"/>
      </TouchableOpacity>
      
    </View>
  )
}