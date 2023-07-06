import React from 'react';
import logo from '../logos/MyMixer.png';
import MixerLogo from '../MixerLogo/MixerLogo'
import './index.css'


const NavBar= () =>{
  return (
    <nav className="navbar navbar-expand-md bg-light">
      <MixerLogo />
      <div className="mx-auto order-0 nav-main">
        MyCoach
      </div> 
      {/* <div>
        <ul className = "navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="faq">FAQ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login">Login</a>
            </li>
        </ul>
      </div> */}
    </nav>
  )
};
export default NavBar;
