import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Logo from './Images/coub-logo.png';

import Navbar from './Components/Navbar/Navbar';

import './Styles/reset.css';
import './Styles/root.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar Logo = { Logo }></Navbar>
      
    </div>
  );
}

export default App;
