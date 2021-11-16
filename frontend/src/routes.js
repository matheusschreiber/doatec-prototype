import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CadastroComunidade from './pages/CadastroComunidade';
import Login from './pages/Login';
import StartScreen from './pages/StartScreen'
import PedidosScreen from './pages/PedidosScreen'

export default function RouterComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<StartScreen/>}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/comunidade" exact element={<CadastroComunidade/>}/>
                <Route path="/pedidosc" exact element={<PedidosScreen/>}/>
            </Routes>
        </BrowserRouter>
    );
}