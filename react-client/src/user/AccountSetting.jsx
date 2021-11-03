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
import { Grid, Paper, TextField, FormControl, Button, withStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider, useTheme } from "@material-ui/core/styles";
import { purple } from '@material-ui/core/colors';
import SideBar from '../components/Navigation/SideBar'
import { getCurrentUser, updateAccount } from '../api/UserAPI';
import LoadingIndicator from '../common/LoadingIndicator';
import Alert from "react-s-alert";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router';
import { useForm, Form } from '../components/Form/useForm';

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
    textBox: {
        margin: theme.spacing(2),
        width: "40%"
    },
}));




export default function AccountSetting(props) {
    const user = props.currentUser;
    const [accountDetail, setAccountDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    const accountRequest = {
        newEmail: user.email,
        oldPassword: '',
        newPassword: ''

    };

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('newEmail' in fieldValues)
            accountRequest.newEmail = (/$^|.+@.+..+/).test(fieldValues.newEmail) ? "" : "Email is not valid."
        setErrors({
            ...accountRequest
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(accountRequest, false, validate);


    const roles = props.roles.map(r => r.name);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCurrentUser();
            setAccountDetail(result);
            setLoading(false);
        }
        fetchData();
    }, []);


    const handleSubmit = e => {
        e.preventDefault()

        updateAccount(accountRequest)
            .then(response => {
                resetForm()
                Alert.success("You're successfully update your profile");
                window.location.reload();

            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });

    }

    console.log()

    return (
        <>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className={classes.root}>
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent='center' className={classes.wrapper}>
                            <Grid item xs={9}>


                                <Grid
                                    container
                                    spacing={3}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Grid item xs={3} >
                                        <SideBar select={5} roles={roles} />
                                    </Grid>
                                    <Grid item xs={9} >

                                        <Paper className={classes.paper}>
                                            <Grid container spacing={0}>
                                                <Typography gutterBottom variant="h6" component="h2">
                                                    <b>Account Setting</b>
                                                </Typography>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={0} className={classes.content}>
                                                <Grid item xs={6} >

                                                    <FormControl required>
                                                        <Typography gutterBottom variant="subtitle2">
                                                            <b>Change Email</b>
                                                        </Typography>
                                                        <TextField
                                                            id="newEmail"
                                                            name="newEmail"
                                                            label="Email"
                                                            helperText="Change email of this account"
                                                            variant="outlined"
                                                            type="email"
                                                            defaultValue={accountDetail.email}
                                                            value={values.email}
                                                            onChange={handleInputChange}
                                                            error={errors.newEmail}
                                                            required
                                                        />
                                                    </FormControl>

                                                </Grid>
                                                <Grid item xs={6}>

                                                    <FormControl required >
                                                        <Typography gutterBottom variant="subtitle2">
                                                            <b>Change Password</b>
                                                        </Typography>
                                                        <TextField
                                                            id="oldPassword"
                                                            name="oldPassword"
                                                            label="Old Password"
                                                            variant="outlined"
                                                            onChange={handleInputChange}
                                                            type="password"
                                                        />
                                                        <br />

                                                        <TextField
                                                            id="newPassword"
                                                            name="newPassword"
                                                            label="New Password"
                                                            variant="outlined"
                                                            onChange={handleInputChange}
                                                            type="password"
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container justifyContent='center' spacing={0} className={classes.content}>
                                                <Button
                                                    size="large"
                                                    className={classes.buttonbase}
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<CloudUploadIcon />}
                                                    type='submit'
                                                >
                                                    SAVE
                                                </Button>

                                            </Grid>
                                            <br />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </div >
            )}
        </>
    );
}
