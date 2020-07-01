import React, { useContext, useEffect } from 'react'

import SideNavContext from '../../Context/SideNavContext';

const Home = () => {

    const { setSideNav } = useContext(SideNavContext);

    useEffect(() => {
        setSideNav(true)
    },[ setSideNav ])
    
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
