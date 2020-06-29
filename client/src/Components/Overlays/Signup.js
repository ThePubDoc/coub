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
    const [dp, setDP] = useState('');
    
    const signup = async (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("dp", dp);

        const request = await axios.post("/api/signup" , formData , {
            headers: { 'content-type': 'multipart/form-data' }
        });
    }

    const closeOverlay = () => {
        setOverlay("none");
    }

    return (
        <div className = "overlay">
            
            <form>
                <FontAwesomeIcon icon = { faCross } onClick = { closeOverlay }/>

                <div className = "form">
                    <form onSubmit = {(e) => signup(e) }>
                        <input type = "text" value = {name} placeholder = "Enter Your Name" onChange = {(e) => setName(e.target.value)}/>
                        <input type = "text" value = {username} placeholder = "Enter Your Username" onChange = {(e) => setUsername(e.target.value)}/>
                        <input type = "email" value = {email} placeholder = "Enter your email" onChange = {(e) => setEmail(e.target.value)}/>
                        <input type = "password" value = {password} placeholder = "Enter password" onChange = {(e) => setPassword(e.target.value)}/>
                        <input 
                            type = "file"
                            onChange = { (e) => setDP(e.target.files[0]) } 
                        />
                        <button>Sign Up</button>
                    </form>
                </div>

            </form>
        </div>
    )
}

export default Signup
