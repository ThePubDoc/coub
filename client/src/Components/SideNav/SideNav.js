import React, { useState } from 'react';

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

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b95/p/category/cw_image/60432c0f1f4/5d35698dc76c52d5f9e63/small_1544749976_animals2.png" alt = ""/>
                    <p>Animals & Pets</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b157/p/category/cw_image/93ae83fbc3f/4d90453882a0f2e50dbc0/small_1544622036_Mashup.png" alt =""/>
                    <p>Mashup</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b118/p/category/cw_image/79d6e4a3e73/c0b7416c30391c998a2ac/small_1544750217_Anime2.png" alt = ""/>
                    <p>Anime</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b125/p/category/cw_image/dda6b36d2fb/9ae8ba82060e5659de192/small_1544758441_movies2.png" alt = ""/>
                    <p>Movies & TV</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b95/p/category/cw_image/49fb773a80c/efee899b14f85527ed209/small_1544749693_gaming2.png" alt = ""/>
                    <p>Gaming</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b6/p/category/cw_image/f8ede745da4/2e6c3a22d04db1a6a25e3/small_1544759035_cartoons2.png" alt = ""/>
                    <p>Cartoons</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b191/p/category/cw_image/bc49636b5e9/9d819c4215f13ccf07a7b/small_1544749302_art2.png" alt = ""/>
                    <p>Art & Design</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b95/p/category/cw_image/0327247c5ff/85914bdd8e1edc998c480/small_1544760089_Music3.png" alt = ""/>
                    <p>Music</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b201/p/category/cw_image/6589193546b/5ea69fd70b7b36dec144f/small_1544622133_news.png" alt = ""/>
                    <p>News & Politics</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b6/p/category/cw_image/f582005153c/999b059f60e79e58836fc/small_1544760276_sport2.png" alt = ""/>
                    <p>Sports</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b67/p/category/cw_image/d7b917ae565/55b6fc9b6407f7099c088/small_1544622172_science.png" alt = ""/>
                    <p>Science & Technology</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b6/p/category/cw_image/f29db91ad17/ceeba69e8fe30eb9c445a/small_1544760906_celeb2.png" alt = ""/>
                    <p>Celebrity</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b110/p/category/cw_image/a4b57370b28/3c9d9a8cf4246d5a30610/small_1545567929_Nature.png" alt = ""/>
                    <p>Nature & Travel</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b120/p/category/cw_image/503df3602c0/3bb25ae4face4a7c9a6f8/small_1544654169_Fashion.png" alt = ""/>
                    <p>Fashion & Beauty</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b129/p/category/cw_image/d7afb96f274/3e8dad0b674f8605556f2/small_1545567838_Dance.png" alt = ""/>
                    <p>Dance</p>
                </li>

                <li className = "sidenav-items communities-items">
                    <img src = "https://coubsecure-s.akamaihd.net/get/b126/p/category/cw_image/dcda24f72f3/076e0f1bc1028aa643b02/small_1545566648_Auto.png" alt = ""/>
                    <p>Auto & Technique</p>
                </li>
            </ul>
        </div>
    )
}

export default SideNav
