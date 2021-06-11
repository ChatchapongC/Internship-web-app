import React from "react";

export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">FORGET PASSWORD</div>
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