import Alert from 'react-s-alert';
import React, { Component } from 'react';
import { Redirect } from "react-router";
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from "../../constants/index";
import loginImg from "../../img/login.svg";
import { login } from "../../util/APIUtils";
import googleLogo from '../../img/google-logo.png';
import "../../components/style.scss";


class Login extends Component {
  componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
  }

  render() {
    if(this.props.authenticated) {
      return <Redirect
          to={{
          pathname: "/",
          state: { from: this.props.location }
      }}/>;            
    }

    return (
      <div className="base-container" >
        <div className="header">SIGN IN</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <LoginForm {...this.props}/>
          <div className="footer">
            <div className="or">
            <span className="or-text">or</span>
          </div>
          </div>
        </div>
        <div className="footer">
          <SocialLogin/>
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
      const target = event.target;
      const inputName = target.name;        
      const inputValue = target.value;

      this.setState({
          [inputName] : inputValue
      });        
  }

  handleSubmit(event) {
      event.preventDefault();   

      const loginRequest = Object.assign({}, this.state);

      login(loginRequest)
      .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          Alert.success("You're successfully logged in!");
          this.props.history.push("/profile");
          window.location.reload();
      }).catch(error => {
          Alert.error((error && error.message+': Email or password is incorrect') || 'Oops! Something went wrong. Please try again!');
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="Email"></label>
              <input type="email" name="email" placeholder="Email" 
                       className="form-control" 
              value={this.state.email} onChange={this.handleInputChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="Password"></label>
              <input type="password" name="password" placeholder="Password"
                className="form-control"  
              value={this.state.password} onChange={this.handleInputChange} required/>
              <a href="?">Forget password</a>
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
export default Login