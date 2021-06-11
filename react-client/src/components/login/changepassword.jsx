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
            <div className="form-group">
              <label htmlFor="Password"></label>
              <input type="password" name="password" placeholder="Password" />
              <a href="?">Forget password</a>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Sign in
          </button>
        </div>
        <div className="footer"> or </div>
        <div className="footer">
          <button type="button" className="btn">
            Sign in with Facebook
          </button>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}