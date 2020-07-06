import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faBell, faComment, faUsers } from '@fortawesome/free-solid-svg-icons';


import CreateDropdown from './CreateDropdown';
import Button from '../Button/Button';
import Signup from '../Overlays/Signup';
import Login from '../Overlays/Login';
import UserDropdown from './UserDropdown';

import UserContext from '../../Context/UserContext';
import OverlayContext from '../../Context/OverlayContext';

import './Navbar.css'


import { 
    StyledNav, StyledNavbarElementsContainer, StyledImg, 
    StyledSearchBar, StyledSearchIcon, StyledInput,
    StyledDropdown, StyledPlusIcon, StyledUser,
    StyledUserDp, StyledUserIcons } from './Navbar.style';

const Navbar = ({ Logo }) => {

    
    const { user } = useContext(UserContext);
    const { overlay, setOverlay } = useContext(OverlayContext);

    return (
        <StyledNav>
            <StyledNavbarElementsContainer>
                <Link to = "/">
                    <StyledImg src = { Logo }/>          
                </Link>
            
                <StyledSearchBar>
                    <StyledSearchIcon icon = { faSearch} />
                    <StyledInput type = { "text" } placeholder = { "Search Coub" }/>
                </StyledSearchBar>
                
                <StyledDropdown>
                    <StyledPlusIcon icon = { faPlus }/>
                    <p>Create</p>
                    <CreateDropdown/>
                </StyledDropdown>

            </StyledNavbarElementsContainer>
            
            <StyledNavbarElementsContainer>
                { !user.userData ? (
                    <>
                        <Button
                            name = {"Login"}
                            path = {"/login"}
                            classname = {"login"}
                            overlay = { overlay }
                            setOverlay = { setOverlay }
                        />

                        <Button
                            name = {"Sign up"}
                            path = {"/signup"}
                            classname = {"signup"}
                            overlay = { overlay }
                            setOverlay = { setOverlay }
                        />
                    </>
                    ) : (
                        <>
                            <StyledUserIcons icon = { faComment }/>
                            <StyledUserIcons icon = { faUsers }/>
                            <StyledUserIcons icon = { faBell }/>

                            <StyledUser>
                                <StyledUserDp src = { user.userData.dp }/>
                                <UserDropdown/>
                            </StyledUser>
                            
                        </>
                    )}
            </StyledNavbarElementsContainer>
            
            { overlay === "signup" && <Signup overlay = { overlay } setOverlay = {setOverlay }/> }
            { overlay === "login" && <Login overlay = { overlay } setOverlay = {setOverlay }/> }

        </StyledNav>
            
    )
}

export default Navbar
