import React, { useContext, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import ReactPlayer from 'react-player';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faComment, faSortDown, faImage, faPlus } from '@fortawesome/free-solid-svg-icons';

import UserContext from '../../../Context/UserContext';

import Coub from '../../Coub/Coub';

import './Cover.css';

const MyProfile = () => {

    const { user } = useContext(UserContext);
    const [ coubs, setCoubs ] = useState([]);
    let [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(5);
    const [ hasMore, setHasMore ] = useState(true);

    let token = localStorage.getItem("auth-token");
    
    useEffect(() => {
        const fetchForFirstTime = async () => {
            const coubsRes = await axios.get(`/api/getMyCoubs?page=${page}&limit=${limit}`,{
                headers : { "x-auth-token" : token }
            });
            setCoubs(coubsRes.data.results);
            setPage(page+1);
        }
        fetchForFirstTime();
    },[])

    const fetchCoubs = async () => {
        if(hasMore){
            const coubsRes = await axios.get(`/api/getMyCoubs?page=${page}&limit=${limit}`,{
                headers : { "x-auth-token" : token }
            });
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
                        <div className = "edit-cover">
                            <p>Edit Cover</p>
                            <FontAwesomeIcon icon = { faSortDown } />
                        </div>
                        <div className = "upload-cover-section">

                            <div className = "upload-cover-section-element">
                                <FontAwesomeIcon icon = { faPlus } />
                                <p>Use Coub</p>
                            </div>
                            <div className = "upload-cover-section-element">
                                <FontAwesomeIcon icon = { faImage } />
                                <p>Use Coub</p>
                            </div>

                        </div>
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
            <div className = "profile-coubs">
                <InfiniteScroll
                    dataLength = { coubs.length }
                    next = { fetchCoubs }
                    hasMore = { hasMore }
                    loader = {<h4>Loading</h4>}
                >
                    { coubs.map(coub => 
                        // <ReactPlayer
                        //     key = { coub._id }
                        //     url = { coub.url } 
                        //     controls = { true }
                        // />
                        <Coub key = { coub._id } url = { coub.url } id  = { coub._id }/>
                    )}
                </InfiniteScroll>  
            </div>

        </>
    )
}

export default MyProfile
