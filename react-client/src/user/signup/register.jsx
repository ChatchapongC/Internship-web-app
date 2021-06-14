import React, { Component } from 'react';
import { Redirect, Link } from "react-router";
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from "../../constants";
import loginImg from "../../img/login.svg";
import { login } from "../../util/APIUtils";
import googleLogo from '../../img/google-logo.png';
import "../../constants/style.scss";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">SIGN UP</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="Email"></label>
              <input type="text" name="Email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="Password"></label>
              <input type="password" name="Password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="Confirm Password"></label>
              <input type="password" name="Confirm Password" placeholder="Confirm Password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Sign up
          </button>
        </div>
        <div className="footer"> or </div>
        <div className="footer">
          <SocialLogin/>
        </div>
      </div>
    );
  }
}
class SocialLogin extends React.Component { 
  render() {
      return (
          <div className="social-login">
            <button type="button" className="btn">
              <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google"/>Sign in with Google</a>
                </button>
          </div>
      );
  }
}
export default Register