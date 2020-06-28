import React, { useState, useContext, useEffect } from 'react'

import SideNavContext from '../../Context/SideNavContext';

const Home = () => {

    const { sideNav, setSideNav } = useContext(SideNavContext);

    useEffect(() => {
        setSideNav(true)
    })
    
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
