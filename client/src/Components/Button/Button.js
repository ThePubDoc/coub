import React from 'react'

import './Button.css';

const Button = ({ name, classname, overlay, setOverlay }) => {
    return (
        <button className = { classname } value = {overlay} onClick = {(e) => setOverlay(classname)}>
            <p>{ name }</p>
        </button>
    )
}

export default Button
