import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputAdornment, MenuItem, TextField } from "@material-ui/core";
import dateFormat from "dateformat";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import DeleteIcon from '@material-ui/icons/Delete';
import { createJob } from "../../api/JobAPI";
import JobCategory from '../../data/JobCategory.json';
import Alert from "react-s-alert";
import LoadingIndicator from "../../common/LoadingIndicator";
import { InputLabel, Grid, Typography, Paper, Breadcrumbs, Select, Button } from "@material-ui/core";
import Jobdetail from "./JobDetails";
import { getCompany } from "../../api/CompanyAPI";
import { useHistory } from "react-router-dom";

const JobPosting = (props) => {
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState([]);
    const [jobDetails, setJobDetails] = useState({
        title: null,
        type: null,
        category: null,
        availablePosition: null,
        allowance: null,
        workingTime: null,
        workingHoliday: null,
        location: null,
        description: null,
        contactNumber: null,
        contactPersonName: null,
        educationQulification: null,
        gender : null,
        experience : null
    });

    const [mobileError, setMobileError] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCompany();
            setLoading(false);
            setCompany(result)
        }
        fetchData();
    }, []);

    const useStyles = makeStyles((theme) => ({
        buttonbase: {
            margin: theme.spacing(1),
            width: "10%",
        },
        papernoone: {
            backgroundColor: "#d99cfd3d",
            padding: theme.spacing(2),
            margin: "auto",
            maxWidth: "76%",
        },
        link: {
            display: "flex",
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        destyle: {
            margin: "auto",
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: "auto",
            maxWidth: "76%",
        },
        paper2: {
            padding: theme.spacing(2),
            margin: "auto",
            maxWidth: "76%",
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

    //Call style by name of class
    const classes = useStyles();

    const changeHandler = e => {
        var pattern = new RegExp(/^[0-9\b]+$/);
        let value = e.target.value;
        if(e.target.name === "contactNumber"){
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
            setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
        } else {
            setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (company.companyName === "" || company.companyName === null || company.companyName === undefined){
            Alert.error("Please update your company profile before post a job!")
        } else {
            createJob(jobDetails)
                .then(response => {
                    Alert.success("You're successfully create a job");
                    history.push("/jobposted");
                }).catch(error => {
                    Alert.error((error && error.message) || ('something went wrong'));
                });
        }
    }

    return (
        <>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className={classes.destyle}>
                    <Paper className={classes.papernoone}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                color="inherit"
                                to="/"
                                className={classes.link}
                            >
                                <HomeIcon className={classes.icon} />
                                Home
                            </Link>
                            <Link
                                color="inherit"
                                onClick={() => {
                                    window.location.reload();
                                }} 
                                className={classes.link}
                            >
                                <WhatshotIcon className={classes.icon} />
                                Create Job
                            </Link>
                        </Breadcrumbs>
                    </Paper>
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
                                    <b>{company.companyName}</b>
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
                        <form onSubmit={handleUpdate}>
                        <Grid container spacing={0}>
                            <Typography gutterBottom variant="h6" component="h2">
                                <b>Creat a new job</b>
                            </Typography>
                        </Grid>
                        <br />
                        <Grid container spacing={0} className={classes.content}>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        id="title"
                                        name="title"
                                        label="Job Title"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                    />
                                </FormControl>

                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <InputLabel htmlFor="outlined-job-type">Job Type</InputLabel>
                                    <Select
                                        native
                                        onChange={changeHandler}
                                        name="type"
                                        label="Job Type"
                                        inputProps={{
                                            id: 'jobType-required',
                                        }}
                                        required

                                    >
                                        <option value=""></option>
                                        <option>Internship</option>
                                        <option >Co-op Education</option>
                                        <option >Part-Time</option>
                                        <option>Full-Time</option>


                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <InputLabel htmlFor="outlined-category">Job Category</InputLabel>
                                    <Select
                                        native
                                        onChange={changeHandler}
                                        name="category"
                                        label="Job Category"
                                        inputProps={{
                                            id: 'category-required',
                                        }}
                                        required

                                    >
                                        <option value=""></option>
                                        {JobCategory.map((n) =>
                                            <option >{n}</option>)}

                                    </Select>
                                </FormControl>

                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        id="availablePosition"
                                        name="availablePosition"
                                        label="Job Available Position"
                                        variant="outlined"
                                        required
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={0} className={classes.content}>
                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        label="Working Time"
                                        id="workingTime"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        name="workingTime"
                                        required
                                    />
                                </FormControl>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        label="Working Holiday"
                                        id="workingHoliday"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        name="workingHoliday"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        id="workingLocation"
                                        name="location"
                                        label="Working Location"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                    />
                                </FormControl>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        id="allowance"
                                        name="allowance"
                                        label="Allowance"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        label="Contact Number"
                                        name="contactNumber"
                                        id="mobile"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                        error={mobileError}
                                        helperText={mobileError ? "Please correct this field" : ""}
                                    />
                                </FormControl>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        label="Contact Person"
                                        name="contactPersonName"
                                        id="name"
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <InputLabel id="educationQualification">Education qualification</InputLabel>
                                    <Select
                                        labelId="educationQualification"
                                        id="educationQualification"
                                        name="educationQualification"
                                        label="Education qualification"
                                        onChange={changeHandler}
                                    >
                                        <MenuItem value={"Any"}>Any</MenuItem>
                                        <MenuItem value={"Primary"}>Primary</MenuItem>
                                        <MenuItem value={"Secondary"}>Secondary</MenuItem>
                                        <MenuItem value={"Certificate"}>Certificate</MenuItem>
                                        <MenuItem value={"Diploma"}>Diploma</MenuItem>
                                        <MenuItem value={"Bachelor degree"}>Bachelor degree</MenuItem>
                                        <MenuItem value={"Master degree"}>Master degree</MenuItem>
                                        <MenuItem value={"Doctorate degree"}>Doctorate degree</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <InputLabel id="gender">Gender</InputLabel>
                                    <Select
                                        labelId="gender"
                                        id="gender"
                                        name="gender"
                                        label="gender"
                                        onChange={changeHandler}
                                    >
                                        <MenuItem value={"Any"}>Any</MenuItem>
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.addressBox}>
                                    <TextField
                                        multiline
                                        row={10}
                                        label="Experience"
                                        id="experience"
                                        name="experience"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.addressBox}>
                                    <TextField
                                        multiline
                                        row={10}
                                        label="Job Description"
                                        id="description"
                                        name="description"
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
                                startIcon={<CloudUploadIcon />}
                                type="submit"
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
                    <br></br>
                </div>
            )}
        </>

    );
};
export default JobPosting;
