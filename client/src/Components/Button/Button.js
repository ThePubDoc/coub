import React from 'react'

import './Button.css';

const Button = ({ name, path, classname }) => {
    return (
        <button className = { classname }>
            <p>{ name }</p>
        </button>
    )
}

export default Button
