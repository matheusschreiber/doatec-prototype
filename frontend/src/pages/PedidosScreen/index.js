import React from 'react';
import { FiPower, FiTrash2, FiPlus } from 'react-icons/fi';
import logoPequena from '../../assets/logo-pequena.png';
import './index.css'

export default function PedidosScreen(){
  let link = "https://secri.org.br/wp-content/uploads/A4_0033_19_LG_H-01-1024x673.png";
  var vetor = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  return(
    <div className="pedidos-container">
      <header className="header">
        <img src={logoPequena} alt="DOATEC LOGO"/>
        <div className="right-inner-header">
          <img src={link} className="comu-image" alt="Foto de perfil da comunidade"/>
          <a href="/">
            <div className="logout-button-container">
              <FiPower size={20} className="logout-button"/>
            </div>
          </a>
        </div>
      </header>
      <h1>Painel de pedidos</h1>
      <section className="pedidos-grid-container">
        <ul>
          <li className="pedido-first" key={0}>
            <h2>ADICIONAR ITEM</h2>
            <FiPlus size={50} class="plus-button" />
          </li>
          {
            vetor.map((i) => (
              <li className="pedido" key={i}>
                <div className="pedido-uptop">
                  <p>Adquirido <strong>5/10</strong></p>
                  <FiTrash2 size={20} className="trash-button"/>
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
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}