import React from 'react';
import logo from '../logos/template_logo.png';
import './index.css';

const MixerLogo=() => {
    return (    
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <a className="nav-link active" href="/">
        <img src={logo} alt="MixerLogo"/>
      </a>
    </li>
  </ul>
  )
}

export default MixerLogo
