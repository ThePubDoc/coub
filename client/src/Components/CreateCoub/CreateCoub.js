import React, { useState, useContext, useEffect } from 'react'
import ReactPlayer from 'react-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import axios from 'axios';

import SideNavContext from '../../Context/SideNavContext';

import './CreateCoub.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const CreateCoub = () => {

    const { sideNav, setSideNav } = useContext(SideNavContext);

    const [ video, setVideo ] = useState({});
    const [ videoURL, setVideoURL ] = useState('');
    const [ videoStart, setVideoStart ] = useState('');
    const [ videoDuration, setVideoDuration ] = useState('');
    
    const [ audio, setAudio ] = useState({});
    const [ audioURL, setAudioURL ] = useState('');
    const [ audioStart, setAudioStart ] = useState('');
    const [ audioDuration, setAudioDuration ] = useState('');

    useEffect(() => {
        setSideNav(false)
    },[])

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
        
            <form
                className = "form" 
                onSubmit = { (e) => extractAllFrames(e) }
            >

                { !videoURL &&
                    
                    <label htmlFor = "upload-video-input">
                        <div className = "upload upload-video">
                            <FontAwesomeIcon icon = { faArrowUp }/>
                            <h1>Upload a video</h1>
                            <p>Upload and trim your video. Max: 400 MB and 20 min. Coub supports most video formats.</p>
                        </div>
                    </label>
                
                }
                
                <input 
                    id = "upload-video-input"
                    type = "file" 
                    style = {{display : "none"}}
                    onChange = { (e) => { 
                        setVideo(e.target.files[0]); 
                        setVideoURL(URL.createObjectURL(e.target.files[0]))
                    }
                }/>
                
                { videoURL &&
                    <>
                        
                        <ReactPlayer className = "video-player"
                            url = { videoURL } 
                            playing = { true } 
                            controls = { true }
                            
                        />

                        <div className = "time">
                            <label>
                                <p>Video Start Time (in seconds)</p>
                            </label>
                            <input 
                                type = "number" 
                                placeholder = "Start Time in seconds" 
                                onChange = {(e) => setVideoStart(e.target.value)}
                            />

                            <label>
                                <p>Video Duration (in seconds)</p>
                            </label>
                            <input 
                                type = "number" 
                                placeholder = "Duration in seconds" 
                                onChange = {(e) => setVideoDuration(e.target.value)}
                            />

                        </div>

                        { !audioURL &&
                            <label htmlFor = "upload-audio-input">
                                <div className = "upload upload-audio">
                                    <FontAwesomeIcon icon = { faArrowUp }/>
                                    <h1>Upload a audio</h1>
                                    <p>Add muisc or audio to your coub.</p>
                                </div>
                            </label>
                        }
                        
                        { audioURL &&
                            <>
                                <AudioPlayer className = "audio-player"
                                    src = { audioURL }
                                />

                                <div className = "time">
                                    <label>
                                        <p>Audio Start Time (in seconds)</p>
                                    </label>
                                    <input 
                                        type = "number" 
                                        placeholder = "Start Time in seconds" 
                                        onChange = {(e) => setAudioStart(e.target.value)}
                                    />

                                    <label>
                                        <p>Video Duration (in seconds)</p>
                                    </label>
                                    <input 
                                        type = "number" 
                                        placeholder = "Duration in seconds" 
                                        onChange = {(e) => setAudioDuration(e.target.value)}
                                    />
                                </div>
                            </>
                        }
                        
                        <input
                            type = "file"
                            id = "upload-audio-input"
                            onChange = { (e) => {
                                setAudio(e.target.files[0])
                                setAudioURL(URL.createObjectURL(e.target.files[0]))
                            }}
                            style = {{display : "none"}}
                        />
                        
                        <button>Create</button>

                    </>    
                }
                
            </form>
            
        </div>
    )
}

export default CreateCoub
