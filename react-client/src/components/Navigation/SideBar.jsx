import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
import { Grid, Paper, Box, Avatar, Collapse } from '@material-ui/core';
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider, useTheme } from "@material-ui/core/styles";
import ProfilePic from '../../images/default-job-logo.png'
import { purple, grey } from '@material-ui/core/colors';
import MuiListItem from "@material-ui/core/ListItem";
import { BrowserRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import CandidateDashBoard from '../Candidate/CandidateDashboard';
import Resume from '../Candidate/Resume';
import { useUtils } from '@material-ui/pickers';
import { SelectAll, SelectAllOutlined } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';


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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: purple[50],
            color: purple[300],
            "& .MuiListItemIcon-root": {
                color: purple[400]
            }
        },
        "&$selected:hover": {
            backgroundColor: purple[200],
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&:hover": {
            backgroundColor: purple[100],
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        }
    },
    selected: {}
})(MuiListItem);

export default function SideBar(props) {
    const classes = useStyles();

    const history = useHistory();

    const [open, setOpen] = useState(true);
    const select = props.select;
    const roles = props.roles;

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Paper className={classes.paper}>
                    <Grid container justify="center" alignItems="center">
                        <Avatar
                            className={classes.profileAvatar}
                            alt=""
                            src={ProfilePic}
                        ></Avatar>
                    </Grid>
                    Welcome
                </Paper>
                <Divider />

                {roles.includes('ROLE_CANDIDATE') && (
                    <List>
                        <ListItem button
                            selected={select === 0}
                            onClick={() => history.push('/user/dashboard')}>
                            <ListItemIcon>
                                <DashboardRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItem>
                        <ListItem button
                            onClick={handleClick}
                        >
                            <ListItemIcon>
                                <AccountCircleRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"My Profile"} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>

                            <ListItem button
                                className={classes.nested}
                                selected={select === 1}
                                onClick={() => history.push('/user/profile/edit')}>
                                <ListItemIcon>
                                    <ContactsRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Basic Information"} />
                            </ListItem>

                            <ListItem button
                                className={classes.nested}
                                selected={select === 2}
                                onClick={() => history.push('/resume')}>
                                <ListItemIcon>
                                    <ListAltRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"My Resume"} />
                            </ListItem>
                        </Collapse>

                        <ListItem button
                            selected={select === 3}
                            onClick={() => history.push('/user/job-history')}>
                            <ListItemIcon>
                                <WorkRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"My Applied Job"} />
                        </ListItem>
                        <ListItem button
                            selected={select === 4}
                            onClick={() => history.push('/favorite-job')}>
                            <ListItemIcon>
                                <FavoriteRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"My Favorite Jobs"} />
                        </ListItem>
                        <ListItem button
                            selected={select === 5}
                            onClick={() => history.push('/account-setting')}>
                            <ListItemIcon>
                                <SettingsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Account Settings"} />
                        </ListItem>

                    </List>
                )}

                {roles.includes('ROLE_COMPANY') && (
                    <List>
                        <ListItem button
                            selected={select === 0}
                            onClick={() => history.push('/company-dashboard')}>
                            <ListItemIcon>
                                <DashboardRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItem>
                        <ListItem button
                            selected={select === 1}
                            onClick={() => history.push('/user/company/edit')}>
                            <ListItemIcon>
                                <AccountCircleRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"My Company"} />
                        </ListItem>


                        <ListItem button
                            selected={select === 2}
                            onClick={handleClick}>
                            <ListItemIcon>
                                <ListAltRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Job Management"} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <ListItem button
                                className={classes.nested}
                                selected={select === 3}
                                onClick={() => history.push('/user/company/create-job')}>
                                <ListItemIcon>
                                    <NoteAddRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Post New Job"} />
                            </ListItem>
                            <ListItem button
                                className={classes.nested}
                                selected={select === 4}
                                onClick={() => history.push('/jobposted')}>
                                <ListItemIcon>
                                    <WorkRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"My Jobs"} />
                            </ListItem>

                        </Collapse>

                        <ListItem button
                            selected={select === 5}
                            onClick={() => history.push('/account-setting')}>
                            <ListItemIcon>
                                <SettingsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Account Settings"} />
                        </ListItem>

                    </List>
                )}
            </Paper>

            {/* <Grid item xs={9} >
                            <Paper className={classes.paper}>
                                content available soon
                            </Paper>
                        </Grid> */}


        </div>
    );
}
