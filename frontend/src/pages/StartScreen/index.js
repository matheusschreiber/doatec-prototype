import React from 'react';
import './index.css';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import { FiArrowDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import logoGrande from '../../assets/logo-grande.png';

function StartScreen() {
  const nav = useNavigate();
  
  
  return (
    <div className="container">
     <img src={logoGrande} alt="DOATEC logo"/>
        <div className="text-container">
          <div className="left">
            <p>DESCRIÇÃO DO <strong>PROJETO</strong></p>
          </div>  
          <Divider type="vertical" style={{ height: "90%", borderColor:"var(--cinza-claro)" }}/>
          <div className="right">
            <p>Uma plataforma que visa expandir
              o acesso às tecnologias pelas comunidades 
              e também ajudar o meio ambiente</p>
          </div>      
        </div>
        
     <div className="next-arrow" onClick={() => nav('/login')}>
      <FiArrowDown size={30} />
     </div>
    </div>
  );
}

export default StartScreen;
