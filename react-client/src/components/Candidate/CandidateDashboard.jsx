import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { Grid, Paper, Box, Avatar, CardMedia, Card, CircularProgress, Stepper, withStyles, StepConnector, Step, StepLabel } from '@material-ui/core';
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider, useTheme } from "@material-ui/core/styles";
import ProfilePic from '../../images/default-job-logo.png'
import { purple, amber } from '@material-ui/core/colors';
import SideBar from '../Navigation/SideBar'
import Calendar from 'react-calendar';
import { getFavoriteJob, getJobHistory, getResume, getViewResumeCount } from '../../api/CandidateAPI';
import { Skeleton } from '@mui/material';
import { Redirect, useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    wrapper: {
        marginTop: theme.spacing(15),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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


}));

function getSteps() {
    return ['Applied job', 'Viewd Your Resume', 'Contact you back via email'];
}


export default function CandidateDashBoard(props) {
    const classes = useStyles();

    const roles = props.roles.map(r => r.name);

    const [value, onChange] = useState(new Date());
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [applyJobCount, setApplyJobCount] = useState(0);
    const [favoriteJobCount, setFavoriteJobCount] = useState(0);
    const [viewResumeCount, setViewResumeCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const steps = getSteps();
    const [resumeCompleteness, setResumeCompleteness] = useState(0);

    const [resume, setResume] = useState({
        firstName: null,
        lastName: null,
        shortDescription: null,
        positionTitle: null,
        educations: [],
        experiences: [],
        languages: [],
        skills: [],
      });

    const isStepOptional = (step) => {
        return step === 1;
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getJobHistory();
            const resultFav = await getFavoriteJob();
            const viewResumeCount = await getViewResumeCount();
            const favCount = Object.keys(resultFav).length
            const count = Object.keys(result).length
            setApplyJobCount(count);
            setViewResumeCount(viewResumeCount);
            setFavoriteJobCount(favCount);
            
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect( () => {
        const fetchData = async () => {
          const res = await getResume();
          setResume(res);
          setLoading(false);
        };
        if(roles.includes('ROLE_CANDIDATE')){
          fetchData();
        }
    },[])

    useEffect(() => {
        const countCompleteness = async () => {
            if ( resume.firstName != null) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
    
            } else if(resume.lastName != null) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
    
            } else if ( resume.shortDescription != null) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
    
            } else if (resume.positionTitle != null) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
    
            } else if (resume.skills.length != 0) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
    
            } else if (resume.educations.length != 0) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
    
            } else if (resume.experiences.length != 0) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
    
            } else if (resume.languages.length != 0) {
                setResumeCompleteness(resumeCompleteness => resumeCompleteness + 12.5)
            }
        };

        countCompleteness();

      }, []);

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };



    if (roles.includes('ROLE_COMPANY')) {
        console.log(roles)
        return <Redirect
            to={{
                pathname: "/company-dashboard",
                state: { from: props.location }
            }} />;
    }

    if (loading) {
        return (
            <div>
                <Skeleton variant="text" />
                <Skeleton variant="rect" height={118} />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container justifyContent='center' className={classes.wrapper}>
                <Grid item xs={9}>
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                    >
                        <Grid item xs={3} justifyContent='flex-start'>
                            <SideBar select={0} roles={roles} />
                        </Grid>


                        <Grid item xs={9} justifyContent='flex-end'>
                            <Paper className={classes.paper}>

                                <Grid container spacing={10} justifyContent='center'>
                                    <Grid item xs={3} >
                                        <Paper className={classes.statusPaper}>
                                            <Typography variant="h5" component="div" color="textPrimary">
                                                {applyJobCount}
                                            </Typography>
                                            <Typography variant="subtitle2" color={purple[100]}>
                                                APPLIED JOB
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper className={classes.statusPaper}>
                                            <Typography variant="h5" component="div" color="textPrimary">
                                                {favoriteJobCount}
                                            </Typography>
                                            <Typography variant="subtitle2" color={purple[100]}>
                                                FAVORITE JOB
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper className={classes.statusPaper}>
                                            <Typography variant="h5" component="div" color="textPrimary">
                                                {viewResumeCount}
                                            </Typography>
                                            <Typography variant="subtitle2" color={purple[100]}>
                                                VIEWD RESUME
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Grid item xs={3}>
                                    <Paper className={classes.profileStatusPaper}>
                                        Resume completion
                                        <Box position="relative">
                                            <CircularProgress variant="determinate" value={resumeCompleteness} size={150} style={{ 'color': amber[500] }} />
                                            <Box
                                                top={0}
                                                left={0}
                                                bottom={0}
                                                right={0}
                                                position="absolute"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography variant="h6" component="div" color="textSecondary">
                                                    {resumeCompleteness}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>

                                {/* <Grid item xs={3}>
                                    <Paper className={classes.applicationStatusPaper}>
                                        Application status
                                        Job1:
                                        <Stepper activeStep={activeStep}>

                                            {steps.map((label, index) => {
                                                const stepProps = {};
                                                const labelProps = {};
                                                if (isStepOptional(index)) {
                                                    labelProps.optional = <Typography variant="caption"></Typography>;
                                                }
                                                if (isStepSkipped(index)) {
                                                    stepProps.completed = false;
                                                }
                                                return (
                                                    <Step key={label} {...stepProps}>
                                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>

                                    </Paper>
                                </Grid> */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div >
    );
}
