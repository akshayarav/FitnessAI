import React from 'react';
import logo from '../logos/MyMixer.png';
import MixerLogo from '../MixerLogo/MixerLogo'
import './index.css'


const NavBar= () =>{
  return (
    <nav className="navbar navbar-expand-md bg-light">
      <MixerLogo />
      <div className="mx-auto order-0 nav-main">
        FitnessAI
      </div> 
    </nav>
  )
};
export default NavBar;
