import React, { useState, useEffect } from 'react';
import defaultLogo from '../../images/default-job-logo.png'
import { getApplyCandidate, updateViewd } from '../../api/CompanyAPI';
import LoadingIndicator from '../../common/LoadingIndicator';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BusinessIcon from '@material-ui/icons/Business';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { purple, blue } from '@material-ui/core/colors';
import {
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Badge,
  Box,
} from '@material-ui/core';
import Moment from 'moment';
import { Link } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Alert from "react-s-alert";


Moment.locale('th');

export default function AppliedList(props) {

  const [candidates, setCandidate] = useState([]);
  const [loading, setLoading] = useState(true);
  const jobId = props.jobId;

  console.log(jobId);

  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    iconMargin: {
      margin: theme.spacing(0.5),
      color: purple[200],
    },
    destyle: {
      margin: "auto",
    },
    root: {
      flexGrow: 1,
    },
    customBadge: {
      marginLeft: theme.spacing(6),
      backgroundColor: purple[300],
      color: "white"
    },
    logo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    jobBox: {
      padding: theme.spacing(2),
      marginBottom: 20,
      width: 850,
      [theme.breakpoints.down('md')]: {
        maxWidth: 300,
      },
    },
    searchBox: {
      padding: theme.spacing(2),
      textAlign: "left",
      flex: "1 0 auto",
      height: 500,
      width: 300,

    },
    image: {
      width: 128,
      height: 128,
      borderRadius: "50%"
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "50%"
    },
    imgs: {
      margin: "auto",
      display: "block",
      maxWidth: "10%",
      maxHeight: "10%",
    },
  }));

  const classes = useStyles();
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
      border: '10px',
    },
  }))(Button);

  // console.log("cid : " +id);
  //   console.log("jid : " +jobId);
  //   updateViewd(id, jobId)
  //     .then(response => {
  //       Alert.success("Go to view resume page")
  //       //history.push(`/view-resume/${id}`);
  //     }).catch(error => {
  //       Alert.error((error ) || ('something went wrong'));
  //     });

  const handleUpdate = (cid) => {
    updateViewd(cid, jobId)
      .then(response => {
        console.log(response);
        Alert.success("Go to view resume page")
        //history.push(`/view-resume/${id}`);
      }).catch(error => {
        Alert.error((error) || ('something went wrong'));
      });

  }


  useEffect(() => {
    const fetchData = async () => {
      const result = await getApplyCandidate(jobId);
      setLoading(false);
      setCandidate(result)
    };
    fetchData();


  }, []);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Box mt={12}>
          <Grid container className={classes.root} justifyContent="center" alignItems="center">
            <Grid item xl>
              <Grid container justifyContent="center" spacing={2}>

                <Grid item>
                  {candidates.map((candidate) => {
                    return (
                      <Paper className={classes.jobBox}>
                        <Grid container spacing={2}>
                          <Grid item className={classes.logo}>
                            <ButtonBase className={classes.image}>
                              <img
                                className={classes.img}
                                alt="complex"
                                src={defaultLogo}
                                onClick={() => {
                                  history.push(`#`);
                                }
                                }

                              />
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                              <Grid item x>
                                <Typography gutterBottom variant="h6" component="h2" className={classes.margin}>
                                  <Link href="" onClick={() => {
                                    history.push(`#`);
                                  }} color="inherit" underline="none">
                                    CANDIDATE ROLE
                                  </Link>
                                  <Badge
                                    classes={{ badge: classes.customBadge }}
                                    className={classes.customBadge}
                                    badgeContent={candidate.jobtype}
                                  >
                                  </Badge>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  {/* <BusinessIcon fontSize="small" className={classes.iconMargin}></BusinessIcon> */}
                                  <Link href=""
                                    color="inherit"
                                    underline="none"
                                    onClick={() => {
                                      history.push(`#`);
                                    }}
                                  >
                                    career field :
                                  </Link>

                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  {/* <LocationOnIcon fontSize="small" className={classes.iconMargin}></LocationOnIcon>{" "} */}
                                  Experience:
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  {/* <PermIdentityIcon fontSize="small" className={classes.iconMargin}></PermIdentityIcon> */}
                                  Available woking location:
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1">
                                {/* {Moment(job.updatedAt).format('MMMM DD,yyy HH:mm:SS')} */}
                                ({candidate.firstName}) #usually not show
                              </Typography>
                              <br></br>
                              <Typography>
                                <ColorButton
                                  size="large"
                                  className={classes.margin}
                                  variant="contained"
                                  onClick={() => {
                                    history.push(`/view-resume/${candidate.id}/${jobId}`)
                                  }}

                                >
                                  VIEW
                                </ColorButton>
                              </Typography>
                              <br></br>
                              <Grid item>
                                <Typography variant="body2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                  Share: <FacebookIcon style={{ color: blue[900] }}></FacebookIcon>{" "}
                                  <TwitterIcon style={{ color: blue[300], margin: "0px 5px" }}></TwitterIcon>{" "}
                                  <LinkedInIcon style={{ color: blue[800] }}></LinkedInIcon>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>


      )}
    </>
  );
}

