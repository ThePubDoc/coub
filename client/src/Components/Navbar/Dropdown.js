import React from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

const Dropdown = () => {
    return (
        <div className = "sub-menu">
            <ul>
                <li>
                    <Link to = "/create"><p>Create Coub</p></Link>
                </li>
                <li>
                    <p>Create Story</p>
                </li>
            </ul>
        </div>
    )
}

export default Dropdown
