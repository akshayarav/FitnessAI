import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/navbar"
import Essentials from "./pages/Essentials"
import MyMixer from './pages/MyMixer';
import axios from 'axios';
import {useState, useEffect} from 'react'


function App() {
  return (
    <Router>
      <div className = "fixed-top">
    <NavBar />
      </div>
    <Routes>
      <Route path = "/"  element={<MyMixer />} />
      <Route path = "/essentials" element={<Essentials />} />
    </Routes>
    </Router>
  );
}

export default App;
