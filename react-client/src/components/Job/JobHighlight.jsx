import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { purple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid } from '@material-ui/core';
import { getRecommendedJob } from '../../api/JobAPI';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px 20px",
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
  avatar: {
    backgroundColor: purple[500],
  },
}));

export default function JobHighlight() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(-1);
  const [jobRecommend, setJobRecommend] = useState([]);

  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRecommendedJob();
      setJobRecommend(result)
    };
    fetchData();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center">
      {jobRecommend.map((value) => (
        <Grid key={value} item >
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>
                  V
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={value.company_name}
              subheader={value.upload_date}
            />
            <CardContent>
              <Typography variant="h5" color="textSecondary" component="p">
                <Link underline="none" color="inherit" href={`/job-details/${value.id}`}>{value.title}</Link>
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
              <Typography paragraph>
                  Company name : {value.company.companyName}
                </Typography>
                <Typography paragraph>
                  Type : {value.type} 
                </Typography>
                <Typography paragraph>
                  Available Position : {value.availablePosition}
                </Typography>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={() => handleExpandClick(value)}
                aria-expanded={expanded === value}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded === value} timeout="auto" unmountOnExit>
              <CardContent>
                Description :
                <Typography variant="body1" color="textSecondary" component="p">
                {value.description}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>


  );
}