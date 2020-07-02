import React, { useState, useContext, useEffect } from 'react'
import ReactPlayer from 'react-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Tags from "@yaireo/tagify/dist/react.tagify"

import axios from 'axios';

//context imports
import SideNavContext from '../../Context/SideNavContext';
import UserContext from '../../Context/UserContext';
import OverlayContext from '../../Context/OverlayContext';

//css imports
import './CreateCoub.css';

//icons imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faTag, faCross } from '@fortawesome/free-solid-svg-icons';


const CreateCoub = () => {

    const { setSideNav } = useContext(SideNavContext);
    const { user } = useContext(UserContext);
    const { setOverlay } = useContext(OverlayContext);

    const [ video, setVideo ] = useState({});
    const [ videoURL, setVideoURL ] = useState('');
    const [ videoStart, setVideoStart ] = useState('');
    const [ videoDuration, setVideoDuration ] = useState('');
    
    const [ audio, setAudio ] = useState({});
    const [ audioURL, setAudioURL ] = useState('');
    const [ audioStart, setAudioStart ] = useState('');
    const [ audioDuration, setAudioDuration ] = useState('');

    const [ nextStep, setNextStep ] = useState(false);
    const [ caption, setCaption ] = useState('');
    const [ tags, setTags ] = useState([])
    useEffect(() => {
        setSideNav(false)
    },[])

    const extractAllFrames = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem("auth-token");

        let formData = new FormData();

        formData.append("video", video);
        formData.append("videoStart", videoStart);
        formData.append("videoDuration", videoDuration);
        
        formData.append("audio", audio);
        formData.append("audioStart", audioStart);
        formData.append("audioDuration", audioDuration);

        formData.append("caption", caption);
        formData.append("tags",tags);

        console.log(formData)
        const request = await axios.post("/api/trim" , formData, {     
            headers: { 
                'content-type': 'multipart/form-data',
                "x-auth-token" : token 
            }
        })
        
        setVideoURL(request.data.url)
    }

    const uploadVideo = (e) => {
        e.preventDefault();
        if(user.userData){
            setVideo(e.target.files[0]); 
            setVideoURL(URL.createObjectURL(e.target.files[0]))
        }
        else {
            setOverlay("login");
        }
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
                    onChange = { (e) => uploadVideo(e) }
                />
                
                { videoURL &&
                    <>
                        
                        <div className = "player-container">
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
                            <div className = "player-container">
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
                            </div>
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
                        
                        <p 
                            className = "next-btn"
                            onClick = { (e) => {
                                e.preventDefault()
                                setNextStep(!nextStep)
                            }}
                        >Next
                        </p>
                        
                        { nextStep &&
                            <div className = "create-coub-overlay-hero">
                                <FontAwesomeIcon className = "close" icon = { faCross } onClick = { (e) => setNextStep(false)}/>
                                <div className = "create-coub-overlay">
                                    <h1>Describe your coub</h1>
                                    
                                    <div className = "inputs">
                                        <input
                                            type = "text"
                                            onChange = { (e) => setCaption(e.target.value)}
                                            placeholder = "Caption"
                                        />
                                        <div className = "tags">
                                            <FontAwesomeIcon icon = { faTag }/>
                                            <Tags
                                                onChange = {(e) => {
                                                    let tagify = JSON.parse(e.target.value);
                                                    setTags([]);
                                                    tagify.map((tag) => {
                                                        setTags(tags => [...tags,tag.value])
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <button>Create</button>
                                </div>
                            </div>
                        }
                        

                    </>    
                }
                
            </form>
            
        </div>
    )
}

export default CreateCoub
