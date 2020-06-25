import React, { useState, useRef } from 'react'
import ReactPlayer from 'react-player';

import axios from 'axios';

import Navbar from '../Navbar/Navbar'
import Logo from '../../Images/coub-logo.png';

const CreateCoub = () => {

    const [ video, setVideo ] = useState({});
    const [ videoURL, setVideoURL] = useState('');
    const [ start, setStart ] = useState('');
    const [ duration, setDuration ] = useState('');

    const extractAllFrames = async (e) => {
        e.preventDefault();
        let msg = "hello";
        let formData = new FormData();
        formData.append("file", video);
        formData.append("msg", msg)
        console.log(formData);
         
        const request = await axios.post("/api/trim" , formData, {     
            headers: { 'content-type': 'multipart/form-data' }
        })
    }

    return (
        <div>
            <Navbar Logo = { Logo }/>
            <h1>Hello</h1>
            <form onSubmit = { (e) => extractAllFrames(e) }>
                <input type = "file" name = "file" onChange = { (e) => { 
                        setVideo(e.target.files[0]); 
                        setVideoURL(URL.createObjectURL(e.target.files[0]))
                    }
                }></input>
                
                <button>Go</button>
            </form>
            { videoURL.length!==0 && 
                <ReactPlayer url = { videoURL } playing = { true } controls = { true }/>
            }
        </div>
    )
}

export default CreateCoub
