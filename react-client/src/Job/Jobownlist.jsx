import React, { Component, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WorkIcon from "@material-ui/icons/Work";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { TextField } from "@material-ui/core";
import { WorkRounded } from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from 'react-router-dom';
import {postJob} from "../util/APIUtils";
import Alert from 'react-s-alert';
import { getbusiness } from "../util/APIUtils";
import { getbusinessjobpost } from "../util/APIUtils";
import VannessLogo from "../img/vanness_logo.jpg";
import dateFormat from "dateformat";

const Jobownlist = () => {
  const [business, setBusiness] = useState([]);
  const [jobsDetail, setJobs] = useState([]);
  const [state, setState] = useState({});
  const [business_name, setBusiness_name] = useState("company1");

  useEffect(() => {
    getbusiness(1).then((data) => setBusiness(data));
    getbusinessjobpost(business_name).then((data) => setJobs(data));
  }, []);

  const [jobPost, setjob] = useState({
    title: '',
    business_name: business_name,
    jobtype: '',
    avaliable_position: '',
    tags: [],
    benefit: 0,
    location: '',
    upload_date: dateFormat(new Date(), "yyyy-mm-dd"),
    job_requirement: [],
    skill: []
  });

  

  const handlejob = e => {
    const { value } = e.target;

    //set value of Radio button
    setjob({...jobPost, jobtype: value});
    //set value in hook-form
  };

  const handlejobtitle = e => {
    const { value } = e.target;
    //set value of Radio button
    setjob({...jobPost, title: value});
    //set value in hook-form
  };

  const handlejobbenefit = e => {
    const { value } = e.target;
    //set value of Radio button
    setjob({...jobPost, benefit: value});
    //set value in hook-form
  };

  const handlejobposition = e => {
    const { value } = e.target;
    //set value of Radio button
    setjob({...jobPost, avaliable_position: value});
    //set value in hook-form
  };

  const updateSelection = (event, value) => {
    event.persist();
    const name = event.target.name;
    setjob({ ...jobPost, [name]: event.target});
  };

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  //Set css style
  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      height: "",
      padding: "25px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }))(InputBase);

  const useStyles = makeStyles((theme) => ({
    buttonbase: {
      margin: theme.spacing(1),
      width: "15%",
    },
    papernoone: {
      backgroundColor: "#d99cfd3d",
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 1000,
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
      maxWidth: 1000,
    },
    paper2: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 1000,
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
      marginLeft: theme.spacing(1),
    },
    legend: {
      marginLeft: theme.spacing(1),
    },
    text1: {
      //    marginLeft: theme.spacing(5),
      width: 950,
      maxWidth: "100%",
    },
    text2: {
      //   marginLeft: theme.spacing(5),
      //   width: 'auto',
      //   margin: "auto",
      // maxWidth: 450,
      minWidth: 450,
    },
    margin2:{
      width: 90,
    },
  }));

  //Call style by name of class
  const classes = useStyles();
  const position = 'selectedOption'

  return (
    <div className={classes.destyle}>
      <br></br>
      <Paper className={classes.papernoone}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            onClick={handleClick}
            className={classes.link}
          >
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Link
            color="inherit"
            href="/getting-started/installation/"
            onClick={handleClick}
            className={classes.link}
          >
            <WhatshotIcon className={classes.icon} />
            Core
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <GrainIcon className={classes.icon} />
            Breadcrumb
          </Typography>
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
              <b>{business.name}</b>
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
      <Typography variant="h6" component="h2">
          <b>Your posted job</b>
      </Typography>
      <br></br>
      {jobsDetail.map((jobsDetail) => {
        return (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={VannessLogo}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6" component="h2">
                        <b>{jobsDetail.title}</b>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <Button
                          size="small"
                          className={classes.margin}
                          variant="contained"
                          color="primary"
                        >
                          {jobsDetail.jobtype}
                        </Button>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <LocationOnIcon fontSize="small"></LocationOnIcon>{" "}
                        {jobsDetail.location}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <DateRangeIcon fontSize="small"></DateRangeIcon>
                        {" Apply Before: "}
                        {jobsDetail.upload_date}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">{jobsDetail.avaliable_position} position(s)</Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                  <Typography variant="subtitle1">
                      <Button
                        size="large"
                        className={classes.margin2}
                        variant="contained"
                        color="primary"
                      //   style={{
                      //     backgroundColor: "#757575",
                          
                      // }}
                      >
                        Edit
                      </Button>
                    </Typography>
                    <br></br>
                    <Typography variant="subtitle1">
                      <Button
                        size="large"
                        className={classes.margin2}
                        variant="contained"
                        color="secondary"
                        
                      >
                        Delete
                      </Button>
                    </Typography>
                    <br></br>
                    <Typography variant="subtitle1">
                      {jobsDetail.upload_date}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <br></br>
          </div>
        );
      })}
      </Paper>
      <br></br>
    </div>
  );
};
export default Jobownlist;
