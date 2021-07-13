import '../Job/Joblist.scss';
import { Container} from '../globalStyles';
import React, { Component, useState, useEffect } from 'react';
import VannessLogo from '../img/vanness_logo.jpg'
import { getRecommedJob } from '../util/APIUtils';
import {
    InfoSec,
    InfoRow,
    InfoColumn,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img
  } from '../components/InfoSection/InfoSection.elements';

export function RecommendBar ({
    primary,
    lightBg,
    topLine,
    lightTopLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart,
    start
  }) {
    const [jobs, setJobs] = useState([]);
    const [state, setState] = useState({});
    
    useEffect(() => {
        getRecommedJob().then(data => setJobs(data));
    },[]);
      
    return (
        <div className="Box">
            
            
            <div className="box-container">
                <Container>
                    <Heading lightText={lightText}>Recommend</Heading>
                </Container>
                {jobs.map((d) => {
                return <div className="box" key={d.id}>
                    <img src = {VannessLogo}/><br/>
                    <em>{d.title}</em><br/>
                    <b>Comapny name:</b>{d.business_name}<br/>
                    <b> Position: </b>{d.avaliable_position}<br/>
                    {/* 
                    <em>{d.Title}</em><br/>
                    <b>Comapny name:</b>{d.business_name}<br/>
                    <b> Position: </b>{d.title}<br/>
                    <b> Available: </b>{d.Amount == 1 ? (
                            d.Amount + ' position'
                    ):(d.Amount +  ' position(s)' )}<br/>
                    <b> Allowance: </b>{d.benefit}฿/day<br/> */}
                    <button className="btn" big fontBig primary={primary}>
                        View
                    </button>
                </div>
                })} 
                <div className="search-box"></div>
            </div>
            
        </div>
    )
}

export default RecommendBar;
