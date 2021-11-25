import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  main_container:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF0DE',
  },
  input: {
    backgroundColor: "white",
    color: '#4D4B4B',
    width: "70%",
    height: 60,
    alignItems: 'center',
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 30
  },
  main_titulo:{
    fontSize: 50,
    fontWeight: '100',
    textAlign: 'center',
    width: "70%"
  },
  arrow_container: {
    backgroundColor: "#FDC166",
    borderRadius: 80,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center' 
  }
})