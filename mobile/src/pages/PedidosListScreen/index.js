import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import styles from './style';
import logo from '../../assets/logo-medium.png';

export default function PedidosListScreen(){
  const route = useRoute();
  const navigation = useNavigation();
  const nome = route.params.nome;
  const [pedidos, SetPedidos] = useState([]);
  
  function navigatePedido(nome, pedido){
    navigation.navigate('Pedido', { nome, pedido });
  }

  function goBack(){
    navigation.goBack();
  }

  async function carregaPedidos(){
    const response = await api.get('pedidosc')
    SetPedidos(response.data)
  }

  useEffect(()=>{
    carregaPedidos()
  }, [pedidos])
  
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Image source={logo} />
          <TouchableOpacity onPress={goBack}>
            <Feather name="arrow-left" size={30} color={"#FDC166"}/>
          </TouchableOpacity>
        </View>
        <Text>Ajude uma comunidade, atendendo a algum dos pedidos abaixo, 
          ou procure por um id de pedido no botão de procura</Text>
        <View style={styles.searchBar}>
          <Text style={styles.title}>Pedidos Recentes</Text>
          <Feather name="search" size={30} color={"#FDC166"}/>
        </View>
      </View>
      <FlatList 
        data={pedidos}
        style={styles.grid}
        keyExtractor={p => String(p.id)}
        renderItem={({item: pedido})=>{
          return(
            <TouchableOpacity style={styles.pedidoContainer} onPress={()=>navigatePedido(nome, pedido)}>
              <View style={styles.leftColumn}>
                <Text style={styles.pedidoTitle}>ITEM</Text>
                <Text style={styles.pedidoInfo}>{pedido.item}</Text>
                <Text style={styles.pedidoTitle}>QUANTIDADE</Text>
                <Text style={styles.pedidoInfo}>{pedido.quantidade_total}</Text>
              </View>
              <View style={styles.rightColumn}> 
                <Text style={styles.pedidoTitle}>META</Text>
                <View style={styles.pedidoMeta}>
                  <View style={
                    [
                      styles.pedidoMetaInner,
                      {width:`${(pedido.quantidade_doada/pedido.quantidade_total)*100}%`}
                    ]}></View>
                 </View>
                <Text style={styles.pedidoTitle}>COMUNIDADE</Text>
                <Text style={styles.pedidoInfo}>{pedido.nome}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}


