import './Joblist.scss';
import React, { Component, useState, useEffect } from 'react';
import VannessLogo from '../img/vanness_logo.jpg'
import { getCurrentJob } from '../util/APIUtils';

export function Joblist () {
    const [jobs, setJobs] = useState([]);
    const [state, setState] = useState({});
    
    useEffect(() => {
        getCurrentJob().then(data => setJobs(data));
    },[]);
      
    return (
        <div className="Box">
            <div className="box-container">
                {jobs.map((d) => {
                return <div className="box" key={d.id}>
                    <em>{d.title}</em><br/>
                    <b>Comapny name:</b>{d.business_name}<br/>
                    <b> Position: </b>{d.avaliable_position}<br/>
                    {/* <img src = {d.logo}/>
                    <em>{d.Title}</em><br/>
                    <b>Comapny name:</b>{d.business_name}<br/>
                    <b> Position: </b>{d.title}<br/>
                    <b> Available: </b>{d.Amount == 1 ? (
                            d.Amount + ' position'
                    ):(d.Amount +  ' position(s)' )}<br/>
                    <b> Allowance: </b>{d.benefit}฿/day<br/> */}
                </div>
                })} 
                <div className="search-box"></div>
                {/* {this.props.dataList.length === 0 && <span>No records found to display!</span>} */}
            </div>
        </div>
    )
}

export default Joblist;

