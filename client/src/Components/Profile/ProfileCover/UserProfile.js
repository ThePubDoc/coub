import React from 'react'
import { useParams } from 'react-router-dom';

const UserProfile = () => {

    const { username } = useParams();

    return (
        <div>
            <p>{ username } Profile Page</p>
        </div>
    )
}

export default UserProfile
