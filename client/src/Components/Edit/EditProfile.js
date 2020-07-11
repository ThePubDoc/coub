import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import UserContext from '../../Context/UserContext';

const EditProfile = () => {

    const { user } = useContext(UserContext);
    
    return (
        <div>
            <p>Edit profile</p>
        </div>
    )
}

export default EditProfile
