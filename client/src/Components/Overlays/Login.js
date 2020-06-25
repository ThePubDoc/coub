import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Overlays.css';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = ({overlay, setOverlay}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const login = async (e) => {
        e.preventDefault();
        const request = await axios.post("/api/login" , { email, password});
    }

    const closeOverlay = () => {
        setOverlay("none");
    }

    return (
        <div className = "overlay">
            
            <form>
                <FontAwesomeIcon icon = { faCross } onClick = { closeOverlay }/>

                <div className = "form">
                    <input type = "email" value = {email} placeholder = "Enter your email" onChange = {(e) => setEmail(e.target.value)}/>
                    <input type = "password" value = {password} placeholder = "Enter password" onChange = {(e) => setPassword(e.target.value)}/>
                    <button onClick = {(e) => login(e) }>Login</button>
                </div>

            </form>
        </div>
    )
}

export default Login
