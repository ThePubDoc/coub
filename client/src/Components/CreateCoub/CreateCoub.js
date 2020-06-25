import React, { useState, useRef, Fragment } from 'react'
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

        let formData = new FormData();

        formData.append("file", video);
        formData.append("start", start);
        formData.append("duration", duration);
 
        const request = await axios.post("/api/trim" , formData, {     
            headers: { 'content-type': 'multipart/form-data' }
        })
        console.log(request);
        setVideoURL(request.data.url)
    }

    return (
        <div>
            <Navbar Logo = { Logo }/>
        
            <form onSubmit = { (e) => extractAllFrames(e) }>
                <input 
                    type = "file" 
                    onChange = { (e) => { 
                        setVideo(e.target.files[0]); 
                        setVideoURL(URL.createObjectURL(e.target.files[0]))
                    }
                }/>
                
                { videoURL.length!==0 &&
                    <Fragment>
                        
                        <ReactPlayer url = { videoURL } playing = { true } controls = { true }/>
                        <input 
                            type = "number" 
                            placeholder = "Start Time in seconds" 
                            onChange = {(e) => setStart(e.target.value)}
                        />
                        <input 
                            type = "number" 
                            placeholder = "Duration in seconds" 
                            onChange = {(e) => setDuration(e.target.value)}
                        />
                        <button>Go</button>

                    </Fragment>    
                }
                
            </form>
            
        </div>
    )
}

export default CreateCoub
