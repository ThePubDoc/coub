import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom';

import UserContext from '../../Context/UserContext';

import { StyledGridContainer, StyledGridColumn1,StyledColumn1List, StyledColumn1ListItem,
        StyledLink, StyledUserDp } from './EditProfile.style';

import { StyledSettingsIcon, StyledArrowIcon, StyledPlusIcon } from './EditProfile.style';
import AccountEdit from './AccountEdit';
import Edit from './Edit';

const EditProfile = () => {

    const { user } = useContext(UserContext);
    
    return (
        <StyledGridContainer>
            <StyledGridColumn1>
                <StyledColumn1List>

                    <StyledColumn1ListItem to = "/account/edit">
                        <div>
                            <StyledSettingsIcon/>
                            <p>Account Settings</p>
                        </div>
                        <StyledArrowIcon/>
                    </StyledColumn1ListItem>
                    
                    <StyledColumn1ListItem to = {`/${user.userData.username}/edit`}>
                        <div>
                            <StyledUserDp src = { user.userData.dp }/>
                            <p>{ user.userData.username }</p>
                        </div>
                        <StyledArrowIcon/>
                    </StyledColumn1ListItem>

                    <StyledColumn1ListItem>
                        <div>
                            <StyledPlusIcon/>
                            <p>Account Settings</p>
                        </div>
                        <StyledArrowIcon/>
                    </StyledColumn1ListItem>

                </StyledColumn1List>
            </StyledGridColumn1>

            <Route path = "/account/edit" component = { AccountEdit }/>
            <Route path = {`/${user.userData.username}/edit`} component = { Edit }/>
        </StyledGridContainer>
    )
}

export default EditProfile
