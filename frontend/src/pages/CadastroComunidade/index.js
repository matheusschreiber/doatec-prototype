import React from "react";
import './index.css'
import {FiArrowLeft} from 'react-icons/fi'

import logoPequena from '../../assets/logo-pequena.png'

export default function CadastroComunidade(){
  return (
    <div className="comu-container">
      <div className="inside-container">
        <header className="header">
          <img src={logoPequena} alt="DOATEC LOGO"/>
          <a href="/"><FiArrowLeft size={35} className="back-button"/></a>
        </header>
        <h1>Faça o cadastro da sua comundiade</h1>
        <div className="comu-form-container">
          <form>
            <div className="left-form-container">
              <input placeholder="Nome da comunidade"/>
              <input placeholder="Senha"/>
              <input placeholder="Confirme a senha"/>
            </div>
            <div className="right-form-container">
              <input placeholder="Senha"/>
              <div className="form-group">
                <input placeholder="Cidade" style={{width: "77%"}}/>
                <input placeholder="UF" style={{width: "20%"}}/>
              </div>
              <input placeholder="Link da imagem de perfil"/>
            </div>
          </form>
        </div>
        <button className="button" type="submit">Cadastrar</button>
      </div>
    </div>
  );
}