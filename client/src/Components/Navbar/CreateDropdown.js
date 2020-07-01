import React from 'react'
import { Link } from 'react-router-dom';

const Dropdown = () => {
    return (
        <div className = "sub-menu">
            <ul>
                <li>
                    <Link to = "/create"><p>Create Coub</p></Link>
                </li>
                <li>
                    <Link to = "/createStory"><p>Create</p></Link>
                </li>
            </ul>
        </div>
    )
}

export default Dropdown
