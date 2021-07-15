import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const Jobpost = () => {
  const [state, setState] = useState({});

  //Set css style
  const useStyles = makeStyles((theme) => ({
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
      maxWidth: "100%",
    },

  }));

  //Call style by name of class
  const classes = useStyles();

  return (
    <div className={classes.destyle}>
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
            <FormLabel component="legend" className={classes.legend}>
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
            <FormLabel component="legend" className={classes.legend}>
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

          <Grid item></Grid>
        </Grid>
      </Paper>
      <br></br>
    </div>
  );
};
export default Jobpost;
