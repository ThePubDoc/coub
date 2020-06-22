import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFire, faRandom, faBars, faCircle, faGem, 
    faUserFriends, faUser, faHeart, faBookmark } 
    from '@fortawesome/free-solid-svg-icons';

import './SideNav.css';

const SideNav = () => {

    const [showMore, setShowMore]  = useState(true);
    const [showLess, setShowLess] = useState(false);

    const toggle = () => {
        setShowMore(!showMore);
        setShowLess(!showLess)
    }

    return (
        <div className = "sidenav">
            <ul>
                <li className = "sidenav-items">
                    <FontAwesomeIcon className = "icon" icon = { faHome }/>
                    <p>Home</p>
                </li>

                <li className = "sidenav-items">
                    <FontAwesomeIcon className = "icon" icon = { faFire }/>
                    <p>Hot</p>
                </li>

                <li className = "sidenav-items">
                    <FontAwesomeIcon className = "icon" icon = { faRandom }/>
                    <p>Random</p>
                </li>
                
                { showMore &&
                    <li className = "sidenav-items" onClick = { toggle }>
                        <p>Show More...</p> 
                    </li>
                }
                

                { !showMore && 
                    <div>
                        <li className = "sidenav-items">
                            <FontAwesomeIcon className = "icon" icon = { faBars }/>
                            <p>Stories</p>
                        </li>
                        
                        <li className = "sidenav-items">
                            <FontAwesomeIcon className = "icon" icon = { faCircle }/>
                            <p>Weekly</p>
                        </li>
                        
                        <li className = "sidenav-items">
                            <FontAwesomeIcon className = "icon" icon = { faGem }/>
                            <p>Coub Picks</p>
                        </li>
                        <li className = "sidenav-items">
                            <FontAwesomeIcon className = "icon" icon = { faFire }/>
                            <p>Best Of The Year</p>
                        </li>
                        
                        <li className = "sidenav-items">
                            <FontAwesomeIcon className = "icon" icon = { faUserFriends }/>
                            <p>Who To Follow</p>
                        </li>
                        
                        <li className = "sidenav-items">
                            <FontAwesomeIcon className = "icon" icon = { faUser }/>
                            <p>Featured Channels</p>
                        </li>

                        <li className = "sidenav-items" onClick = { toggle }>
                            { showLess && <p>Show Less...</p> }
                        </li>
                    </div>
                }

                <div className = "line"/>
                
                <li className = "sidenav-items">
                    <FontAwesomeIcon className = "icon" icon = { faHeart }/>
                    <p>My Likes</p>
                </li>
                <li className = "sidenav-items">
                    <FontAwesomeIcon className = "icon" icon = { faBookmark }/>
                    <p>Bookmarks</p>
                </li>

                <div className = "line"/>
                
                <h3>Communities</h3>

                <li className = "sidenav-items">
                    <p>Animals & Pets</p>
                </li>

                <li className = "sidenav-items">
                    <p>Mashup</p>
                </li>

                <li className = "sidenav-items">
                    <p>Anime</p>
                </li>

                <li className = "sidenav-items">
                    <p>Movies & TV</p>
                </li>

                <li className = "sidenav-items">
                    <p>Gaming</p>
                </li>

                <li className = "sidenav-items">
                    <p>Cartoons</p>
                </li>

                <li className = "sidenav-items">
                    <p>Art & Design</p>
                </li>

                <li className = "sidenav-items">
                    <p>Music</p>
                </li>

                <li className = "sidenav-items">
                    <p>News & Politics</p>
                </li>

                <li className = "sidenav-items">
                    <p>Sports</p>
                </li>

                <li className = "sidenav-items">
                    <p>Science & Technology</p>
                </li>

                <li className = "sidenav-items">
                    <p>Celebrity</p>
                </li>

                <li className = "sidenav-items">
                    <p>Nature & Travel</p>
                </li>

                <li className = "sidenav-items">
                    <p>Fashion & Beauty</p>
                </li>
            </ul>
        </div>
    )
}

export default SideNav
