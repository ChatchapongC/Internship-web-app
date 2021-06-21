import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import Alert from 'react-s-alert';
import "../components/style.scss";
import { resetpassword } from "../util/APIUtils";

class ResetPassword extends Component {

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
        <div className="footer"/>
        <div className="header">RESET PASSWORD</div>
        <div className="content">
          <ResetPasswordForm {...this.props}/>
        </div>
      </div>
    );
  }
}


class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        newPassword: '',
        confirmPassword:'',
        disableBtn: false,
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
        
      const { newPassword, confirmPassword} = this.state;
      if( newPassword !== confirmPassword) {
        Alert.error("Password doesn't match")
      } else {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');
        const resetPasswordRequest = Object.assign({}, this.state);
        resetpassword(resetPasswordRequest,token)
        .then(response => {
            Alert.success("You have success update your new password");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
      }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="footer"/>
            <div className="form">
                <div className="form-group">
                <label htmlFor="Password"></label>
                <input type="password" name="newPassword" placeholder="New Password"
                        className="form-control" 
                        value={this.state.newpassword} onChange={this.handleInputChange} required/>
                </div>
            </div>

            <div className="form">
                <div className="form-group">
                <label htmlFor="Password"></label>
                <input type="password" name="confirmPassword" placeholder="Confirm New Password"
                        className="form-control" 
                        value={this.state.confirmpassword} onChange={this.handleInputChange} required/>
                </div>
            </div>

            <div className="footer">
               {this.props.disableBtn ? (
                <button type="button" className="btn">
                   Done! Please wait
                 </button>
               ) : (
                <button type="submit" className="btn">
                    Reset Password
                </button>
               )} 
              
            </div>
      </form>                    

    );
}
}

export default ResetPassword