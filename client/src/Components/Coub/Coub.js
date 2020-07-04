import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

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
        <div>
            <ReactPlayer 
                url = { url } 
                controls = { true }
            />
        </div>
    )
}

export default Coub
