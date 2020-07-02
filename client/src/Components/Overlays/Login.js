import React, { useState, useContext } from 'react';

import axios from 'axios';

import './Overlays.css';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext from '../../Context/UserContext';

const Login = ({ setOverlay}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const { setUser } = useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        
        const loginRes = await axios.post(
            "/api/login" , { 
                email, password
        });
        
        setUser({
            token : loginRes.data.token,
            userData : loginRes.data.userData,
        })
        
        localStorage.setItem("auth-token", loginRes.data.token);
        closeOverlay();
    }

    const closeOverlay = () => {
        setOverlay("none");
    }

    return (
        <div className = "overlay">
            <FontAwesomeIcon className = "close" icon = { faCross } onClick = { closeOverlay }/>
            <form>
                <h1>Login</h1>
                <input type = "email" value = {email} placeholder = "Enter your email" onChange = {(e) => setEmail(e.target.value)}/>
                <input type = "password" value = {password} placeholder = "Enter password" onChange = {(e) => setPassword(e.target.value)}/>
                <button onClick = {(e) => login(e) }>Login</button>
            </form>
        </div>
    )
}

export default Login
