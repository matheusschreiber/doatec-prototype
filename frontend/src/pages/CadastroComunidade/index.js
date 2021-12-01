import logoPequena from '../../assets/logo-pequena.png';
import { useNavigate } from "react-router-dom";
import {FiArrowLeft} from 'react-icons/fi';
import React, { useState } from "react";
import app from '../../services/app'
import './index.css'

export default function CadastroComunidade(){
  const nav = useNavigate();
  
  const [ nome, setNome ] = useState();
  const [ senha, setSenha ] = useState();
  const [ senhaConf, setSenhaConf] = useState();
  const [ email, setEmail ] = useState();
  const [ cidade, setCidade ]  = useState();
  const [ uf, setUF ] = useState();
  const [ foto, setFoto ] = useState();

  async function handleSubmit(e){
    e.preventDefault();
    try {
      if (senha!==senhaConf) throw new Error("Erro na confirmação da senha");

      const response = await app.post('/comunidade', {
        nome,
        senha,
        email,
        cidade,
        uf,
        foto
      }).catch((erro)=>alert(erro))
      localStorage.setItem('comunidadeID', response.data.id_comu)
      alert('Cadastrado com sucesso!')
      nav('/login')
    } catch (err) {
      alert(err)
    }
  }


  return (
    <div className="comu-container">
      <div className="inside-container">
        <header className="header">
          <img src={logoPequena} alt="DOATEC LOGO"/>
          <FiArrowLeft size={35}
            className="back-button"
            onClick={()=>nav('/login')}/>
        </header>
        <h1>Faça o cadastro da sua comundiade</h1>
        <div className="comu-form-container">
          
          <form id="this-form" onSubmit={handleSubmit}>
            <div className="left-form-container">
              <input placeholder="Nome da comunidade"
                onChange={(e)=>{setNome(e.target.value)}}/>
              <input placeholder="Senha"
                type="password"
                onChange={(e)=>{setSenha(e.target.value)}}/>
              <input placeholder="Confirme a senha"
                type="password"
                onChange={(e)=>{setSenhaConf(e.target.value)}}/>
            </div>
            <div className="right-form-container">
              <input placeholder="Email"
                onChange={(e)=>{setEmail(e.target.value)}}/>
              <div className="form-group">
                <input placeholder="Cidade"
                  style={{width: "77%"}}
                  onChange={(e)=>{setCidade(e.target.value)}}/>
                <input placeholder="UF"
                  style={{width: "20%"}}
                  onChange={(e)=>{setUF(e.target.value)}}/>
              </div>
              <input placeholder="Link da imagem de perfil"
                onChange={(e)=>{setFoto(e.target.value)}}/>
            </div>
          </form>
        </div>
        <button className="button" type="submit" form="this-form">Cadastrar</button>
      </div>
    </div>
  );
}