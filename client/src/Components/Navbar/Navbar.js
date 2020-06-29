import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faBell, faComment, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

import CreateDropdown from './CreateDropdown';
import Button from '../Button/Button';
import Signup from '../Overlays/Signup';
import Login from '../Overlays/Login';
import UserDropdown from './UserDropdown';

import SideNavContext from '../../Context/SideNavContext';
import UserContext from '../../Context/UserContext';

import './Navbar.css'

const Navbar = ({ Logo}) => {

    const [overlay, setOverlay] = useState("none");

    const { sideNav, setSideNav } = useContext(SideNavContext);
    const { user, setUser } = useContext(UserContext);

    return (
        <div className = "navbar">
            <div className = "navbar-elements-container">
                <Link to = "/">
                    <img src = { Logo } />
                </Link>
                
                <div className = "search-coub">
                    <FontAwesomeIcon className = "search" icon = { faSearch }/>
                    <input 
                        type = "text"
                        placeholder = "Search Coub"
                    />
                </div>
                
                <div className = "dropdown">
                    <FontAwesomeIcon className = "plus" icon = { faPlus }/>
                    <p>Create</p>
                    <CreateDropdown/>                
                </div>
            </div>

            
            <div className = "navbar-elements-container">
                { !user.user ? (
                    <>
                        <Button
                            name = {"Login"}
                            path = {"/login"}
                            classname = {"login"}
                            overlay = { overlay }
                            setOverlay = { setOverlay }
                        />

                        <Button
                            name = {"Sign up"}
                            path = {"/signup"}
                            classname = {"signup"}
                            overlay = { overlay }
                            setOverlay = { setOverlay }
                        />
                    </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon = { faComment } className = "user-icons"/>
                            <FontAwesomeIcon icon = { faUsers } className = "user-icons"/>
                            <FontAwesomeIcon icon = { faBell } className = "user-icons"/>
                            <div className = "user">
                                <img src = { user.user.dp } className = "user-icons dp"/>
                                <UserDropdown/>
                            </div>
                            
                        </>
                    )}
                
            </div>
            { overlay === "signup" && <Signup overlay = { overlay } setOverlay = {setOverlay }/> }
            { overlay === "login" && <Login overlay = { overlay } setOverlay = {setOverlay }/> }
        </div>
    )
}

export default Navbar
