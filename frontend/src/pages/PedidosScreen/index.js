import { FiPower, FiTrash2, FiPlus, FiArrowLeft } from 'react-icons/fi';
import logoPequena from '../../assets/logo-pequena.png';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../../services/app'
import './index.css'

export default function PedidosScreen(){
  // let link = "https://secri.org.br/wp-content/uploads/A4_0033_19_LG_H-01-1024x673.png";
  const nav = useNavigate();
  
  const [ pedidos, setPedidos ] = useState([]);
  const [ adicionando, setAdicionando ] = useState(false);
  const [ update, setUpdate ] = useState();
  const [ foto, setFoto ] = useState();

  const id_comu = localStorage.getItem('comunidadeID')
  
  useEffect(()=>{
    app.get('/pedidosc', {
      headers: {
        authorization: id_comu
      }
    }).then((response)=>{setPedidos(response.data)})

    app.get('/comunidade', {
      headers: {
        authorization: id_comu
      }
    }).then((response)=>{setFoto(response.data.foto)})
    .catch((response)=>{
      alert(response)
      nav('/')
    })

    app.get('/')

  }, [id_comu])  
  
  async function switchPedido(){
    if (adicionando) setAdicionando(false)
    else setAdicionando(true)
  }

  async function switchDeletaPedido(key){
    if (pedidos[key].visible) {
      let v = pedidos
      v[key].visible=false
      if (update) setUpdate(false); else setUpdate(true);
      setPedidos(v)
    } else {
      let v = pedidos
      v[key].visible=true
      setPedidos(v)
      if (update) setUpdate(false); else setUpdate(true);
    }
  }

  return(
    <div className="pedidos-container">
      <header className="header">
        <img src={logoPequena} alt="DOATEC LOGO"/>
        <div className="right-inner-header">
          <img src={foto} className="comu-image" alt="Foto de perfil da comunidade"/>
            <div className="logout-button-container" 
              onClick={()=>{
                localStorage.setItem('comunidadeID', '')
                nav('/')
              }}>
              <FiPower size={20} className="logout-button"/>
            </div>
        </div>
      </header>
      <h1>Painel de pedidos </h1>
      
      <section className="pedidos-grid-container">
        <ul>
          <li className={adicionando?"inner-pedido":"pedido-first"} key={10}>
            <div className="first-padrao"
              style={adicionando?{display:"none"}:{display:"flex"}}
              onClick={switchPedido}> 
              <h2>ADICIONAR ITEM</h2>
              <FiPlus size={50} className="plus-button" />
            </div>
            
            <div className="inner-pedido"
                style={adicionando?{}:{display:"none"}}>
              <div className="header-add-pedido">
                <FiArrowLeft size={25} 
                  className="back-button-gray"
                  onClick={switchPedido}/>
                <strong>ADICIONAR</strong>
              </div>
              <form>
                <input placeholder="Nome do item"/> 
                <input placeholder="Quantidade"/>
                <button className="button"
                  id="minor-button">CONFIRMAR</button>
              </form>
            </div>

          </li>
          {
            pedidos.map((i) => (
              <li key={pedidos.indexOf(i)}>
                <div className="inner-pedido"
                  style={i.visible?{display:"none"}:{}}>
                  <div className="header-add-pedido">
                    <FiArrowLeft size={25} 
                      className="back-button-gray"
                      onClick={()=>switchDeletaPedido(pedidos.indexOf(i))}/>
                    <strong>EXCLUIR</strong>
                  </div>
                  <div className="text-section">
                    <p>Monitor</p>
                    <p>10 UN.</p>
                  </div>
                  <button className="button" id="del-button">CONFIRMAR</button>
                </div>

                <div className="pedido" style={i.visible?{}:{display:"none"}}>
                  <div className="pedido-uptop">
                    <p>Adquirido <strong>5/10</strong></p>
                    <FiTrash2 size={20} 
                      className="trash-button"
                      onClick={()=>switchDeletaPedido(pedidos.indexOf(i))} />
                  </div>
                  <div className="pedido-content">
                    <div className="pedido-item">
                      <h2>ITEM</h2>
                      <p>Monitor</p>
                      <h2>QUANTIDADE</h2>
                      <p>10</p>
                    </div>
                    <div className="pedido-item">
                      <h2>ID DO PEDIDO</h2>
                      <p>#ABC123456</p>
                      <h2>DATA DO PEDIDO</h2>
                      <p>11/11/2021</p>
                    </div>
                  </div>
                </div>

              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}