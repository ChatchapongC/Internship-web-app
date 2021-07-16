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
import dateFormat from "dateformat";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

const Jobpost = () => {
  const [state, setState] = useState({});
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  //Set css style
  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      height: '',
      padding: '25px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  const useStyles = makeStyles((theme) => ({
    papernoone:{
      backgroundColor: 'rgba(200, 117, 238, 0.678)',
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 1000,
    },
    link: {
      display: 'flex',
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
  }));

  //Call style by name of class
  const classes = useStyles();

  return (
    <div className={classes.destyle}>
      <br></br>
      <Paper className={classes.papernoone}>
      <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
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
              <b>User</b>
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
            <b>Post Job</b>
          </Typography>
        </Grid>
        <br></br>
        <Grid container spacing={0} className={classes.content}>
          <FormControl component="fieldset">
            <FormLabel required component="legend" className={classes.legend}>
              Job-type
            </FormLabel>
            <br></br>
            <RadioGroup
              className={classes.radio1}
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="Internship"
                control={<Radio color="primary" />}
                label="Internship"
              />
              <FormControlLabel
                value="Part-time"
                control={<Radio color="primary" />}
                label="Part-time"
              />
              <FormControlLabel
                value="Full-time"
                control={<Radio color="primary" />}
                label="Full-time"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <br></br>
        <Grid container spacing={0} className={classes.content}>
          <FormControl component="fieldset">
            <FormLabel required component="legend" className={classes.legend}>
              Job Title (10 - 100 letters)
            </FormLabel>
            <br></br>
            <TextField
              className={classes.text1}
              id="outlined-basic"
              label="List out keywords that will allow easier search of the job"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <br></br>
        <Grid container spacing={0} className={classes.content}>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.legend}>
                Category or type of work
              </FormLabel>
              <br></br>
              <TextField
                className={classes.text2}
                id="outlined-basic"
                label="List out keywords that will allow easier search"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.legend}>
                Related tags or keywords
              </FormLabel>
              <br></br>
              <TextField
                className={classes.text2}
                id="outlined-basic"
                label="List out keywords that will allow easier search"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <br></br>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <br></br>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.legend}>
                  Benefit
                </FormLabel>
                <br></br>
                <TextField id="outlined-basic" label="" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <br></br>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.legend}>
                  Available positions
                </FormLabel>
                <br></br>

                <NativeSelect
                  id="demo-customized-select-native"
                  value={age}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={999}>Many</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <br></br>
    </div>
  );
};
export default Jobpost;