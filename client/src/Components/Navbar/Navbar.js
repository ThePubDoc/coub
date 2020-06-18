import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Dropdown from './Dropdown';
import Button from '../Button/Button';

import './Navbar.css'

const Navbar = ({ Logo }) => {
    return (
        <div className = "navbar">
            <div className = "navbar-elements-container">
                <img src = { Logo }/>
                
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
                    <Dropdown/>                
                </div>
            </div>

            <div className = "navbar-elements-container">
                <Button
                    name = {"Login"}
                    path = {"/login"}
                    classname = {"login"}
                />

                <Button
                    name = {"Sign up"}
                    path = {"/signup"}
                    classname = {"signup"}
                />
            </div>
        </div>
    )
}

export default Navbar
