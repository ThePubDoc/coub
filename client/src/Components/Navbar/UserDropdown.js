import React, { useContext } from 'react';
import { Link} from 'react-router-dom';

import UserContext from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserDropdown = () => {

    const { user, setUser } = useContext(UserContext);

    const logout = () => {

        setUser({
            token : undefined,
            userData : undefined
        })
        localStorage.setItem("auth-token", "")
    
    }
    return (
        <div className = "user-sub-menu">
            <ul>
                <li>
                    <Link to = { `/${ user.userData.username }`} className = "user-name">
                        <img src = { user.userData.dp } alt = ""/>
                        <p>{ user.userData.name }</p>
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
