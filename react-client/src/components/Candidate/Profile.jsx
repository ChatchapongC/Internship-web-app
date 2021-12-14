import React, { useState, useEffect, useRef } from 'react';
import JobPostedList from '../Company/JobPostedList';
import profileLogo from '../../img/profile-logo.png';
import './profile.scss';
import { Divider, Grid, Paper, Typography, Button } from '@material-ui/core';
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider, useTheme } from "@material-ui/core/styles";
import ProfilePic from '../../images/default-job-logo.png';
import { purple, grey, red } from '@material-ui/core/colors';
import Calendar from 'react-calendar';
import { makeStyles } from '@material-ui/core/styles';;
import Alert from "react-s-alert";
import SideBar from '../Navigation/SideBar';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { getJobApplyStatus, getResumeById } from '../../api/CandidateAPI';
import { Skeleton } from '@material-ui/lab';
import Moment from 'moment';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { Tooltip, Collapse, IconButton } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineOppositeContent, TimelineContent, TimelineDot } from '@mui/lab';
import jsPDF from "jspdf";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import { generateDocument } from '../Candidate/ResumeDocx.jsx';
import { Packer } from 'docx';
import { useParams } from 'react-router-dom';
import { updateDecline, updatePass, updateViewd } from '../../api/CompanyAPI';
import Chip from '@mui/material/Chip';

const drawerWidth = 240;
Moment.locale('th');

function ViewProfile(props) {

    const cid = props.match.params.cid;
   
    // const jobId = props.match.params.jid;

    // const  { cid } = useParams();
  
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        buttonbase: {
            margin: theme.spacing(1),
            width: "20%",
        },
        wrapper: {
            width: '100%',
            marginTop: 50
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            width: '100%'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        profileAvatar: {
            margin: 10,
            width: 150,
            height: 150
        },
        statusPaper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            width: '100%',
            hight: '100%',
            color: purple[600]
        },
        profileStatusPaper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            marginTop: 50,
            width: 400,
            hight: 500,
            color: purple[600]
        },
        applicationStatusPaper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            marginTop: 50,
            width: 800,
            hight: 500,
            color: purple[600]
        },
        content: {
            padding: theme.spacing(1),
            margin: 5
        },
        divider: {
            background: purple[300],
        }
    }));


    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const [resume, setResume] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [buttonStatus, setButton] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const inputRef = useRef(null);

    const printDocument = () => {
        let domElement = document.getElementById('myPage');
        htmlToImage.toPng(domElement)
            .then(function (dataUrl) {
                console.log(dataUrl);
                const pdf = new jsPDF();
                pdf.addImage(dataUrl, 'PNG', 0, 0);
                pdf.save("resume.pdf");
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };

    const generateDocx = (props, resume) => {
        generateDocument(props, resume);
    }

    const fetchResumeById = async () => {
        const result = await getResumeById(cid);
        setResume(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchResumeById(cid);
        return () => {
            setResume([]);
          };
    }, [cid]);

    console.log(resume)

    return (
        <Grid container spacing={2} justifyContent='center' className={classes.wrapper}>
            {loading ? (
                <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="rect" height={118} />
                </div>
            ) : (
                <Grid item xs={8} justifyContent='center'>

                    <div id="myPage">
                        <Paper className={classes.paper}>
                            <Typography variant="h3" component="div" color="textPrimary">
                                {resume.firstName} {resume.lastName}&nbsp;
                                {status === 'pass' &&(
                                    <Chip label=" Accepted" color="success" />
                                )}
                                {status === 'decline' &&(
                                    <Chip label=" Declined" color="primary" style={{backgroundColor:red[600]}} />
                                )}   
                            </Typography>
                            
                            <Typography variant="subtitle1" component="div" color="textPrimary">
                                {resume.positionTitle}
                            </Typography>
                            <Divider variant="middle" classes={{ root: classes.divider }} />
                            <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                                PROFILE
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                {resume.shortDescription}
                            </Typography>
                            <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                                EDUCATION
                            </Typography>
                            <>
                                <Timeline>
                                    {[...resume.educations].sort((a, b) => a.id < b.id ? 1 : -1).map((e, index) => {
                                        return (
                                            <>
                                                <TimelineItem>
                                                    <TimelineOppositeContent style={{ flex: 0.4 }}>
                                                        <Typography key={index} variant='body2' color='textSecondary'>

                                                            {Moment(e.fromDate).format('MMMM DD,yyyy')} - {Moment(e.toDate).format('MMMM DD,yyyy')}
                                                        </Typography>
                                                    </TimelineOppositeContent>
                                                    <TimelineSeparator>
                                                        <TimelineDot />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        {e.institute}
                                                        <Typography variant='body2' color='textSecondary'>
                                                            {e.curriculum} - GPA : {e.gpa}
                                                        </Typography>
                                                        <Typography variant='body2' color='textSecondary'>
                                                            {e.description}
                                                        </Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            </>
                                        )
                                    })}
                                </Timeline>
                            </>
                            <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                                SKILLS
                            </Typography>
                            <Typography>
                                <>
                                    {resume.skills.map((s, index) => {
                                        return (

                                            <Typography key={index} component='li' variant="subtitle2" >
                                                {s.skillName}
                                            </Typography>
                                        )
                                    })}
                                </>
                            </Typography>
                            <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                                EXPERIENCE
                            </Typography>
                            <Typography>
                                <>
                                    {resume.experiences.map((e, index) => {
                                        return (

                                            <Typography key={index} component='li' variant="subtitle2" >
                                                {Moment(e.fromDate).format('MMMM DD,yyyy')} - {Moment(e.toDate).format('MMMM DD,yyyy')}:{e.companyName}
                                            </Typography>

                                        )
                                    })}
                                </>
                            </Typography>

                            <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                                LANGUAGE
                            </Typography>
                            <Typography>
                                <>
                                    {resume.languages.map((e, index) => {
                                        return (

                                            <Typography key={index} component='li' variant="subtitle2" >
                                                {e.languageName}:{e.level}
                                            </Typography>
                                        )
                                    })}
                                </>
                            </Typography>
                        </Paper>
                    </div>

                    <Button
                        size="large"
                        className={classes.buttonbase}
                        variant="contained"
                        color="primary"
                        disabled = {buttonStatus}
                        //startIcon={<PrintRoundedIcon />}
                        onClick={() => handleUpdatePass()}
                       

                    >
                        ACCEPT THIS CANDIDATE
                    </Button>
                    <Button
                        size="large"
                        className={classes.buttonbase}
                        variant="contained"
                        color="primary"
                        disabled = {buttonStatus}
                        // startIcon={<PrintRoundedIcon />}
                        onClick={() => handleUpdateDecline()}

                    >
                        DECLINE THS CANDIDATE
                    </Button>

                    <Button
                        size="large"
                        className={classes.buttonbase}
                        variant="contained"
                        color="primary"
                        startIcon={<PrintRoundedIcon />}
                        onClick={() => printDocument()}

                    >
                        .PDF
                    </Button>
                    
                    <Button
                            size="large"
                            className={classes.buttonbase}
                            variant="contained"
                            color="primary"
                            startIcon={<PrintRoundedIcon />}
                            onClick={() => generateDocx(props, resume)}

                        >
                            .DOCX
                        </Button>
                </Grid>
            )}
        </Grid >
    );
}

export default ViewProfile;