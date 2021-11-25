import { View, Text, Image, TouchableOpacity, Picker } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PulseIndicator } from 'react-native-indicators';
import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';

import api from '../../services/api'
import styles from './style';
import logo from '../../assets/logo-medium.png'

export default function PedidosListScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const nome = route.params.nome;
  const pedido = route.params.pedido;
  const [ doacao, setDoacao ] = useState(1);
  const [ doando, setDoando ] = useState(false)
  const [ mensagem, setMensagem ] = useState("");
  const [ teveErro, setTeveErro ] = useState(false);

  function goBack(){
    navigation.goBack();
  }

  let headerAxios = {
    headers: {
      "Content-Type": "application/json",
      authorization: nome
    }
  }

  async function realizaDoacao(){
    setDoando(true)
    const response = await api.put(`pedido/${pedido.id}`, {
      quantidade: doacao
    }, headerAxios)
    .then((response)=>{
      setTeveErro(false)
      setMensagem(response.data.message)
      pedido.quantidade_doada += doacao;
      setDoacao(1)
    })
    .catch(()=>{
      setTeveErro(true)
      setMensagem("Pedido extrapolado!")
    })
    setDoando(false)
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Image source={logo} />
          <TouchableOpacity onPress={goBack}>
            <Feather name="arrow-left" size={30} color={"#FDC166"}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{nome}, ajude neste pedido</Text>
      </View>

      <View style={styles.pedidoContainer}>
        <View style={styles.leftColumn}>
          <View>
            <Text style={styles.pedidoTitle}>COMUNIDADE</Text>
            <Text style={styles.pedidoInfo}>{pedido.nome}</Text>
          </View>
          <View>
            <Text style={styles.pedidoTitle}>ITEM</Text>
            <Text style={styles.pedidoInfo}>{pedido.item}</Text>
          </View>
          <View>
            <Text style={styles.pedidoTitle}>ADQUIRIDOS</Text>
            <Text style={styles.pedidoInfo}>{pedido.quantidade_doada}/{pedido.quantidade_total}</Text>
          </View>
        </View>

        <View style={styles.rightColumn}> 
          <Image source={{uri: pedido.foto}} style={styles.comunidadePerfil}/>
          <View>
            <Text style={styles.pedidoTitle}>ID DO PEDIDO</Text>
            <Text style={styles.pedidoInfo}>{pedido.id}</Text>
          </View>
        </View>
      </View>

      <View style={styles.pedidoAdd}>
        <Text style={{fontWeight: 'bold', color: '#4D4B4B', fontSize: 17}}>SUA DOAÇÃO</Text>
        <TouchableOpacity onPress={()=>{
          if (doacao!==0) setDoacao(doacao-1)
        }}>
          <Feather name="minus" color={"#FDC166"} size={25}/>
        </TouchableOpacity>

        <View style={styles.itemCounter}>
          {/* tentar usar picker futuramente */}
          <Text style={styles.textItemCounter}>{doacao}</Text>
        </View>
        
        <TouchableOpacity onPress={()=>{
          if (doacao<pedido.quantidade_total-pedido.quantidade_doada) setDoacao(doacao+1)
        }}>
          <Feather name="plus" color={"#FDC166"} size={25}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoDoar}
        disabled={doando}
        onPress={realizaDoacao}>
        <Text style={styles.textBotaoDoar}>FAZER DOAÇÃO</Text>
      </TouchableOpacity>
      <Text style={[
        styles.serverResponse,
        teveErro?{color:"#FA9696"}:{color:"#9DE097"}
      ]}>{mensagem}</Text>
      <PulseIndicator color="#FDC166" animating={doando}/>
      
    </View>
  );
}


