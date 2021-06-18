import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import loginImg from "../../img/login.svg";
import { signup } from '../../util/APIUtils'
import Alert from 'react-s-alert';
import { GOOGLE_AUTH_URL } from "../../constants/index";
import googleLogo from '../../img/google-logo.png';

class Register extends Component {

  render() {
    if(this.props.authenticated) {
      return <Redirect
          to={{
          pathname: "/",
          state: { from: this.props.location }
      }}/>;            
    } 
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <SignUpForm {...this.props}/>
        <div className="footer"> or </div>
        <div className="footer">
          <SocialSignUp />
        </div>
      </div>
    );
  }
}

class SocialSignUp extends Component {
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

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        confirmPassword:''
    }

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
      const { password, confirmPassword} = this.state;
      if( password !== confirmPassword) {
        Alert.error("Password doesn't match")
      } else {
        const signUpRequest = Object.assign({}, this.state);
        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
      }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
             <div className="header">SIGN UP</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>

          
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
            </div>

            <div className="form-group">
              <label htmlFor="Password"></label>
              <input type="password" name="confirmpassword" placeholder="Confirm Password"
                      className="form-control" 
                      value={this.state.confirmpassword} onChange={this.handleInputChange} required/>
            </div>

           
            <div className="footer">
              <button type="submit" className="btn">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </form>                    

    );
}
}

export default Register