import Alert from 'react-s-alert';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from "../../constants/index";
import loginImg from "../../img/login.svg";
import { login } from "../../util/APIUtils";
import googleLogo from '../../img/google-logo.png';
import "../../components/formstyle.scss";
import "../../components/Button.scss"
import { Link } from 'react-router-dom';

class Login extends Component {
  componentDidMount() {
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
        <div className="footer"/>
        <div className="header">SIGN IN</div>
        <div className="content">
          <img src={loginImg} alt="Logo" className="image"/>
          <LoginForm {...this.props}/>
          <div className="footer"/>
            <small>Don't have account? &rArr;   
              <Link to='/signup'>
                  Sign up
              </Link>
            </small>
          <div className="footer">
          <div className="or"><span>or</span></div>
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
}
class SocialLogin extends React.Component { 
  render() {
      return (
          <div className="social-btn">
            <button type="button" className="btn">
            <a style={{color:'white'}} href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google"/>Sign in with Google</a>
              
            </button>
          </div>
      );
  }
}
export default Login