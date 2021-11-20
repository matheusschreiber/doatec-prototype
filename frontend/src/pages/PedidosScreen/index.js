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

  const [ nomePedido, setNomePedido ] = useState();
  const [ quantidade, setQuantidade ] = useState();

  const id_comu = localStorage.getItem('comunidadeID')
  
  useEffect(()=>{
    app.get('/pedidosc', {
      headers: {
        authorization: id_comu
      }
    }).then((response)=>{
      let provisorio = response.data
      provisorio.map((p)=>{
        p['visible'] = true
      })
      setPedidos(provisorio)
    })

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
  
  async function adicionarPedido(e){
    e.preventDefault();
    let headerAxios = {
      headers: {
        "Content-Type": "application/json",
        authorization: id_comu
      }
    }

    const response = await app.post('/pedido', {
      item: nomePedido,
      quantidade_total: quantidade   
    }, headerAxios)

    let a = pedidos.slice()
    let prov = response.data
    prov['visible'] = true
    a.push(prov)
    setPedidos(a)
  }

  async function deletarPedido(id) {
    await app.delete(`/pedido/${id}`, {
      headers: {
        authorization: id_comu
      }
    })
    let a = pedidos.slice()
    a.map((i)=>{
      if (i.id == id) a.splice(a.indexOf(i), 1)
    })
    setPedidos(a)
    
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
              <form onSubmit={adicionarPedido}>
                <input placeholder="Nome do item"
                  onChange={(e)=>setNomePedido(e.target.value)}/> 
                <input placeholder="Quantidade"
                  onChange={(e)=>setQuantidade(parseInt(e.target.value))}/>
                <button className="button"
                  id="minor-button"
                  type="submit">CONFIRMAR</button>
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
                    <p>{i.item}</p>
                    <p>{`${i.quantidade_total} UN.`}</p>
                  </div>
                  <button className="button"
                    id="del-button"
                    onClick={() => deletarPedido(i.id)}>CONFIRMAR</button>
                </div>

                <div className="pedido" style={i.visible?{}:{display:"none"}}>
                  <div className="pedido-uptop">
                    <p>Adquirido <strong>{`${i.quantidade_doada}/${i.quantidade_total}`}</strong></p>
                    <FiTrash2 size={20} 
                      className="trash-button"
                      onClick={()=>switchDeletaPedido(pedidos.indexOf(i))} />
                  </div>
                  <div className="pedido-content">
                    <div className="pedido-item">
                      <h2>ITEM</h2>
                      <p>{i.item}</p>
                      <h2>QUANTIDADE</h2>
                      <p>{i.quantidade_total}</p>
                    </div>
                    <div className="pedido-item">
                      <h2>ID DO PEDIDO</h2>
                      <p>{i.id}</p>
                      <h2>DATA DO PEDIDO</h2>
                      <p>{i.data}</p>
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