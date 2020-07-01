import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faComment, faSortDown, faImage, faPlus } from '@fortawesome/free-solid-svg-icons';

import './Cover.css';

const UserProfile = () => {

    return (
        <div className = "cover-hero">
            <div className = "user-info-hero">
                <div className = "edit-cover-hero">
                    
                </div>

                <div className = "dp-section">
                    <img src = "" alt = ""/>
                    <h1></h1>
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

export default UserProfile
