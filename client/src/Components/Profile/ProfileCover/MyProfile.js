import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faComment } from '@fortawesome/free-solid-svg-icons';

import UserContext from '../../../Context/UserContext';

import './Cover.css';

const MyProfile = () => {

    const { user } = useContext(UserContext);

    return (
        <div className = "cover-hero">
            <div className = "user-info-hero">
                <div className = "edit-cover">
                    <select>
                        <option>Use Coub</option>
                        <option>Upload Picture</option>
                    </select>
                </div>

                <div className = "dp-section">
                    <img src = { user.userData.dp } alt = ""/>
                    <h1>{ user.userData.username }</h1>
                </div>

                <div className = "info-container">
                    <div className = "info">
                        <p>14 Following</p>
                    </div>
                    <div className = "info">
                        <p>14 Followers</p>
                    </div>
                    <FontAwesomeIcon icon = { faCog } className = "seetings" />
                    <button>
                        <FontAwesomeIcon icon = { faComment }/>
                        <p>Message</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
