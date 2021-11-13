import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login';
import StartScreen from './pages/StartScreen'

export default function RouterComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<StartScreen/>}/>
                <Route path="/login" exact element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}