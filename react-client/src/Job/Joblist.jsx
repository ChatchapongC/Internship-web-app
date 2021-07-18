import './Joblist.scss';
import React, { useState, useEffect } from 'react';
import defaultLogo from '../images/default-job-logo.png'
import { getCurrentJob } from '../util/APIUtils';
import LoadingIndicator from '../common/LoadingIndicator';
import { createTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BusinessIcon from '@material-ui/icons/Business';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from "@material-ui/icons/DateRange";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { purple, blue } from '@material-ui/core/colors';
import { 
  Grid, 
  Paper, 
  Typography, 
  ButtonBase,
  Badge
} from '@material-ui/core';



export function Joblist (props) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const theme = createTheme({
        palette: {
          primary: purple,
        },
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
        customBadge:{
          marginLeft: theme.spacing(6),
          backgroundColor: purple[300],
          color:"white"
        },
        logo:{
          display:"flex",
          justifyContent:"center",
          alignItems: "center"
        },
        paper: {
          padding: theme.spacing(2),
         
          maxWidth: "40%",
          [theme.breakpoints.down('md')]: {
            maxWidth: "90%",
          },
        },
        paper2: {
          height: 120,
          width: "20%",
         
          [theme.breakpoints.down('md')]: {
            maxWidth: "90%",
          },
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
    const badgeColor = purple['A200'];
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
            const result = await getCurrentJob();
            setLoading(false);
            setJobs(result)
        };
        fetchData();
        
    
    },[]);
    
    
    return (
        <>
        { loading ? (
            <LoadingIndicator/>
        ):(
        <Grid container className={classes.root}>
          <Grid item xs>
          
          
          <Grid item >
          <Paper className={classes.paper2}>
           
          </Paper>
          </Grid>
          <br></br>
          {jobs.map((job) => {
            return (
              <div className={classes.root}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item className={classes.logo}>
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
                          <Typography gutterBottom variant="h6" component="h2" className={classes.margin}>
                            <b>{job.title}</b>
                            <Badge
                              classes={{ badge: classes.customBadge }}
                              className={classes.customBadge}
                              badgeContent= {job.jobtype}
                            >
                            </Badge>
                          </Typography>
                          <Typography variant="body2" color="textSecondary" style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                            <BusinessIcon fontSize="small" className={classes.iconMargin}></BusinessIcon>
                            {job.business_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                            <LocationOnIcon fontSize="small" className={classes.iconMargin}></LocationOnIcon>{" "}
                            {job.location}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                            <PermIdentityIcon fontSize="small" className={classes.iconMargin}></PermIdentityIcon>
                            1 position
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                      <Typography variant="subtitle1">
                          {job.upload_date}
                        </Typography>
                        <br></br>
                        <Typography>
                          <ColorButton
                            size="large"
                            className={classes.margin}
                            variant="contained"
                          >
                            APPLY
                          </ColorButton>
                        </Typography>
                        <br></br>
                        <Grid item>
                          <Typography variant="body2" style={{display:'flex', flexWrap:'wrap'}}>
                            Share: <FacebookIcon style={{ color: blue[900] }}></FacebookIcon>{" "}
                            <TwitterIcon style={{ color: blue[300], margin: "0px 5px" }}></TwitterIcon>{" "}
                            <LinkedInIcon style={{ color: blue[800] }}></LinkedInIcon>
                          </Typography>
                        </Grid>
                        
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                <br></br>
              </div>
            );
          })}
        </Grid>
        </Grid>
        )}
        </>
    )
}

export default Joblist;
