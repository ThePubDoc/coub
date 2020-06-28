import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import './Overlays.css';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext from '../../Context/UserContext';

const Login = ({overlay, setOverlay}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const { user, setUser } = useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        
        const loginRes = await axios.post(
            "/api/login" , { 
                email, password
        });
        const token = loginRes.data.token;
        
        setUser({
            token : loginRes.data.token,
            user : loginRes.data.user,
        })
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
