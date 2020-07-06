import React from 'react'
import { Link } from 'react-router-dom';

import { StyledSubMenu } from './Navbar.style';
const Dropdown = () => {
    return (
        <StyledSubMenu>
            <ul>
                <li>
                    <Link to = "/create"><p>Create Coub</p></Link>
                </li>
                <li>
                    <Link to = "/createStory"><p>Create</p></Link>
                </li>
            </ul>
        </StyledSubMenu>
    )
}

export default Dropdown
