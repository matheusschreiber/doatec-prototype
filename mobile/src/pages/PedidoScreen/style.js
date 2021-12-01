import React from 'react';
import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    alignItems: 'center',
    height: "100%",
    backgroundColor: '#FFF0DE',
    paddingTop: 50,
  },
  header:{
    width: "80%",
    height: 100,
    justifyContent: 'space-between',
    color: '#4D4B4B',
    marginBottom: 20
  },
  headerInner:{
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: 'center'
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4D4B4B'
  },
  pedidoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    width: 300,
    height: 250,
    flexDirection: 'row',
    marginBottom: 10
  },
  pedidoTitle:{
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4D4B4B',
    fontSize: 17
  },
  pedidoInfo: {
    color: '#4D4B4B',
    fontSize: 17
  },
  leftColumn: {
    width: "50%",
    height: "100%",
    justifyContent: 'space-between',
  },
  rightColumn:{
    width:"50%",
    height: "100%",
    justifyContent: 'space-between',
  },
  pedidoAdd:{
    height: 60,
    width: "80%",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  itemCounter:{
    backgroundColor: "#FDC166",
    borderRadius: 8,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textItemCounter:{
    color: 'white',
  },
  comunidadePerfil:{
    height: 80,
    borderWidth: 3,
    borderColor: "#FDC166",
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  botaoDoar:{
    marginTop: 20,
    height: 50,
    width: "80%",
    backgroundColor: "#FDC166",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBotaoDoar:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  serverResponse:{
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold'
  }
})