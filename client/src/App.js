import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom';

import axios from 'axios';

import Logo from './Images/coub-logo.png';

import Navbar from './Components/Navbar/Navbar';
import SideNav from './Components/SideNav/SideNav';
import Home from './Components/Home/Home';
import CreateCoub from './Components/CreateCoub/CreateCoub';
import User from './Components/User/User';

import UserContext from './Context/UserContext';
import SideNavContex from './Context/SideNavContext';
import OverlayContext from './Context/OverlayContext';

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
      console.log(token)
      const tokenRes = await axios.post("/api/isTokenValid",null, {
        headers : { "x-auth-token" : token }
      })
      
      if(tokenRes.data){
        const userRes = await axios.get("/api/user", {
          headers : {"x-auth-token" : token}
        })

        setUser({
          token,
          user : userRes.data,
        })
      }
      console.log("yahan bhi aya")
    }
    checkLogin();
    console.log("andar to aya")
  },[]);

  return (
    <>
      <UserContext.Provider value = {{ user, setUser }}>
        <OverlayContext.Provider value = {{ overlay, setOverlay }}>
          <SideNavContex.Provider value = {{ sideNav, setSideNav }}>
            <BrowserRouter>
              
              <Navbar Logo = { Logo }></Navbar>
              { sideNav &&
                <SideNav/>
              }

              <Switch>

                <Route path = "/" exact component = { Home }></Route>
                <Route path = "/create" component = { CreateCoub }></Route>
                <Route path = "/:username" component = { User }></Route>
              </Switch>

            </BrowserRouter>
          </SideNavContex.Provider>
        </OverlayContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App;
