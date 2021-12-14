import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from "../../constants/index";
import loginImg from "../../img/login.svg";
import { login } from "../../api/UserAPI";
import googleLogo from '../../img/google-logo.png';
import "../../style/formstyle.scss";
import "../../style/Button.scss"
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';

const Login = (props) => {

  if (props.authenticated) {
    return <Redirect
      to={{
        pathname: "/",
        state: { from: props.location }
      }} />;


  }

  return (
    <div className="base-container" >
      <div className="footer" />
      <div className="header">SIGN IN</div>
      <div className="content">
        <img src={loginImg} alt="Logo" className="image" />
        <LoginForm />
        <div className="footer" />
        <small>Don't have account? &rArr;
          <Link to='/signup'>
            Sign up
          </Link>
        </small>
        <div className="footer">
          {/* <div className="or"><span>or</span></div> */}
        </div>
      </div>
      {/* <div className="footer">
        <SocialLogin />
      </div> */}
    </div>
  );
}


const LoginForm = () => {

  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: ''
  })

  const history = useHistory();

  const handleInputChange = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        Alert.success("You're successfully logged in!");
        history.push("/user/dashboard")
        window.location.reload();
      }).catch(error => {
        Alert.error((error && error.message)
          || 'Oops! Something went wrong. Please try again!');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="content">
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
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>
          <div className="footer">
            <button type="submit" className="btn">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

class SocialLogin extends React.Component {
  render() {
    return (
      <div className="social-btn">
        <button type="button" className="btn">
          <a style={{ color: 'white' }} href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" />Sign in with Google</a>

        </button>
      </div>
    );
  }
}
export default Login