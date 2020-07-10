//Libraries imports
import React, {useState, useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

//Context imports


import { StyledCoubsSectionHero } from '../Home/Home.style';

import Coub from '../Coub/Coub';
import axios from 'axios';


const MyBookmarks = () => {

    let token = localStorage.getItem("auth-token");

    const [ coubs, setCoubs ] = useState([]);
    let [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(5);
    const [ hasMore, setHasMore ] = useState(true);

    useEffect(() => {
        const fectchMyBookmarks = async () => {
            const myBookmarksRes = await axios.get(`/api/myBookmarks?page=${page}&limit=${limit}`,{
                headers : { "x-auth-token" : token }
            } )
            setCoubs(coubs.concat(myBookmarksRes.data.results));
            setPage(page+1);
            if(!myBookmarksRes.data.next){
                setHasMore(false)
            }
        }
        fectchMyBookmarks();
    },[])

    const fetchMoreBookmarks = async () => {
        if(hasMore){
            const myBookmarksRes = await axios.get(`/api/myBookmarks?page=${page}&limit=${limit}`,{
                headers : { "x-auth-token" : token }
            });
            setCoubs(coubs.concat(myBookmarksRes.data.results));
            if(!myBookmarksRes.data.next){
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
                next = { fetchMoreBookmarks }
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

export default MyBookmarks
