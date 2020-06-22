import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Logo from './Images/coub-logo.png';

import Navbar from './Components/Navbar/Navbar';
import SideNav from './Components/SideNav/SideNav';
import Signup from './Components/Signup/Signup';

import './Styles/reset.css';
import './Styles/root.css';
import './App.css';

function App() {
  const [overlay, setOverlay] = useState("none");

  return (
    <Router>
      <div className="App">
        <Navbar Logo = { Logo } overlay = {overlay} setOverlay = { setOverlay }></Navbar>
        <SideNav/>      
      </div>
      { overlay === "signup" && <Signup overlay = { overlay } setOverlay = {setOverlay }/> }
    </Router>
  );
}

export default App;
