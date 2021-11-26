import React, {} from "react";
import { Redirect, Link, useHistory } from 'react-router-dom'
import loginImg from "../../img/login.svg";
import { signup } from '../../api/UserAPI'
import { GOOGLE_AUTH_URL } from "../../constants/index";
import googleLogo from '../../img/google-logo.png';
import "../../style/formstyle.scss";
import Alert from "react-s-alert";
import { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { purple } from '@material-ui/core/colors';
import BusinessIcon from '@material-ui/icons/Business';

const Register = (props) => {


  if (props.authenticated) {
    return <Redirect
      to={{
        pathname: "/",
        state: { from: props.location }
      }} />;
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="footer" />
      <div className="header">SIGN UP</div>
      <div className="content">
        <SignUpForm {...props} />
        <div className="footer" />
        <small>Already have account? &rArr;
          <Link to='/login'>
            Sign in
          </Link>
        </small>
        <div className="footer" />
        <div className="or"><span>or</span></div>
      </div>
      <div className="footer">
        <SocialSignUp />
      </div>
    </div>
  );
}



const SocialSignUp = () => {

  return (
    <div className="social-login">
      <button type="button" className="btn btn-block social-btn google">
        <a style={{ color: 'white' }} href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" />Sign up with Google</a>
      </button>
    </div>
  );
}


const SignUpForm = () => {
  return (
    <div className="content">
      <div className="footer" />
      <div className="content">
        <img src={loginImg} alt="Logo" className="image" />
        <div className="footer">
          <SimpleDialogDemo />
        </div>
      </div>
    </div>
  );

}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: purple[100],
    color: purple[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Choose your Accout Type</DialogTitle>
      <List style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
        <ListItem button onClick={() => handleListItemClick('CANDIDATE')} >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='CANDIDATE' secondary="I'm finding for a jobs or companies" />
        </ListItem>

        <ListItem button onClick={() => handleListItemClick('COMPANY')} >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='COMPANY' secondary="I'm finding for a trainee who can work with my jobs" />
        </ListItem>

      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [passwordError, setPasswordError] = useState(true);
  const [signUpRequest, setSignupRequest] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })

  const [digitCheck, setDigitCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [alphabetCheck, setAlphabetCheck] = useState(false);

  const history = useHistory();
  const handleClickOpen = (e) => {
    e.preventDefault();
    if (signUpRequest.password !== signUpRequest.confirmPassword) {
      Alert.error("Password doesn't match")
    }
    else {
      setOpen(true);
    }
  }
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    setSignupRequest({ ...signUpRequest, role: value })
  };

  const handleInputChange = (e) => {
    if(e.target.name === "password"){
      let value = e.target.value;
      if(value.length < 9){
        setPasswordError(true);
        setDigitCheck(false);
      }
      if(value.length >= 8){
        setDigitCheck(true);
      }
      if(value.match(/[a-zA-Z]/)){
        setAlphabetCheck(true)
      }
      if(!value.match(/[a-zA-Z]/)){
        setAlphabetCheck(false)
      }
      if(value.match(/[0-9]/)){
        setNumberCheck(true)
      }
      if(!value.match(/[0-9]/)){
        setNumberCheck(false)
      }
      else{
        setPasswordError(false)
        setSignupRequest({ ...signUpRequest, [e.target.name]: e.target.value });
      }
    }
    setSignupRequest({ ...signUpRequest, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (signUpRequest.password !== signUpRequest.confirmPassword) {
      Alert.error("Password doesn't match")
    }
    else if (!selectedValue) {
      Alert.error("Please select Account type")
    }
    else if (signUpRequest.password.length < 7){
      Alert.error("Password must be more than 8 characters!")
    }
    else if (!signUpRequest.password.match(/[a-zA-Z]/)){
      Alert.error("Password must contain character!")
    }
    else if (!signUpRequest.password.match(/[0-9]/)){
      Alert.error("Password must contain number!")
    }
    else if(passwordError){
        Alert.error("Password not strong!")
    } else {
       signup(signUpRequest)
        .then(response => {
          Alert.success("You're successfully registered. Please login to continue!");
          history.push("/login");
        }).catch(error => {
          Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
    
  }
  console.log(signUpRequest.role)
  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="form-group">
          <label htmlFor="Email"></label>
          <input type="email" name="email" placeholder="Email"
            className="form-control"
            onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="Password"></label>
          <input type="password" name="password" placeholder="Password"
            className="form-control"
            onChange={handleInputChange} required />
            {digitCheck ? (
              <small style={{ color: 'green' }}>&nbsp; Must contain more than 8 characters</small>
            ):(
              <small style={{ color: 'red' }}>&nbsp; Must contain more than 8 characters</small>
            )}
            {alphabetCheck ? (
              <small style={{ color: 'green' }}>&nbsp; Must contain alphabet</small>
            ) : (
              <small style={{ color: 'red' }}>&nbsp; Must contain alphabet</small>
            )}
            {numberCheck ? (
               <small style={{ color: 'green' }}>&nbsp; Must contain number</small>
            ):(
              <small style={{ color: 'red' }}>&nbsp; Must contain number</small>
            )}
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="Password"></label>
          <input type="password" name="confirmPassword" placeholder="Confirm Password"
            className="form-control"
            onChange={handleInputChange} required />
        </div>
        <Typography variant="subtitle2" color='inherit'>Sign up as: {selectedValue ? (<i>{selectedValue}</i>) : (<i>'NOT SELECT'</i>)}</Typography>
        <br />
        {selectedValue ? (
          <button type='submit' className="btn" onSubmit={handleSubmit}>
            Sign up
          </button>
        ) : (
          <button className="btn" onClick={handleClickOpen}>
            Choose Account Type
          </button>
        )}
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />

      </div>
    </form>
  );

}

export default Register