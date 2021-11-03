import React, { useState, useEffect } from 'react';
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
import { getCompanyJobs } from '../../api/CompanyAPI';
import { Redirect, useHistory } from "react-router-dom";

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    wrapper: {
        margin: '50px',
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


export default function CompanyDashBoard(props) {
    const classes = useStyles();

    const roles = props.roles.map(r => r.name);

    const history = useHistory();

    const [value, onChange] = useState(new Date());
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [countJob, setCountJob] = useState(0);
    const [loading, setLoading] = useState(true);
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

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

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCompanyJobs();
            const count = Object.keys(result).length
            setCountJob(count);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (roles.includes('ROLE_CANDIDATE')) {
        console.log(roles)
        return <Redirect
            to={{
                pathname: "/user/dashboard",
                state: { from: props.location }
            }} />;
    }



    return (
        <div className={classes.root}>
            <Grid container spacing={2} justifyContent='center' className={classes.wrapper}>
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
                                                {countJob}
                                            </Typography>
                                            <Typography variant="subtitle2" color={purple[100]}>
                                                POSTED JOB
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper className={classes.statusPaper}>
                                            <Typography variant="h5" component="div" color="textPrimary">
                                                3
                                            </Typography>
                                            <Typography variant="subtitle2" color={purple[100]}>
                                                VIEW FAVORITE CANDIDATE
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper className={classes.statusPaper}>
                                            <Typography variant="h5" component="div" color="textPrimary">
                                                2
                                            </Typography>
                                            <Typography variant="subtitle2" color={purple[100]}>
                                                VIEWD COMPANY
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Grid item xs={3}>
                                    <Paper className={classes.profileStatusPaper}>
                                        Company completion
                                        <Box position="relative">
                                            <CircularProgress variant="determinate" value={43} size={150} style={{ 'color': amber[500] }} />
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
                                                    43%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>


                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div >
    );
}
