// import './Jobdetail.scss';
import React, { Component, useState, useEffect } from "react";
import VannessLogo from "../img/vanness_logo.jpg";
import { getJobDetail } from "../util/APIUtils";
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
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

const Jobdetail = () => {
  const [jobsDetail, setjobsDetail] = useState([]);
  const [state, setState] = useState({});
  const id = "21";

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
      maxWidth: 650,
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
  }));

  const classes = useStyles();

  useEffect(() => {
    getJobDetail(id).then((data) => setjobsDetail(data));

    console.log(jobsDetail);
  }, []);

  console.log(jobsDetail);
  return (
    <div className={classes.destyle}>
      <br></br>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={VannessLogo} />
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
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    Share: <FacebookIcon></FacebookIcon>{" "}
                    <TwitterIcon></TwitterIcon> <LinkedInIcon></LinkedInIcon>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1"></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div>
        <br></br>
      </div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column" spacing={3}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="h2">
                    <b>Job Detail</b>
                  </Typography>
                    <br></br>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <WorkIcon color="action" fontSize="large"></WorkIcon>
                    </Grid>
                    <Grid item xs>
                    <b>Experience</b><br></br>NaN
                    </Grid>
                    <Grid item xs={1}>
                        <PersonIcon color="action" fontSize="large"></PersonIcon>
                    </Grid>
                    <Grid item xs>
                    <b>Gender</b><br></br>NaN
                    </Grid>
                    <Grid item xs={1}>
                        <HomeWorkIcon color="action" fontSize="large"></HomeWorkIcon>
                    </Grid>
                    <Grid item xs>
                    <b>Industry</b><br></br>NaN
                    </Grid>
                  </Grid>
                  <br></br>

                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <CastForEducationIcon color="action" fontSize="large"></CastForEducationIcon>
                    </Grid>
                    <Grid item xs>
                    <b>Qualifications</b><br></br>NaN
                    </Grid>
                    <Grid item xs={1}>
                        <LocalAtmIcon color="action" fontSize="large"></LocalAtmIcon>
                    </Grid>
                    <Grid item xs>
                    <b>Salary</b><br></br>NaN
                    </Grid>
                    <Grid item xs={1}>
                        <GroupIcon color="action" fontSize="large"></GroupIcon>
                    </Grid>
                    <Grid item xs>
                    <b>Career Level</b><br></br>NaN
                    </Grid>
                  </Grid>
                  <br></br>

                  <Typography gutterBottom variant="h6" component="h2">
                    <b>Job Description</b>
                  </Typography>
                    <br></br>
                    <Typography gutterBottom variant="subtitle2" >
                        <b>Position :</b>{" "}{jobsDetail.avaliable_position}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" >
                        <b>Company :</b>{" "}{jobsDetail.business_name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" >
                        <b>Closing Date :</b>{" "}{jobsDetail.upload_date}
                    </Typography>

                  
                  
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    Share: <FacebookIcon></FacebookIcon>{" "}
                    <TwitterIcon></TwitterIcon> <LinkedInIcon></LinkedInIcon>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1"></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <br></br>
    </div>
  );
};
export default Jobdetail;
