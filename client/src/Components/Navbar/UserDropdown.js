import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import UserContext from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
                    <Link to = { `/${ user.user.username }`} className = "user-name">
                        <img src = { user.user.dp }/>
                        <p>{ user.user.name }</p>
                    </Link>
                </li>
                <li>
                    <div className = "user-name" onClick = { logout }>
                        <FontAwesomeIcon icon = { faSignOutAlt }/>
                        <p>Logout</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default UserDropdown
