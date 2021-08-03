import { Container } from "../globalStyles";
import React, { Component, useState, useEffect } from "react";
import VannessLogo from "../img/vanness_logo.jpg";
import { getRecommedJob } from "../util/APIUtils";
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

export function RecommendBar() {
  const [jobsDetail, setJobs] = useState([]);
  const [state, setState] = useState({});

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
      maxWidth: 850,
    },
    paper2: {
      padding: theme.spacing(2),
      textAlign: "left",
      // color: theme.palette.text.secondary,
      flex: "1 0 auto",
      margin: "auto",
      maxWidth: 850,
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
    getRecommedJob().then((data) => setJobs(data));
  }, []);

  return (
    // <div className="Box">

    //     <div className="box-container">
    //         <Container>
    //             <Heading lightText={lightText}>Recommend</Heading>
    //         </Container>
    //         {jobs.map((d) => {
    //         return <div className="box" key={d.id}>
    //             <img src = {VannessLogo}/><br/>
    //             <em>{d.title}</em><br/>
    //             <b>Comapny name:</b>{d.business_name}<br/>
    //             <b> Position: </b>{d.avaliable_position}<br/>
    //             {/*
    //             <em>{d.Title}</em><br/>
    //             <b>Comapny name:</b>{d.business_name}<br/>
    //             <b> Position: </b>{d.title}<br/>
    //             <b> Available: </b>{d.Amount == 1 ? (
    //                     d.Amount + ' position'
    //             ):(d.Amount +  ' position(s)' )}<br/>
    //             <b> Allowance: </b>{d.benefit}฿/day<br/> */}
    //             <button className="btn" big fontBig primary={primary}>
    //                 View
    //             </button>
    //         </div>
    //         })}
    //         <div className="search-box"></div>
    //     </div>

    // </div>

    <div className={classes.destyle}>
      <br></br>
      <Paper className={classes.paper2}>
        <Typography variant="h4" component="h2">
          <b>Recommend</b>
        </Typography>
      </Paper>
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
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        Share: <FacebookIcon></FacebookIcon>{" "}
                        <TwitterIcon></TwitterIcon>{" "}
                        <LinkedInIcon></LinkedInIcon>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">1 position(s)</Typography>
                    <br></br>
                    <Typography variant="subtitle1">
                      <Button
                        size="large"
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                      >
                        APPLY
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
    </div>
  );
}

export default RecommendBar;
