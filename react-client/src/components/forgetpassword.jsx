import React from "react";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
              <input type="text" name="Email" placeholder="Email" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
             Reset Password
          </button>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;