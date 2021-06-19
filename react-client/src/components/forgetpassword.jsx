import React from "react";
import { Redirect } from "react-router-dom";
import { forgotpassword } from "../util/APIUtils";
import Alert from 'react-s-alert';


class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
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
      const forgotPassword = Object.assign({}, this.state);
      forgotpassword(forgotPassword)
      .then(response => {
          Alert.success("Reset link already sent! Please check your Email");
          this.props.history.push("/login");
      }).catch(error => {
          Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
      });
      
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
      <form onSubmit={this.handleSubmit}>
        <div className="base-container" ref={this.props.containerRef}>
          <div className="footer"/>
          <div className="header">FORGOT YOUR PASSWORD?</div>
          <p>Please input your email,</p> 
          <p>we will send you a reset password link to your email</p>
          <div className="footer"/>
          <div className="content">
            <div className="form">
              <div className="form-group">
                <label htmlFor="Email"></label>
                <input type="email" name="email" placeholder="Email"
                value={this.state.email} onChange={this.handleInputChange} required />
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="submit" className="btn">
              Reset Password
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default ForgotPassword;