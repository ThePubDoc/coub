import React, { useState, useRef, Fragment } from 'react'
import ReactPlayer from 'react-player';

import axios from 'axios';

import Navbar from '../Navbar/Navbar'
import Logo from '../../Images/coub-logo.png';

const CreateCoub = () => {

    const [ video, setVideo ] = useState({});
    const [ videoURL, setVideoURL] = useState('');
    const [ videoStart, setVideoStart ] = useState('');
    const [ videoDuration, setVideoDuration ] = useState('');
    
    const [ audio, setAudio ] = useState({});
    const [ audioStart, setAudioStart ] = useState('');
    const [ audioDuration, setAudioDuration ] = useState('');

    const extractAllFrames = async (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("video", video);
        formData.append("videoStart", videoStart);
        formData.append("videoDuration", videoDuration);
        
        formData.append("audio", audio);
        formData.append("audioStart", audioStart);
        formData.append("audioDuration", audioDuration);

        const request = await axios.post("/api/trim" , formData, {     
            headers: { 'content-type': 'multipart/form-data' }
        })
        
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
                            onChange = {(e) => setVideoStart(e.target.value)}
                        />
                        <input 
                            type = "number" 
                            placeholder = "Duration in seconds" 
                            onChange = {(e) => setVideoDuration(e.target.value)}
                        />
                        <input
                            type = "file"
                            onChange = { (e) => setAudio(e.target.files[0])}
                        />
                        <input 
                            type = "number" 
                            placeholder = "Start Time in seconds" 
                            onChange = {(e) => setAudioStart(e.target.value)}
                        />
                        <input 
                            type = "number" 
                            placeholder = "Duration in seconds" 
                            onChange = {(e) => setAudioDuration(e.target.value)}
                        />
                        <button>Go</button>

                    </Fragment>    
                }
                
            </form>
            
        </div>
    )
}

export default CreateCoub
