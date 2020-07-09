//Libraries Import
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { Link } from 'react-router-dom';

//Icons Import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

//Context Import
import UserContext from '../../Context/UserContext';

//Styled Components Import
import { StyledCoubDetailsHero, StyledCoubHero, StyledCreator,
        StyledCreatorDetails, StyledDp, StyledDpLink, 
        StyledStat, StyledStatsHero, StyledTagsViewsHero,
        StyledVideo, StyledViews, StyledTags, StyledTag } from './Coub.style';

    
const Coub = ({ url, id }) => {

    const { user } = useContext(UserContext);

    const [ coubDetails, setCoubDetails ] = useState({
        tags : [],
        likedBy : [],
    });
    const [ coubId, setCoubId ] = useState(id);
    const [ userDetails, setUserDetails ] = useState({});
    const [ likeByMe, setLikeByMe ] = useState(false);

    useEffect(() => {
        const getCoubDetails = async () => {
            const coubRes = await axios.get(`/api/getCoubDetails?coubid=${coubId}`);
            setCoubDetails(coubRes.data.coubDetails);
            setUserDetails(coubRes.data.userDetails);
        }
        getCoubDetails();
    },[likeByMe])

    useEffect(() => {
        const checkLikeByMe = () => {
            if(user.userData){
                if(coubDetails.likedBy.includes(user.userData.id)){
                    setLikeByMe(true);                
                }
                else{
                    setLikeByMe(false);
                }
            }
            else{
                setLikeByMe(false);
            }
        }
        
        checkLikeByMe();

    },[user, likeByMe, coubDetails])


    const like = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("auth-token");
        const likeRes = await axios.post('/api/like',  { coubId }, {
            headers : {
                "x-auth-token" : token,
            }
        })
        setLikeByMe(likeRes.data)
    }

    const dislike = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("auth-token");
        const likeRes = await axios.post('/api/dislike',  { coubId }, {
            headers : {
                "x-auth-token" : token,
            }
        })
        setLikeByMe(likeRes.data)
    }

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
                        { likeByMe ? (
                            <AiFillHeart onClick = { (e) => dislike(e) }/>
                        ) : (
                            <AiOutlineHeart onClick = { (e) => like(e) }/>
                        )}
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
