import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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

  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center">
  {[0, 1, 2, 4, 5, 6].map((value) => (
    <Grid key={value} item >
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            V
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Bangkok Web Solution Co.,Ltd."
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="p">
          Web developer
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        The Agile management project which allow you to develop real application for company internal usage purpose 
        related to HR application. You will be engage in project planning, designing, coding, testing and deploying application by you own.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
          <Typography paragraph>Job Details:</Typography>
          <Typography paragraph>
          Specification :
          Bachelor in Science in Computer, IT, etc.
          Open minded, willing to learn, responsible and reliable
          Ability to perform web application development (coding) any programming languages
          Able to perform unit testing
          Experience in application deployment
          Able to plan project with team
          Good at designing or coding
          Strong knowledge on HR functions
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
    ))} 
    </Grid>
   
   
  );
}