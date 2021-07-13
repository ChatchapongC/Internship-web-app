import './Joblist.scss';
import React, { Component, useState, useEffect } from 'react';
import VannessLogo from '../img/vanness_logo.jpg'
import { getCurrentJob } from '../util/APIUtils';

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

