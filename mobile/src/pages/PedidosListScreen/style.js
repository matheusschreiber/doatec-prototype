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
    height: 156,
    justifyContent: 'space-between',
    color: '#4D4B4B',
    marginBottom: 20
  },
  headerInner:{
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBar:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4D4B4B'
  },
  pedidoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    width: 300,
    flexDirection: 'row',
    marginBottom: 10
  },
  pedidoTitle:{
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4D4B4B'
  },
  pedidoInfo: {
    marginBottom: 20,
    color: '#4D4B4B'
  },
  leftColumn: {
    width: "50%",
    height: 120,
    justifyContent: 'space-between',
  },
  rightColumn:{
    width:"50%",
    height: 120,
    justifyContent: 'space-between',
  },
  pedidoMeta:{
    height: 15,
    width: "70%",
    backgroundColor: '#C4C4C4',
    marginBottom: 20,
  },
  pedidoMetaInner:{
    height:"100%",
    backgroundColor: "#FDC166"
  }
})