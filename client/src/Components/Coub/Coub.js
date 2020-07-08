import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';

import { StyledCoubDetailsHero, StyledCoubHero, StyledCreator,
        StyledCreatorDetails, StyledDp, StyledDpLink, 
        StyledStat, StyledStatsHero, StyledTagsViewsHero,
        StyledVideo, StyledViews, StyledTags, StyledTag } from './Coub.style';

const Coub = ({ url, id }) => {

    const [ coubDetails, setCoubDetails ] = useState({
        tags : []
    });
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
        <StyledCoubHero>
            <ReactPlayer 
                width = '100%'
                height = 'auto'
                url = { url } 
                controls = { true }
            />

            <StyledCoubDetailsHero>
                <StyledCreatorDetails>
                    
                    <StyledDpLink to = { `/${ userDetails.username }`}>
                        <StyledDp src = { userDetails.dp }/>                    
                    </StyledDpLink>
                    
                    <h2>{ coubDetails.caption }</h2>
                    
                    <StyledCreator>
                        <p>Created By</p>
                        <Link to = { `/${ userDetails.username }`}>
                            <h3>{ userDetails.name }</h3>
                        </Link>
                        
                    </StyledCreator>
                </StyledCreatorDetails>

                <StyledStatsHero>
                    <StyledStat>
                        <FontAwesomeIcon icon = { faHeart }/>
                        <p>{ coubDetails.hearts }</p>
                    </StyledStat>

                    <StyledStat>
                        <FontAwesomeIcon icon = { faRetweet }/>
                        <p>0</p>
                    </StyledStat>

                    <StyledStat>
                        <FontAwesomeIcon icon = { faRetweet }/>
                        <p>0</p>
                    </StyledStat>
                </StyledStatsHero>

            </StyledCoubDetailsHero>

            <StyledTagsViewsHero>
                <StyledTags>
                    { coubDetails.tags.map((tag) => (
                        <StyledTag>{ tag }</StyledTag>
                    )) }
                </StyledTags>

                <StyledViews>
                    <p>{ coubDetails.views} Views</p>
                </StyledViews>
            </StyledTagsViewsHero>
        </StyledCoubHero>
    )
}

export default Coub
