import React from 'react';
import {AiOutlineGithub} from 'react-icons/ai';
import logo from '../logos/fitnessAILogo.png'; //Image created with MidJourney
import './navbar.css'


const NavBar= () =>{
  return (
    <nav className="navbar navbar-expand-md bg-light">
      <div>
        <a href="/">
          <img src={logo} alt="MixerLogo"/>
        </a>
      </div>
      <div className="nav-main">
        FitnessAI
      </div> 
      <div>
        <a href="https://github.com/akshayarav/FitnessAI" target="_blank" style={{color: "black"}}>
          <AiOutlineGithub className = "logo"/>
        </a>
      </div>
    </nav>
  )
};
export default NavBar;
