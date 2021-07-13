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

export function Joblist ({
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
        getCurrentJob().then(data => setJobs(data));
    },[]);
      
    return (
        <div className="Box">
            
            <Card className="root">
                <CardContent>
                    {/* <Typography className="title" color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography variant="h5" component="h2">
                        Search Job
                    </Typography>
                    
                    <FormControl component="fieldset">
                        {/* <FormLabel component="legend">Label Placement</FormLabel> */}
                        <FormGroup aria-label="position" row>
                            {/* <FormControlLabel
                                value="top"
                                control={<Checkbox color="primary" />}
                                label="Top"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox color="primary" />}
                                label="Start"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox color="primary" />}
                                label="Bottom"
                                labelPlacement="bottom"
                            /> */}
                            <FormControlLabel
                                value="Internship"
                                control={<Checkbox color="primary" />}
                                label="Internship"
                                labelPlacement="Internship"
                            />
                            <FormControlLabel
                                value="Part_time"
                                control={<Checkbox color="primary" />}
                                label="Part-Time"
                                labelPlacement="Part-Time"
                            />
                            <FormControlLabel
                                value="Full_time"
                                control={<Checkbox color="primary" />}
                                label="Full-Time"
                                labelPlacement="Full-Time"
                            />
                        </FormGroup>
                    </FormControl>
                    <Typography className="pso" color="textSecondary">
                        adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button size="small">Search</Button>
                    <Button size="small">Clear Search</Button>
                </CardActions>
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
                {jobs.length === 0 && <span>No records found to display!</span>}
             </Card>
            {/* <div className="box-container">
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
                    <b> Allowance: </b>{d.benefit}฿/day<br/> }
                </div>
                })} 
                <div className="search-box"></div>
                
            </div> */}
        </div>
    )
}

export default Joblist;

