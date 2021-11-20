import frontImage from '../../assets/front.png';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import app from '../../services/app';
import './styles.css';

function Login(){
  const [ comunidade, setComunidade ] = useState();
  const [ senha, setSenha ] = useState();
  const nav = useNavigate();

  async function handleLogin(e){
    e.preventDefault();
    try {
      const response = await app.post('/login', {
        nome: comunidade,
        senha_log: senha
      })
      localStorage.setItem('comunidadeID', response.data.id_comu)
      nav('/pedidosc')
    } catch (err) {
      alert("Problema no login")
    }
  }
  
  return(
    <div className="login-container">
      <img src={frontImage} alt="donation illustration" />
      <section className="form-container">
        <h1>Olá <strong>comunidade</strong>!</h1>
        <h1>Faça seu login abaixo</h1>
        
        <form onSubmit={handleLogin}>
          <input placeholder="Nome da comunidade"
            onChange={(e)=>{setComunidade(e.target.value)}}/>
          <input placeholder="Senha"
            type="password"
            onChange={(e)=>{setSenha(e.target.value)}}/>
          <div className="button-group">
            <button className="button" type="submit">Logar</button>
            <button className="button" onClick={() => nav('/comunidade')}>Cadastrar</button>
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