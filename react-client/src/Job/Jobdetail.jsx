import './Jobdetail.scss';
import React, { Component, useState, useEffect } from 'react';
import VannessLogo from '../img/vanness_logo.jpg'
import { getJobDetail } from '../util/APIUtils';

const Jobdetail = () =>{

    const [jobsDetail, setjobsDetail] = useState([]);
    const [state, setState] = useState({});
    const id = "21";
    
    useEffect(() => {
        getJobDetail(id).then(data => setjobsDetail(data));
        
        console.log(jobsDetail);
    },[]);

    console.log(jobsDetail);
    return(
        <div>
            <div className="Box">
                <div className="Box-header">
                    <div>

                    </div>
                    <img src = {VannessLogo}/><br/>
                    <div>
                        <h1>{jobsDetail.title}</h1>
                        <h3>{jobsDetail.jobtype}</h3>
                        <h3>{jobsDetail.location}</h3>
                        <h3>Upload Date: {jobsDetail.upload_date}</h3>
                    </div>
                </div>
            
                
            </div>

            <div className="Box">
                <h1>Job Detail</h1>
                <br></br>
                <div className="Box-detail">
                    <div className="col">
                        <p>{jobsDetail.business_name}</p>
                    </div>
                    <div className="col">
                        <p>{jobsDetail.avaliable_position}</p>
                    </div>
                    <div className="col">
                        <p>{jobsDetail.tags}</p>
                    </div>
                    
            
                    
                   
                    <p>{jobsDetail.benefit}</p>
                </div>
                {/* List requirement */}
                {/* <ul>
                    {jobsDetail.job_requirement.map((job) => {
                    return <li key={job.id}>{job}</li>
                    })}
                </ul> */}
            </div>

            <div className="Box">
                <h1>Job Description</h1>
                <div className="Box-description">

                    <div className="col2">
                        <h3><b>Position:</b>{" "}{jobsDetail.avaliable_position}</h3>
                    </div>
                    
                    <div className="col2">
                        <h3>{jobsDetail.business_name}</h3>
                    </div>
                    
                    <div className="col2">
                        <p>{jobsDetail.tags}</p>
                    </div>
                    <p>{jobsDetail.benefit}</p>
                </div>
            </div>
        </div>
    )

}
export default Jobdetail;