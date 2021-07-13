import './Joblist.scss';
import React, { Component, useState, useEffect } from 'react';
import VannessLogo from '../img/vanness_logo.jpg'
import { getCurrentJob } from '../util/APIUtils';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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

export function Joblist (props) {
    const [jobs, setJobs] = useState([]);
    const [state, setState] = useState({});
    
    useEffect(() => {
        getCurrentJob().then(data => setJobs(data));
    },[]);
    
    return (
        <div className="job-wrapper">
            
                {jobs.map((d) => {
                return <div className="job-box-container" key={d.id}>
                    <div className="logo">
                        <img src = {VannessLogo}/>
                    </div>
                    <div className="left-content">
                        <b>Job Title</b>
                        <b>Comapny name:</b>{d.business_name}
                        <div className="detail">
                            <span>&nbsp;•&nbsp;</span>
                            <span> Position: </span>{d.avaliable_position}<br/>
                            <span>&nbsp;•&nbsp;</span>
                            <span> Available: </span>{d.Amount == 1 ? (
                                    d.Amount + ' position'
                            ):(d.Amount +  ' position(s)' )}<br/>
                            <span>&nbsp;•&nbsp;</span>
                            <span> Allowance: </span>{d.benefit}฿/day
                        </div>
                    </div>
                    <div className="right-content">
                        <button>view this job</button>
                        <button>add to favourite</button>
                    </div>
                </div>
                })} 
                <div className="search-box"></div>
                {/* {this.props.dataList.length === 0 && <span>No records found to display!</span>} */}
        </div>
    )
}

export default Joblist;

