import React, {useState, useContext, useEffect } from 'react'

import SideNavContext from '../../Context/SideNavContext';

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
            const coubsRes = await axios.get(`/api/getMyCoubs?page=${page}&limit=${limit}`,{
                headers : { "x-auth-token" : token }
            });
            setCoubs(coubsRes.data.results);
            setPage(page+1);
        }
        fetchForFirstTime();
    })
    
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
