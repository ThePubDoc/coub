import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import UserContext from '../../Context/UserContext';

const UserDropdown = () => {

    const { user, setUser } = useContext(UserContext);

    const logout = () => {

        setUser({
            token : undefined,
            user : undefined
        })
        localStorage.setItem("auth-token", "")
    
    }
    return (
        <div className = "user-sub-menu">
            <ul>
                <li>
                    <Link to = "/create"><p>{ user.user.name }</p></Link>
                </li>
                <li>
                    <p onClick = { logout }>Logout</p>
                </li>
            </ul>
        </div>
    )
}

export default UserDropdown
