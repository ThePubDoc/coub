import React, { useContext } from 'react';
import { Link} from 'react-router-dom';

import UserContext from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { StyledUserDropdown, StyledLogout, StyledLogoutIcon,
        StyledUsername, StyledDropdownDp } from './Navbar.style';

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
        <StyledUserDropdown>
            <ul>
                <li>
                    <StyledUsername to = { `/${ user.userData.username }`}>
                        <StyledDropdownDp src = { user.userData.dp }/>
                        <p>{ user.userData.name }</p>
                    </StyledUsername>
                </li>
                <li>
                    <StyledLogout onClick = { logout }>
                        <StyledLogoutIcon icon = { faSignOutAlt }/>
                        <p>Logout</p>
                    </StyledLogout>
                </li>
            </ul>
        </StyledUserDropdown>
    )
}

export default UserDropdown
