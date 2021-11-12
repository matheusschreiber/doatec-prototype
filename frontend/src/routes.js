import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StartScreen from './pages/StartScreen'

export default function RouterComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<StartScreen/>}/>
            </Routes>
        </BrowserRouter>
    );
}