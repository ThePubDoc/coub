import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom';

import axios from 'axios';

import Logo from './Images/coub-logo.png';

import Navbar from './Components/Navbar/Navbar';
import SideNav from './Components/SideNav/SideNav';
import Home from './Components/Home/Home';
import CreateCoub from './Components/CreateCoub/CreateCoub';

import UserContext from './Context/UserContext';
import SideNavContex from './Context/SideNavContext';

import './Styles/reset.css';
import './Styles/root.css';
import './App.css';

function App() {

  const [ overlay, setOverlay ] = useState("none");
  const [ sideNav, setSideNav ] = useState(true)
  const [ user, setUser ] = useState({
    token : undefined,
    user : undefined,
  })

  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem("auth-token");
      
      if(token === null){
        localStorage.setItem("auth-token","");
        token = "";
      }

      
    }

    checkLogin();
  },[]);

  return (
    <>
      <UserContext.Provider value = {{ user, setUser }}>
        <SideNavContex.Provider value = {{ sideNav, setSideNav }}>
          <BrowserRouter>
            
            <Navbar Logo = { Logo }></Navbar>
            { sideNav &&
              <SideNav/>
            }

            <Switch>

              <Route path = "/" exact component = { Home }></Route>
              <Route path = "/create" component = { CreateCoub }></Route>

            </Switch>

          </BrowserRouter>
        </SideNavContex.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App;
