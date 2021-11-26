import React, { useState, useEffect } from "react";
import defaultLogo from "../../images/default-job-logo.png";
import { applyJob, getResume } from "../../api/CandidateAPI";
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
import { purple } from "@material-ui/core/colors";
import { Badge, Chip, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingIndicator from "../../common/LoadingIndicator";
import Alert from "react-s-alert";
import { getJobDetailById } from "../../api/JobAPI";
import Moment from "moment";
import AppliedList from "./AppliedList";
import Divider from "@mui/material/Divider";
import { createTheme } from "@mui/material";
import BusinessIcon from "@material-ui/icons/Business";

Moment.locale("th");

const Jobdetail = (props) => {
  const [jobsDetail, setjobsDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const jid = props.match.params.id;
  const roles = props.roles.map((r) => r.name);
  const [resumeCompleteness, setResumeCompleteness] = useState(false);
  const [resume, setResume] = useState({
    firstName: null,
    lastName: null,
    shortDescription: null,
    positionTitle: null,
    educations: [],
    experiences: [],
    languages: [],
    skills: [],
  });

  const history = useHistory();

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
    },
  });

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
      marginBottom: 60,
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
    customBadge: {
      marginLeft: theme.spacing(6),
      backgroundColor: purple[300],
      color: "white",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getJobDetailById(jid);
      setjobsDetail([result]);
      setLoading(false);
    };
    fetchData();
  }, [jid]);

  useEffect( () => {
    const fetchData = async () => {
      const res = await getResume();
      setResume(res);
      setLoading(false);
    };
    if(roles.includes('ROLE_CANDIDATE')){
      fetchData();
    }
  },[])

  useEffect(() => {
    if (
      roles.includes('ROLE_CANDIDATE')&&
      resume.firstName != null &&
      resume.lastName != null &&
      resume.shortDescription != null &&
      resume.positionTitle != null &&
      resume.skills.length != 0 &&
      resume.educations.length != 0 &&
      resume.experiences.length != 0 &&
      resume.languages.length != 0
    ) {
      setResumeCompleteness(true);
    }
  }, [resume]);

  console.log(jobsDetail)
  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div>
          {jobsDetail.map((job) => {
            return (
              <div className={classes.destyle}>
                <br></br>
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase className={classes.image}>
                          <img
                            className={classes.img}
                            alt="complex"
                            src={defaultLogo}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              <b>{job.title}</b>
                              <Badge
                                classes={{ badge: classes.customBadge }}
                                className={classes.customBadge}
                                badgeContent={job.type}
                              ></Badge>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            <BusinessIcon
                                    fontSize="small"
                                    className={classes.iconMargin}
                                  ></BusinessIcon>
                                  <Link
                                    href=""
                                    color="inherit"
                                    underline="none"
                                    onClick={() => {
                                      history.push(
                                        `/company/${job.company.id}`
                                      );
                                    }}
                                  >
                                    {job.company.companyName}
                                  </Link>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <LocationOnIcon fontSize="small"></LocationOnIcon>{" "}
                              {job.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <DateRangeIcon fontSize="small"></DateRangeIcon>

                              {Moment(job.updatedAt).format("MMMM DD, yyyy")}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ cursor: "pointer" }}
                            >
                              Share: <FacebookIcon></FacebookIcon>{" "}
                              <TwitterIcon></TwitterIcon>{" "}
                              <LinkedInIcon></LinkedInIcon>
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
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              <b>Job Details</b>
                            </Typography>
                            <br></br>
                            <Grid container spacing={1}>
                              <Grid item xs={1}>
                                <WorkIcon
                                  color="action"
                                  fontSize="large"
                                ></WorkIcon>
                              </Grid>
                              <Grid item xs>
                                <b>Experience</b>
                                <br/>{job.experience}
                              </Grid>
                              <Grid item xs={1}>
                                <PersonIcon
                                  color="action"
                                  fontSize="large"
                                ></PersonIcon>
                              </Grid>
                              <Grid item xs>
                                <b>Gender</b>
                                <br/>{job.gender}
                              </Grid>
                              <Grid item xs={1}>
                                <HomeWorkIcon
                                  color="action"
                                  fontSize="large"
                                ></HomeWorkIcon>
                              </Grid>
                              <Grid item xs>
                                <b>Job Category</b>
                                <br></br>
                                {job.category}
                              </Grid>
                            </Grid>
                            <br></br>

                            <Grid container spacing={1}>
                              <Grid item xs={1}>
                                <CastForEducationIcon
                                  color="action"
                                  fontSize="large"
                                ></CastForEducationIcon>
                              </Grid>
                              <Grid item xs>
                                <b>Qualifications</b>
                                <br/>{job.educationQualification}
                              </Grid>
                              <Grid item xs={1}>
                                <LocalAtmIcon
                                  color="action"
                                  fontSize="large"
                                ></LocalAtmIcon>
                              </Grid>
                              <Grid item xs>
                                <b>Allowance</b>
                                <br></br>
                                {job.allowance}
                              </Grid>
                            </Grid>
                            <br></br>

                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              <b>Job Description</b>
                              <Typography variant="subtitle1" gutterBottom>
                                {job.description}
                              </Typography>
                            </Typography>
                            <br></br>
                            <Typography gutterBottom variant="subtitle2">
                              <b>Available Position :</b>{" "}
                              {job.availablePosition}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2">
                              <b>Working Time :</b> {job.workingTime}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2">
                              <b>Working holiday :</b> {job.workingHoliday}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2">
                              <b>Experience :</b> {job.experience}
                            </Typography>
                            <br/>
                            <Typography gutterBottom variant="subtitle2">
                              <b>Contact email :</b> {job.company.contactEmail}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2">
                              <b>Contact number :</b> {job.company.telephoneNumber}
                            </Typography>
                          </Grid>
                          <Grid container justifyContent="flex-end">
                            <Typography>
                              <AlertDialog />
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ cursor: "pointer" }}
                            >
                              Share: <FacebookIcon></FacebookIcon>{" "}
                              <TwitterIcon></TwitterIcon>{" "}
                              <LinkedInIcon></LinkedInIcon>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1"></Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>

                  {roles.includes("ROLE_COMPANY") && (
                    <>
                      <Divider variant="middle">
                        <Typography variant="h6" style={{ cursor: "pointer" }}>
                          CANDIDATES
                        </Typography>
                      </Divider>
                      <AppliedList jobId={jid} />
                    </>
                  )}
                </div>
                <br></br>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  function AlertDialog() {
    const [open, setOpen] = React.useState(false);

    const history = useHistory();

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleClick = () => {
      history.push("/resume")
    }

    const handleApply = () => {
      applyJob(jid)
        .then((response) => {
          Alert.success(
            "You're successfully apply this job  —  Redirecting to job apply history"
          );
          setOpen(false);
          setTimeout(() => history.push("/user/job-history"), 3000);
        })
        .catch((error) => {
          Alert.error(
            "Please Login as a candidate for apply the job" ||
              "Something went wrong"
          );
          setOpen(false);
        });
    };

    const ColorButton = withStyles((theme) => ({
      root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        "&:hover": {
          backgroundColor: purple[700],
        },
        border: "10px",
      },
    }))(Button);

    return (
      <>
      {loading ? (
        <LoadingIndicator />
      ) : (
      <div>
        <ColorButton
          variant="outlined"
          size="large"
          color="primary"
          onClick={handleClickOpen}
        >
          APPLY
        </ColorButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {roles ? (
            <>
            {roles.includes('ROLE_CANDIDATE') ? (
              <>
              {resumeCompleteness ? (
                <>
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure to apply this job?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {jobsDetail.title}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleApply} color="primary" autoFocus>
                      ACCEPT
                    </Button>
                  </DialogActions>
                </>
              ) : (
                <>
                  <DialogTitle id="alert-dialog-title">
                    {"You are not complete your resume"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Please complete your resume before apply this job
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClick} color="primary" autoFocus>
                      GO TO RESUME EDITING
                    </Button>
                  </DialogActions>
                </>
              )}
              </>
              

            ) : (
              <>
              <DialogTitle id="alert-dialog-title">
                {"You are not candidate"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You can't apply the job. Please login as candidate to apply the job.
                </DialogContentText>
              </DialogContent>
              <DialogActions></DialogActions>
              </> 
            )}
              
            </>
          ) : (
            <>
              <DialogTitle id="alert-dialog-title">
                {"You are not login"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please Login before apply our jobs
                </DialogContentText>
              </DialogContent>
              <DialogActions></DialogActions>
            </>
          )}
        </Dialog>
      </div>
      )}
      </>

    );
  }
};
export default Jobdetail;
