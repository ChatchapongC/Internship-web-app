import React, { useState, useEffect, useContext, createContext } from 'react';
import defaultLogo from '../../images/default-job-logo.png'
import { getAllJobs, filterJob, getJobFilter } from '../../api/JobAPI';
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
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
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
import SearchFilter from '../SearchBar/SerachFilter';
import { getAllCandidate, getResumeById } from '../../api/CandidateAPI';

Moment.locale('th');

export default function CandidateListing(props) {
  
  const [candidates, setCandidate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);

  const [jobFilter, setJobFilter] = useState({
    jobType: "Internship",
    jobCategory: null,
    location: null,
  });
  

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


 

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCandidate();
      setLoading(false);
      setCandidate(result)
    };
    fetchData();
  }, []);

  let recentInstitute = null
  candidates.map((c) => c.resume.educations.sort((a, b) => a.id > b.id ? 1 : -1).map((e, i, educations) => {
    if(i + 1 === educations.length){
      recentInstitute = e.institute
    }

  }))
  

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
                  {/* <SearchFilter setJobFilter={setJobFilter} jobFilter={jobFilter}/> */}
                </Grid>
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
                                  props.history.push(`/view-profile/${candidate.id}`);
                                }} 
                                
                              />
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                              <Grid item x>
                                <Typography gutterBottom variant="h6" component="h2" className={classes.margin}>
                                  <Link  href="" onClick={() => {
                                          props.history.push(`/view-profile/${candidate.id}`);
                                          }} color="inherit" underline="none">
                                    {candidate.resume.positionTitle}
                                  </Link>
                                  <Badge
                                    classes={{ badge: classes.customBadge }}
                                    className={classes.customBadge}
                                    badgeContent={candidate.age}
                                  >                                                 
                                  </Badge>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  <WorkRoundedIcon fontSize="small" className={classes.iconMargin}></WorkRoundedIcon>
                                    <Typography variant="subtitle2" style={{ color : purple[300] }}>
                                        Type of work :
                                    </Typography>
                                    {candidate.typeOfWork}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  <SchoolRoundedIcon fontSize="small" className={classes.iconMargin}></SchoolRoundedIcon>
                                  <Typography variant="subtitle2" style={{ color : purple[300] }}>
                                        Education :
                                    </Typography>
                                    {candidate.resume.educations.sort((a, b) => a.id > b.id ? 1 : -1).map((e, i, educations) => i+1 === educations.length ? e.educationLevel : null) }
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  <AccountBalanceRoundedIcon fontSize="small" className={classes.iconMargin}></AccountBalanceRoundedIcon>
                                  <Typography variant="subtitle2" style={{ color : purple[300] }}>
                                        Institute :
                                    </Typography>
                                  {candidate.resume.educations.sort((a, b) => a.id > b.id ? 1 : -1).map((e, i, educations) => i+1 === educations.length ? e.institute : null) }
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1">
                                {/* {Moment(job.updatedAt).format('MMMM DD,yyy HH:mm:SS')} */}
                              </Typography>
                              <br></br>
                              <Typography>
                                <ColorButton
                                  size="large"
                                  className={classes.margin}
                                  variant="contained"
                                  onClick={() => {
                                    props.history.push(`/view-profile/${candidate.id}`);
                                  }}

                                >
                                  VIEW
                                </ColorButton>
                              </Typography>
                              <br></br>
                             
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

