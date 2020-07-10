//Libraries imports
import React, {useState, useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

//Context imports


import { StyledCoubsSectionHero } from '../Home/Home.style';

import Coub from '../Coub/Coub';
import axios from 'axios';


const MyLikes = () => {

    let token = localStorage.getItem("auth-token");

    const [ coubs, setCoubs ] = useState([]);
    let [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(5);
    const [ hasMore, setHasMore ] = useState(true);

    useEffect(() => {
        const fectchMyLikes = async () => {
            const myLikedRes = await axios.get(`/api/myLikes?page=${page}&limit=${limit}`,{
                headers : { "x-auth-token" : token }
            } )
            setCoubs(coubs.concat(myLikedRes.data.results));
            setPage(page+1);
            if(!myLikedRes.data.next){
                setHasMore(false)
            }
        }
        fectchMyLikes();
    },[])

    const fetchMoreLikes = async () => {
        console.log("age ka fetch")
        if(hasMore){
            const myLikedRes = await axios.get(`/api/myLikes?page=${page}&limit=${limit}`,{
                headers : { "x-auth-token" : token }
            });
            setCoubs(coubs.concat(myLikedRes.data.results));
            if(!myLikedRes.data.next){
                setHasMore(false)
            }
            else {
                setPage(page+1);
                setHasMore(true);
            }
        }
    }

    return (
        <StyledCoubsSectionHero>
            <InfiniteScroll
                dataLength = { coubs.length }
                next = { fetchMoreLikes }
                hasMore = { hasMore }
                loader = {<h4>Loading</h4>}
            >
                { coubs.map(coub => 
                    
                    <Coub key = { coub._id } url = { coub.url } id = { coub._id }/>
                )}
            </InfiniteScroll>  
        </StyledCoubsSectionHero>
    )
}

export default MyLikes
