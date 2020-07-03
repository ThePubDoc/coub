import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import ReactPlayer from 'react-player';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faComment, faSortDown, faImage, faPlus } from '@fortawesome/free-solid-svg-icons';

import './Cover.css';

const UserProfile = () => {

    const { username } = useParams();
    
    const [ otherUser, setOtherUser ] = useState({
        userData : {
            name : "",
            username : "",
            dp : "",
            email : "",
        }
    });

    const [ coubs, setCoubs ] = useState([]);
    let [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(5);
    const [ hasMore, setHasMore ] = useState(true);

    useEffect(() => {

        const getUserInfo = async () => {
            const userRes = await axios.post('/api/getOtherUserInfo', { username });
            setOtherUser({
                userData : userRes.data.otherUserInfo
            })
            console.log(otherUser)
        }

        getUserInfo();
    },[])
    
    useEffect(() => {
        const fetchForFirstTime = async () => {
            const coubsRes = await axios.get(`/api/getUserAllCoubs?username=${username}&page=${page}&limit=${limit}`);
            setCoubs(coubsRes.data.results);
            setPage(page+1);
        }
        fetchForFirstTime();
    },[])

    const fetchCoubs = async () => {
        if(hasMore){
            const coubsRes = await axios.get(`/api/getUserAllCoubs?username=${username}&page=${page}&limit=${limit}`);
            setCoubs(coubs.concat(coubsRes.data.results));
            if(!coubsRes.data.next){
                setHasMore(false)
            }
            else {
                setPage(page+1);
                setHasMore(true);
            }
        }
    }

    return (
        <>
            <div className = "cover-hero">
                <div className = "user-info-hero">
                    <div className = "edit-cover-hero">
                        
                    </div>

                    <div className = "dp-section">
                        <img src = { otherUser.userData.dp } alt = ""/>
                        <h1>{ otherUser.userData.username }</h1>
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
            <InfiniteScroll
                dataLength = { coubs.length }
                next = { fetchCoubs }
                hasMore = { hasMore }
                loader = {<h4>Loading</h4>}
            >
                { coubs.map(coub => 
                    <ReactPlayer
                        key = { coub._id }
                        url = { coub.url } 
                        controls = { true }
                    />
                )}
            </InfiniteScroll>  
        </>
    )
}

export default UserProfile
