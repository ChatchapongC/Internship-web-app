import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import dateFormat from "dateformat";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import DeleteIcon from '@material-ui/icons/Delete';
import { updateProfile, getProfile } from "../../api/CandidateAPI";
import NationalityData from '../../data/NationalityData.json';
import Alert from "react-s-alert";
import LoadingIndicator from "../../common/LoadingIndicator";
import { InputLabel, Grid, Typography, Paper, Breadcrumbs, Select, Button, Input } from "@material-ui/core";
import SideBar from "../Navigation/SideBar";
import { Skeleton } from "@mui/material";

const EditProfile = (props) => {

    const roles = props.roles.map(r => r.name);
    const user = props.currentUser.candidate;
    const [mobileError, setMobileError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        firstName: '',                                                                      
        lastName: '',
        firstNameTH: '',
        lastNameTH: '',
        age: '',
        nationality: '',
        religion: '',
        address: '',
        gender: '',
        mobileNumber: '',
        dateOfBirth: '',
        weight: null,
        height : null,
        typeOfWork : ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getProfile();
            setLoading(false);
            setUserData(result)
        }
        fetchData();
    }, []);

    const useStyles = makeStyles((theme) => ({
        wrapper: {
            width: '100%',
            marginTop: 50
        },
        buttonbase: {
            margin: theme.spacing(1),
            width: "10%",
        },
        papernoone: {
            backgroundColor: "#d99cfd3d",
            padding: theme.spacing(2),


        },
        link: {
            display: "flex",
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        root: {
            flexGrow: 1,

        },

        paper: {
            padding: theme.spacing(2),
            marginLeft: 30,
            maxWidth: "100%",
        },
        paper2: {
            padding: theme.spacing(2),
            marginLeft: 30,
            maxWidth: "100%",
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: "auto",
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
        },
        imgs: {
            margin: "auto",
            display: "block",
            maxWidth: "20%",
            maxHeight: "20%",
        },
        Headerpoint1: {
            direction: "rtl",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        radio1: {
            marginLeft: theme.spacing(5),
        },
        content: {
            justifyContent: "center",
            alignItems: "center",

        },
        legend: {
            marginLeft: theme.spacing(1),
        },
        text1: {
            //    marginLeft: theme.spacing(5),
            maxWidth: "100%",
        },
        textBox: {
            margin: theme.spacing(2),
            width: "40%"
        },
        addressBox: {
            margin: theme.spacing(2),
            width: "85%"
        },

    }));



    const classes = useStyles();

    const changeHandler = e => {
        var pattern = new RegExp(/^[0-9\b]+$/);
        let value = e.target.value;
        if(e.target.name === "mobileNumber"){
            if(!pattern.test(e.target.value)){
                setMobileError(true);
            }else if(value.length < 10 || value.length > 10){
                setMobileError(true);
            }else{
                setMobileError(false);
            }
        }

        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            setUserData({ ...userData, [e.target.name]: onlyNums });
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
        setUserData({ ...userData, [e.target.name]: e.target.value });
                                   
        
    };
    const handleUpdate = (e) => {
     
        updateProfile(userData)
        .then(response => {
            Alert.success("You're successfully update your profile");
            window.location.reload();
        }).catch(error => {
            Alert.error((error && error.message) || ('something went wrong'));
        });
        
       
    }

    return (
        <>
            {loading ? (
                <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="rect" height={118} />
                </div>
            ) : (
                <Grid container spacing={2} justifyContent='center' className={classes.wrapper}>


                    <Grid item xs={9}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                        >
                            <Grid item xs={3} justifyContent='flex-start'>
                                <SideBar select={1} roles={roles} />
                            </Grid>
                            <Grid item xs={9} justifyContent='flex-end' classname={classes.rightPaper}>

                                <br></br>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={0}>
                                        <Grid item xs>
                                            {/* Welcom zone */}
                                            <Typography gutterBottom variant="subtitle1" component="h2">
                                                Welcome
                                            </Typography>
                                        </Grid>
                                        <Grid item xs className={classes.Headerpoint1}>
                                            <Typography gutterBottom variant="subtitle1" component="h2">
                                                Last Login
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0}>
                                        <Grid item xs>
                                            {/* Welcom zone */}
                                            <Typography gutterBottom variant="subtitle1" component="h2">
                                                <b>{user.firstName}</b>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs className={classes.Headerpoint1}>
                                            <Typography gutterBottom variant="subtitle1" component="h2">
                                                {dateFormat(new Date(), "mmmm dd, yyyy | h:MM TT")}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <br></br>

                                <Paper className={classes.paper2}>
                                    <Grid container spacing={0}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            <b>Basic Information</b>
                                        </Typography>
                                    </Grid>
                                    <br />

                                    <form onSubmit={handleUpdate}>
                                    <Grid container spacing={0} className={classes.content}>
                                        <Grid item xs={6} >
                                            
                                            <FormControl required className={classes.textBox}>
                                                <TextField
                                                    id="firstName"
                                                    name="firstName"
                                                    label="Fisrt name"
                                                    defaultValue={user.firstName}
                                                    variant="outlined"
                                                    onChange={changeHandler}
                                                    required
                                                />
                                            </FormControl>
                                            <FormControl required className={classes.textBox}>
                                                <TextField
                                                    id="lastName"
                                                    name="lastName"
                                                    label="Last name"
                                                    variant="outlined"
                                                    defaultValue={user.lastName}
                                                    onChange={changeHandler}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl required className={classes.textBox}>
                                                <TextField
                                                    id="firstNameTH"
                                                    name="firstNameTH"
                                                    label="Fisrt name in Thai"
                                                    defaultValue={user.firstNameTH}
                                                    variant="outlined"
                                                    onChange={changeHandler}
                                                />
                                            </FormControl>
                                            <FormControl required className={classes.textBox}>
                                                <TextField
                                                    id="lastNameTH"
                                                    name="lastNameTH"
                                                    label="Last name in Thai"
                                                    variant="outlined"
                                                    defaultValue={user.lastNameTH}
                                                    onChange={changeHandler}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container spacing={0} className={classes.content}>
                                        <Grid item xs={6}>
                                            <FormControl required variant="outlined" className={classes.textBox}>
                                                <InputLabel htmlFor="outlined-gender">Gender</InputLabel>
                                                <Select
                                                    native
                                                    onChange={changeHandler}
                                                    name="gender"
                                                    label="Gender"
                                                    inputProps={{
                                                        id: 'gender-required',

                                                    }}
                                                    required 

                                                >
                                                    <option value={user.gender}>{user.gender}</option>
                                                    <option>Male</option>
                                                    <option >Female</option>

                                                </Select>
                                            </FormControl>

                                            <FormControl variant="outlined" className={classes.textBox}>
                                                <TextField
                                                    format="dd-mm-yy"
                                                    name="dateOfBirth"
                                                    id="birthDate"
                                                    label="Birthday"
                                                    variant="outlined"
                                                    type="date"
                                                    defaultValue={user.dateOfBirth}
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={changeHandler}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl variant="outlined" className={classes.textBox}>
                                                <InputLabel htmlFor="outlined-nationality">Nationality</InputLabel>
                                                <Select
                                                    native
                                                    onChange={changeHandler}
                                                    name="nationality"
                                                    label="nationality"
                                                    inputProps={{
                                                        id: 'nationality-required',
                                                    }}

                                                >
                                                    <option value={user.nationality}>{user.nationality}</option>
                                                    {NationalityData.map((n) =>
                                                        <option >{n}</option>)}

                                                </Select>
                                            </FormControl>

                                            <FormControl variant="outlined" className={classes.textBox}>
                                                <InputLabel htmlFor="outlined-religion">Religion</InputLabel>
                                                <Select
                                                    native
                                                    onChange={changeHandler}
                                                    name="religion"
                                                    label="religion"
                                                    inputProps={{
                                                        id: 'religion-required',
                                                    }}

                                                >
                                                    <option value={user.religion}>{user.religion}</option>
                                                    <option >Buddhism</option>
                                                    <option >Christianity</option>
                                                    <option >Islam</option>
                                                    <option >Brahman-Hindu</option>
                                                    <option >Sikhism</option>
                                                    <option >No religion</option>

                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl variant="outlined" className={classes.textBox}>
                                                <TextField
                                                    label="Weight"
                                                    id="weight"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                                                        type : "number"
                                                    }}
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                            <FormControl variant="outlined" className={classes.textBox}>
                                                <TextField
                                                    label="Height"
                                                    id="height"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">Cm</InputAdornment>,
                                                        type : "number"
                                                    }}
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                            <FormControl  variant="outlined" className={classes.textBox}>
                                                <TextField
                                                    label="Mobile number"
                                                    name="mobileNumber"
                                                    id="mobile"
                                                    defaultValue={user.mobileNumber}
                                                    variant="outlined"
                                                    onChange={changeHandler}
                                                    type="tel"
                                                    required
                                                    error={mobileError}
                                                    helperText={ mobileError? 'Please input correct format of phone number' : ''}
                                                />
                                            </FormControl>
                                            <FormControl required variant="outlined" className={classes.textBox}>
                                                <InputLabel htmlFor="outlined-religion">Interest Type Of Work</InputLabel>
                                                <Select
                                                    native
                                                    onChange={changeHandler}
                                                    name="typeOfWork"
                                                    label="Interest Type Of Work"
                                                    inputProps={{
                                                        id: 'typeOfWork-required',
                                                    }}
                                                    required

                                                >
                                                    <option value={user.typeOfWork}>{user.typeOfWork}</option>
                                                    <option >Internship</option>
                                                    <option >Co-op Education</option>
                                                    <option >Part-time</option>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl variant="outlined" className={classes.addressBox}>
                                                <TextField
                                                    multiline
                                                    row={10}
                                                    label="Address"
                                                    id="address"
                                                    name="address"
                                                    defaultValue={user.address}
                                                    variant="outlined"
                                                    onChange={changeHandler}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={0} className={classes.content}>
                                        <Button
                                            size="large"
                                            className={classes.buttonbase}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            startIcon={<CloudUploadIcon />}
                                            disabled={mobileError}
                                        >
                                            SAVE
                                        </Button>
                                       

                                        <Button
                                            size="large"
                                            className={classes.buttonbase}
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => {
                                                Alert.success("You're successfully update your profile");
                                                window.location.reload();
                                            }}
                                        >
                                            Cancel
                                        </Button>

                                    </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>



                </Grid>
            )}
        </>
    );
};
export default EditProfile;
