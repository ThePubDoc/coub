import React, {useState, useContext, useEffect } from 'react'
import ReactPlayer from 'react-player';
import axios from 'axios';

import SideNavContext from '../../Context/SideNavContext';
import InfiniteScroll from 'react-infinite-scroll-component';

import Coub from '../Coub/Coub';

import './Home.css';

const Home = () => {

    const { setSideNav } = useContext(SideNavContext);
    const [ coubs, setCoubs ] = useState([]);
    let [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(5);
    const [ hasMore, setHasMore ] = useState(true);

    useEffect(() => {
        setSideNav(true)
    },[ setSideNav ])
    
    useEffect(() => {
        const fetchForFirstTime = async () => {
            const coubsRes = await axios.get(`/api/getAllCoubs?page=${page}&limit=${limit}`);
            setCoubs(coubsRes.data.results);
            setPage(page+1);
        }
        fetchForFirstTime();
    },[])

    const fetchCoubs = async () => {
        if(hasMore){
            const coubsRes = await axios.get(`/api/getAllCoubs?page=${page}&limit=${limit}`);
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
        <div className = "coubs-section-hero">
            <InfiniteScroll
                dataLength = { coubs.length }
                next = { fetchCoubs }
                hasMore = { hasMore }
                loader = {<h4>Loading</h4>}
            >
                { coubs.map(coub => 
                    <Coub key = { coub._id } url = { coub.url } id  = { coub._id }/>
                )}
            </InfiniteScroll>  
        </div>
    )
}

export default Home
