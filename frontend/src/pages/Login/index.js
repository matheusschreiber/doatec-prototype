import React from 'react';
import './styles.css';
import { FiInfo } from 'react-icons/fi';

import frontImage from '../../assets/front.png';

function Login(){
  return(
    <div className="login-container">
      <img src={frontImage} alt="donation illustration" />
      <section className="form-container">
        <h1>Olá <strong>comunidade</strong>!</h1>
        <h1>Faça seu login abaixo</h1>
        
        <form>
          <input placeholder="Nome da comunidade"/>
          <input placeholder="Senha"/>
          <div className="button-group">
            <button className="button" type="submit">Logar</button>
            <button className="button">Cadastrar</button>
          </div>
        </form>

        <div className="relate-problem">
          <FiInfo size={19} color={"var(--laranja)"}/>
          <h2>Relatar um problema</h2>
        </div>
      </section>
    </div>
  )
}

export default Login;