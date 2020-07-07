import React, { useState } from 'react'
import axios from 'axios';

import { StyledOverlay, StyledButton, StyledClose, 
    StyledForm, StyledInput } from './Overlay.style';

import { faCross, faCalculator } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Signup = ({ setOverlay}) => {

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

        await axios.post("/api/signup" , formData , {
            headers: { 'content-type': 'multipart/form-data' }
        });
        setOverlay("login");
    }

    const closeOverlay = () => {
        setOverlay("none");
    }

    return (
        <StyledOverlay>
            <StyledClose onClick = { closeOverlay }/>
            <StyledForm onSubmit = {(e) => signup(e)}>
                <h1>Sign Up</h1>
                <StyledInput type = "text" value = {name} placeholder = "Enter Your Name" onChange = {(e) => setName(e.target.value)}/>
                <StyledInput type = "text" value = {username} placeholder = "Enter Your Username" onChange = {(e) => setUsername(e.target.value)}/>
                <StyledInput type = "email" value = {email} placeholder = "Enter your email" onChange = {(e) => setEmail(e.target.value)}/>
                <StyledInput type = "password" value = {password} placeholder = "Enter password" onChange = {(e) => setPassword(e.target.value)}/>
                <StyledInput 
                    type = "file"
                    onChange = { (e) => setDP(e.target.files[0]) } 
                />
                <StyledButton>Sign Up</StyledButton>
                    
            </StyledForm>
        </StyledOverlay>
    )
}

export default Signup
