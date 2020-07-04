import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';

import './Coub.css';

const Coub = ({ url, id }) => {

    const [ author, setAuthor ] = useState({});
    const [ coubDetails, setCoubDetails ] = useState({});
    const [ coubId, setCoubId ] = useState(id);
    const [ userDetails, setUserDetails ] = useState({});

    useEffect(() => {
        const getCoubDetails = async () => {
            const coubRes = await axios.get(`/api/getCoubDetails?coubid=${coubId}`);
            setCoubDetails(coubRes.data.coubDetails);
            setUserDetails(coubRes.data.userDetails);
        }

        getCoubDetails();
    },[])

    return (
        <div className = "coub-hero">
            <ReactPlayer 
                width = '100%'
                height = 'auto'
                url = { url } 
                controls = { true }
            />

            <div className = "coub-details-hero">
                <div className = "creator-details">
                    <img src = { userDetails.dp }/>
                    <h2>{ coubDetails.caption }</h2>
                    <div className = "creator">
                        <p>Created By</p>
                        <h3>{ userDetails.name }</h3>
                    </div>
                </div>

                <div className = "stats-hero">
                    <div className = "stat">
                        <FontAwesomeIcon icon = { faHeart }/>
                        <p>{ coubDetails.hearts }</p>
                    </div>

                    <div className = "stat">
                        <FontAwesomeIcon icon = { faRetweet }/>
                        <p>0</p>
                    </div>

                    <div className = "stat">
                        <FontAwesomeIcon icon = { faRetweet }/>
                        <p>0</p>
                    </div>
                </div>

            </div>

            <div className = "tags-views-hero">
                <div className = "tags">
                    { coubDetails.tags }
                </div>

                <div className = "views">
                    <p>{ coubDetails.views} Views</p>
                </div>
            </div>
        </div>
    )
}

export default Coub
