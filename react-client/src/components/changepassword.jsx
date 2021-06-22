import React from "react";

export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">CHANGE PASSWORD</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="New Password"></label>
              <input type="password" name="new password" placeholder="new password" />
            </div>
            <div className="form-group">
              <label htmlFor="Confirm Password"></label>
              <input type="password" name="confirm password" placeholder="confirm password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Change Password
          </button>
        </div>
      </div>
    );
  }
}