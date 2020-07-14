import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyProfile from './ProfileCover/MyProfile';
import UserProfile from './ProfileCover/UserProfile';

import UserContext from '../../Context/UserContext';

const User = () => {
    
    const { user } = useContext(UserContext);

    const { username } = useParams();

    const checkForProfile = () => {
        if(user.userData){
            if(user.userData.username === username){
                return <MyProfile/>
            }
            
        }
        return <UserProfile/>
    }

    return (
        <div>
            { checkForProfile() }
        </div>
    )
}

export default User