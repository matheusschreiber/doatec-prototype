import React from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons'

import styles from './style'

import logo_media from '../../assets/logo-medium.png'

export default function MainScreen(){
  return(
    <View style={styles.main_container}>
      <Image source={logo_media}/>
      <TextInput style={styles.input} placeholder="Nome"/>
      <Text style={styles.main_titulo}>COMEÇAR A AJUDAR</Text>
      <View style={styles.arrow_container}>
        <Feather name="arrow-down" size={40} color="white"/>
      </View>
      
    </View>
  )
}