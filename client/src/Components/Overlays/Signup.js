import React, { useState, useEffect } from 'react'
import axios from 'axios';

import './Overlays.css';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Signup = ({overlay, setOverlay}) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const signup = async (e) => {
        e.preventDefault();
        const request = await axios.post("/api/signup" , {name , username, email, password});
    }

    const closeOverlay = () => {
        setOverlay("none");
    }

    return (
        <div className = "overlay">
            
            <form>
                <FontAwesomeIcon icon = { faCross } onClick = { closeOverlay }/>

                <div className = "form">
                    <input type = "text" value = {name} placeholder = "Enter Your Name" onChange = {(e) => setName(e.target.value)}/>
                    <input type = "text" value = {username} placeholder = "Enter Your Username" onChange = {(e) => setUsername(e.target.value)}/>
                    <input type = "email" value = {email} placeholder = "Enter your email" onChange = {(e) => setEmail(e.target.value)}/>
                    <input type = "password" value = {password} placeholder = "Enter password" onChange = {(e) => setPassword(e.target.value)}/>
                    <button onClick = {(e) => signup(e) }>Sign Up</button>
                </div>

            </form>
        </div>
    )
}

export default Signup
