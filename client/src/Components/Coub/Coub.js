import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

import './Coub.css';

const Coub = ({ url, id }) => {

    const [ author, setAuthor ] = useState({});
    const [ coubDetails, setCoubDetails ] = useState({});
    const [ coubId, setCoubId ] = useState(id);

    useEffect(() => {
        const getCoubDetails = async () => {
            const coubRes = await axios.get(`/api/getCoubDetails?coubid=${coubId}`);
            setCoubDetails(coubRes.data);
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

            <div className = "coub-details">
                
            </div>
        </div>
    )
}

export default Coub
